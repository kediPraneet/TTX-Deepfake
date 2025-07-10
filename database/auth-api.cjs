const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'deepfake-training-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
    if (req.user.role_level !== 'admin' && req.user.role_level !== 'super_admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
};

// Helper function to hash passwords
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Helper function to validate password
const validatePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            role_level: user.role_level,
            first_name: user.first_name,
            last_name: user.last_name
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Routes

// User Registration
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, organization, department } = req.body;

        // Validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'Email, password, first name, and last name are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Check if user already exists
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (row) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            // Hash password and create user
            const passwordHash = await hashPassword(password);
            const userId = uuidv4();

            db.run(
                `INSERT INTO users (email, password_hash, first_name, last_name, organization, department, role_level)
                 VALUES (?, ?, ?, ?, ?, ?, 'user')`,
                [email, passwordHash, firstName, lastName, organization || null, department || null],
                function(err) {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Failed to create user' });
                    }

                    const token = generateToken({
                        id: this.lastID,
                        email,
                        role_level: 'user',
                        first_name: firstName,
                        last_name: lastName
                    });

                    res.status(201).json({
                        message: 'User created successfully',
                        token,
                        user: {
                            id: this.lastID,
                            email,
                            firstName,
                            lastName,
                            organization,
                            department,
                            roleLevel: 'user'
                        }
                    });
                }
            );
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Get user from database
        db.get(
            'SELECT * FROM users WHERE email = ? AND is_active = 1',
            [email],
            async (err, user) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                // Check if account is locked
                if (user.locked_until && new Date() < new Date(user.locked_until)) {
                    return res.status(423).json({ error: 'Account is temporarily locked. Try again later.' });
                }

                // Validate password
                const isValidPassword = await validatePassword(password, user.password_hash);

                if (!isValidPassword) {
                    // Increment login attempts
                    const newAttempts = user.login_attempts + 1;
                    let lockUntil = null;

                    // Lock account after 5 failed attempts for 15 minutes
                    if (newAttempts >= 5) {
                        lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
                    }

                    db.run(
                        'UPDATE users SET login_attempts = ?, locked_until = ? WHERE id = ?',
                        [newAttempts, lockUntil, user.id]
                    );

                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                // Reset login attempts and update last login
                db.run(
                    'UPDATE users SET login_attempts = 0, locked_until = NULL, last_login = CURRENT_TIMESTAMP WHERE id = ?',
                    [user.id]
                );

                // Generate JWT token
                const token = generateToken(user);

                res.json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        organization: user.organization,
                        department: user.department,
                        roleLevel: user.role_level
                    }
                });
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Current User Profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
    db.get(
        'SELECT id, email, first_name, last_name, organization, department, role_level, created_at, last_login FROM users WHERE id = ?',
        [req.user.id],
        (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    organization: user.organization,
                    department: user.department,
                    roleLevel: user.role_level,
                    createdAt: user.created_at,
                    lastLogin: user.last_login
                }
            });
        }
    );
});

// Update User Profile
app.put('/api/auth/profile', authenticateToken, (req, res) => {
    const { firstName, lastName, organization, department } = req.body;

    db.run(
        'UPDATE users SET first_name = ?, last_name = ?, organization = ?, department = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [firstName, lastName, organization, department, req.user.id],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to update profile' });
            }

            res.json({ message: 'Profile updated successfully' });
        }
    );
});

// Change Password
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }

        // Get current user
        db.get('SELECT password_hash FROM users WHERE id = ?', [req.user.id], async (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Validate current password
            const isValidPassword = await validatePassword(currentPassword, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Current password is incorrect' });
            }

            // Hash new password and update
            const newPasswordHash = await hashPassword(newPassword);
            db.run(
                'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [newPasswordHash, req.user.id],
                function(err) {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Failed to change password' });
                    }

                    res.json({ message: 'Password changed successfully' });
                }
            );
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin: Get All Users
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
    db.all(
        'SELECT id, email, first_name, last_name, organization, department, role_level, is_active, created_at, last_login FROM users ORDER BY created_at DESC',
        [],
        (err, users) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedUsers = users.map(user => ({
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                organization: user.organization,
                department: user.department,
                roleLevel: user.role_level,
                isActive: user.is_active,
                createdAt: user.created_at,
                lastLogin: user.last_login
            }));

            res.json({ users: formattedUsers });
        }
    );
});

