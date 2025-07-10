const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

console.log('📊 User Management System Status Check\n');

// Check if tables exist
const tables = ['users', 'user_sessions', 'user_assessments', 'user_assessment_details', 'password_reset_tokens'];

let tableCount = 0;
tables.forEach(table => {
    db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [table], (err, row) => {
        if (err) {
            console.error(`❌ Error checking ${table}:`, err.message);
        } else if (row) {
            console.log(`✅ Table '${table}' exists`);
        } else {
            console.log(`❌ Table '${table}' does not exist`);
        }
        
        tableCount++;
        if (tableCount === tables.length) {
            checkUsers();
        }
    });
});

function checkUsers() {
    console.log('\n👥 Available Users:');
    console.log('=' .repeat(80));
    
    db.all(`SELECT id, email, first_name, last_name, organization, department, role_level, is_active, created_at 
            FROM users ORDER BY role_level DESC, first_name`, [], (err, users) => {
        if (err) {
            console.error('❌ Error fetching users:', err.message);
            db.close();
            return;
        }

        if (users.length === 0) {
            console.log('❌ No users found in the database');
        } else {
            users.forEach(user => {
                const status = user.is_active ? '🟢 Active' : '🔴 Inactive';
                const roleIcon = user.role_level === 'super_admin' ? '👑' : 
                               user.role_level === 'admin' ? '🛡️' : '👤';
                
                console.log(`${roleIcon} [${user.role_level.toUpperCase()}] ${user.first_name} ${user.last_name}`);
                console.log(`   📧 Email: ${user.email}`);
                console.log(`   🏢 Organization: ${user.organization || 'Not specified'}`);
                console.log(`   🏛️ Department: ${user.department || 'Not specified'}`);
                console.log(`   📅 Created: ${new Date(user.created_at).toLocaleDateString()}`);
                console.log(`   🔶 Status: ${status}`);
                console.log('   ' + '-'.repeat(60));
            });
            
            console.log(`\n📈 Total Users: ${users.length}`);
            
            // Count by role
            const roleCounts = users.reduce((acc, user) => {
                acc[user.role_level] = (acc[user.role_level] || 0) + 1;
                return acc;
            }, {});
            
            console.log('\n📊 Users by Role:');
            Object.entries(roleCounts).forEach(([role, count]) => {
                const roleIcon = role === 'super_admin' ? '👑' : 
                               role === 'admin' ? '🛡️' : '👤';
                console.log(`   ${roleIcon} ${role}: ${count}`);
            });
        }
        
        console.log('\n🔐 Authentication API Information:');
        console.log('   🌐 API URL: http://localhost:3002/api');
        console.log('   🔑 Available Endpoints:');
        console.log('      • POST /auth/register - User registration');
        console.log('      • POST /auth/login - User login');
        console.log('      • GET /auth/profile - Get user profile');
        console.log('      • PUT /auth/profile - Update user profile');
        console.log('      • POST /auth/change-password - Change password');
        console.log('      • GET /admin/users - Get all users (admin only)');
        console.log('      • PUT /admin/users/:id/role - Update user role (admin only)');
        console.log('      • PUT /admin/users/:id/status - Activate/deactivate user (admin only)');
        console.log('      • GET /admin/assessments - Get all user assessments (admin only)');
        console.log('      • GET /admin/users/:id/assessments - Get specific user assessments (admin only)');
        console.log('      • GET /admin/analytics - Get assessment analytics (admin only)');
        console.log('      • POST /assessments - Save user assessment');
        console.log('      • GET /assessments - Get user\'s own assessments');
        
        console.log('\n🧪 Test Credentials:');
        console.log('   Super Admin: admin@gmail.com / 123');
        console.log('   Admin: manager@gmail.com / 123');
        console.log('   User 1: us2@gmail.com / 123');
        console.log('   User 2: us3@gmail.com / 123');
        
        db.close();
    });
} 