// Admin: Update User Role
app.put('/api/admin/users/:userId/role', authenticateToken, requireAdmin, (req, res) => {
    const { userId } = req.params;
    const { roleLevel } = req.body;

    if (!['user', 'admin', 'super_admin'].includes(roleLevel)) {
        return res.status(400).json({ error: 'Invalid role level' });
    }

    db.run(
        'UPDATE users SET role_level = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [roleLevel, userId],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to update user role' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User role updated successfully' });
        }
    );
});

// Admin: Activate/Deactivate User
app.put('/api/admin/users/:userId/status', authenticateToken, requireAdmin, (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;

    db.run(
        'UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [isActive ? 1 : 0, userId],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to update user status' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User status updated successfully' });
        }
    );
});

// Admin: Get All User Assessments
app.get('/api/admin/assessments', authenticateToken, requireAdmin, (req, res) => {
    db.all(
        `SELECT ua.*, 
                u.email, u.first_name, u.last_name, u.organization, u.department,
                GROUP_CONCAT(uad.risk_card_id) as risk_cards,
                GROUP_CONCAT(uad.score) as risk_card_scores
         FROM user_assessments ua
         JOIN users u ON ua.user_id = u.id
         LEFT JOIN user_assessment_details uad ON ua.id = uad.user_assessment_id
         GROUP BY ua.id
         ORDER BY ua.completed_at DESC`,
        [],
        (err, assessments) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedAssessments = assessments.map(assessment => ({
                id: assessment.id,
                assessmentId: assessment.assessment_id,
                user: {
                    id: assessment.user_id,
                    email: assessment.email,
                    firstName: assessment.first_name,
                    lastName: assessment.last_name,
                    organization: assessment.organization,
                    department: assessment.department
                },
                selectedRoles: JSON.parse(assessment.selected_roles || '[]'),
                totalScore: assessment.total_score,
                maxPossibleScore: assessment.max_possible_score,
                timeTaken: assessment.time_taken,
                completedAt: assessment.completed_at,
                riskCards: assessment.risk_cards ? assessment.risk_cards.split(',') : [],
                riskCardScores: assessment.risk_card_scores ? assessment.risk_card_scores.split(',').map(Number) : []
            }));

            res.json({ assessments: formattedAssessments });
        }
    );
});

// Admin: Get Specific User's Assessments
app.get('/api/admin/users/:userId/assessments', authenticateToken, requireAdmin, (req, res) => {
    const { userId } = req.params;

    db.all(
        `SELECT ua.*, 
                u.email, u.first_name, u.last_name, u.organization, u.department,
                GROUP_CONCAT(uad.risk_card_id) as risk_cards,
                GROUP_CONCAT(uad.score) as risk_card_scores
         FROM user_assessments ua
         JOIN users u ON ua.user_id = u.id
         LEFT JOIN user_assessment_details uad ON ua.id = uad.user_assessment_id
         WHERE ua.user_id = ?
         GROUP BY ua.id
         ORDER BY ua.completed_at DESC`,
        [userId],
        (err, assessments) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedAssessments = assessments.map(assessment => ({
                id: assessment.id,
                assessmentId: assessment.assessment_id,
                user: {
                    id: assessment.user_id,
                    email: assessment.email,
                    firstName: assessment.first_name,
                    lastName: assessment.last_name,
                    organization: assessment.organization,
                    department: assessment.department
                },
                selectedRoles: JSON.parse(assessment.selected_roles || '[]'),
                totalScore: assessment.total_score,
                maxPossibleScore: assessment.max_possible_score,
                timeTaken: assessment.time_taken,
                completedAt: assessment.completed_at,
                riskCards: assessment.risk_cards ? assessment.risk_cards.split(',') : [],
                riskCardScores: assessment.risk_card_scores ? assessment.risk_card_scores.split(',').map(Number) : []
            }));

            res.json({ assessments: formattedAssessments });
        }
    );
});

// Admin: Get Assessment Analytics/Statistics
app.get('/api/admin/analytics', authenticateToken, requireAdmin, (req, res) => {
    db.serialize(() => {
        // Get total users and assessments
        db.get('SELECT COUNT(*) as total_users FROM users WHERE role_level = "user"', [], (err, userCount) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            db.get('SELECT COUNT(*) as total_assessments FROM user_assessments', [], (err, assessmentCount) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Get average scores by risk card
                db.all(
                    `SELECT uad.risk_card_id, 
                            AVG(CAST(uad.score AS FLOAT) / CAST(uad.max_score AS FLOAT) * 100) as avg_percentage,
                            COUNT(*) as attempt_count
                     FROM user_assessment_details uad
                     GROUP BY uad.risk_card_id`,
                    [],
                    (err, riskCardStats) => {
                        if (err) {
                            console.error('Database error:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        // Get user performance summary
                        db.all(
                            `SELECT u.email, u.first_name, u.last_name,
                                    COUNT(ua.id) as assessment_count,
                                    AVG(CAST(ua.total_score AS FLOAT) / CAST(ua.max_possible_score AS FLOAT) * 100) as avg_percentage,
                                    MAX(ua.completed_at) as last_assessment
                             FROM users u
                             LEFT JOIN user_assessments ua ON u.id = ua.user_id
                             WHERE u.role_level = 'user'
                             GROUP BY u.id`,
                            [],
                            (err, userPerformance) => {
                                if (err) {
                                    console.error('Database error:', err);
                                    return res.status(500).json({ error: 'Internal server error' });
                                }

                                res.json({
                                    totalUsers: userCount.total_users,
                                    totalAssessments: assessmentCount.total_assessments,
                                    riskCardPerformance: riskCardStats.map(stat => ({
                                        riskCardId: stat.risk_card_id,
                                        averagePercentage: Math.round(stat.avg_percentage || 0),
                                        attemptCount: stat.attempt_count
                                    })),
                                    userPerformance: userPerformance.map(user => ({
                                        email: user.email,
                                        firstName: user.first_name,
                                        lastName: user.last_name,
                                        assessmentCount: user.assessment_count,
                                        averagePercentage: Math.round(user.avg_percentage || 0),
                                        lastAssessment: user.last_assessment
                                    }))
                                });
                            }
                        );
                    }
                );
            });
        });
    });
});

// Save User Assessment
app.post('/api/assessments', authenticateToken, (req, res) => {
    const { assessmentId, selectedRoles, totalScore, maxPossibleScore, timeTaken, riskCardResults } = req.body;

    db.run(
        `INSERT INTO user_assessments (user_id, assessment_id, selected_roles, total_score, max_possible_score, time_taken)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.id, assessmentId, JSON.stringify(selectedRoles), totalScore, maxPossibleScore, timeTaken],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to save assessment' });
            }

            const userAssessmentId = this.lastID;

            // Save risk card details
            if (riskCardResults && riskCardResults.length > 0) {
                const stmt = db.prepare(`
                    INSERT INTO user_assessment_details (user_assessment_id, risk_card_id, score, max_score, answers, hints_used, time_taken)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `);

                riskCardResults.forEach(result => {
                    stmt.run([
                        userAssessmentId,
                        result.cardId,
                        result.score,
                        result.maxScore,
                        JSON.stringify(result.answers),
                        result.hintsUsed || 0,
                        result.timeTaken || 0
                    ]);
                });

                stmt.finalize();
            }

            res.status(201).json({ 
                message: 'Assessment saved successfully',
                assessmentId: userAssessmentId 
            });
        }
    );
});

// Get User Assessments
app.get('/api/assessments', authenticateToken, (req, res) => {
    db.all(
        `SELECT ua.*, 
                GROUP_CONCAT(uad.risk_card_id) as risk_cards,
                GROUP_CONCAT(uad.score) as risk_card_scores
         FROM user_assessments ua
         LEFT JOIN user_assessment_details uad ON ua.id = uad.user_assessment_id
         WHERE ua.user_id = ?
         GROUP BY ua.id
         ORDER BY ua.completed_at DESC`,
        [req.user.id],
        (err, assessments) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedAssessments = assessments.map(assessment => ({
                id: assessment.id,
                assessmentId: assessment.assessment_id,
                selectedRoles: JSON.parse(assessment.selected_roles || '[]'),
                totalScore: assessment.total_score,
                maxPossibleScore: assessment.max_possible_score,
                timeTaken: assessment.time_taken,
                completedAt: assessment.completed_at,
                riskCards: assessment.risk_cards ? assessment.risk_cards.split(',') : [],
                riskCardScores: assessment.risk_card_scores ? assessment.risk_card_scores.split(',').map(Number) : []
            }));

            res.json({ assessments: formattedAssessments });
        }
    );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Authentication API is running' });
});

// Get Questions by Role and Risk Card
app.get('/api/questions/role/:roleId/card/:cardId', (req, res) => {
    const { roleId, cardId } = req.params;
    
    db.all(
        `SELECT q.id, q.question_text, q.scenario_text, q.options, q.correct_answer, q.explanation, q.hints, r.name as role_name
         FROM questions q
         JOIN roles r ON q.role_id = r.id
         WHERE q.role_id = ? AND q.risk_card_id = ?
         ORDER BY RANDOM()`,
        [roleId, cardId],
        (err, questions) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedQuestions = questions.map(q => ({
                id: q.id,
                question: q.question_text,
                scenario: q.scenario_text,
                options: JSON.parse(q.options),
                correctAnswer: q.correct_answer,
                explanation: q.explanation,
                hints: JSON.parse(q.hints || '[]'),
                role: q.role_name
            }));

            res.json({ questions: formattedQuestions });
        }
    );
});

// Get Questions by Selected Roles (for role-based assessment)
app.post('/api/questions/roles', (req, res) => {
    const { roles, limit = 5 } = req.body;
    
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
        return res.status(400).json({ error: 'Roles array is required' });
    }
    
    // Create placeholders for roles
    const placeholders = roles.map(() => '?').join(',');
    
    db.all(
        `SELECT q.id, q.question_text, q.scenario_text, q.options, q.correct_answer, q.explanation, q.hints, r.name as role_name, q.risk_card_id
         FROM questions q
         JOIN roles r ON q.role_id = r.id
         WHERE r.name IN (${placeholders})
         ORDER BY RANDOM()
         LIMIT ?`,
        [...roles, limit],
        (err, questions) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedQuestions = questions.map(q => ({
                id: q.id,
                question: q.question_text,
                scenario: q.scenario_text,
                options: JSON.parse(q.options),
                correctAnswer: q.correct_answer,
                explanation: q.explanation,
                hints: JSON.parse(q.hints || '[]'),
                role: q.role_name,
                cardTitle: q.risk_card_id
            }));

            res.json({ questions: formattedQuestions });
        }
    );
});

// Get Questions for General Assessment (all roles, mixed)
app.get('/api/questions/general', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    
    db.all(
        `SELECT q.id, q.question_text, q.scenario_text, q.options, q.correct_answer, q.explanation, q.hints, r.name as role_name, q.risk_card_id
         FROM questions q
         JOIN roles r ON q.role_id = r.id
         ORDER BY RANDOM()
         LIMIT ?`,
        [limit],
        (err, questions) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedQuestions = questions.map(q => ({
                id: q.id,
                question: q.question_text,
                scenario: q.scenario_text,
                options: JSON.parse(q.options),
                correctAnswer: q.correct_answer,
                explanation: q.explanation,
                hints: JSON.parse(q.hints || '[]'),
                role: q.role_name,
                cardTitle: q.risk_card_id
            }));

            res.json({ questions: formattedQuestions });
        }
    );
});

// Get All Available Roles
app.get('/api/roles', (req, res) => {
    db.all(
        'SELECT id, name, description FROM roles ORDER BY name',
        [],
        (err, roles) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.json({ roles });
        }
    );
});

// Get All Risk Cards
app.get('/api/risk-cards', (req, res) => {
    db.all(
        'SELECT id, title, description, icon, impact FROM risk_cards ORDER BY id',
        [],
        (err, riskCards) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.json({ riskCards });
        }
    );
});

// Get Question Count by Role
app.get('/api/questions/count', (req, res) => {
    db.all(
        `SELECT r.name as role, COUNT(*) as count 
         FROM questions q
         JOIN roles r ON q.role_id = r.id
         GROUP BY r.name 
         ORDER BY r.name`,
        [],
        (err, counts) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const totalQuestions = counts.reduce((sum, item) => sum + item.count, 0);
            
            res.json({ 
                roleCount: counts,
                totalQuestions
            });
        }
    );
});

// Get All Available Users (public endpoint for user selection)
app.get('/api/users/available', (req, res) => {
    db.all(
        `SELECT id, email, first_name, last_name, department, role_level, is_active 
         FROM users 
         WHERE role_level = 'user' AND is_active = 1 
         ORDER BY first_name, last_name`,
        [],
        (err, users) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const formattedUsers = users.map(user => ({
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                department: user.department,
                roleLevel: user.role_level
            }));

            res.json({ users: formattedUsers });
        }
    );
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Authentication API server running on port ${PORT}`);
});

module.exports = app; 