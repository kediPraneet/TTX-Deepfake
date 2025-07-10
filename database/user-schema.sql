-- User Management Schema Extension for Deepfake Assessment System

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    organization VARCHAR(200),
    department VARCHAR(100),
    role_level VARCHAR(50) DEFAULT 'user', -- 'user', 'admin', 'super_admin'
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    login_attempts INTEGER DEFAULT 0,
    locked_until DATETIME
);

-- User Sessions table (for session management)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Assessment History (link assessments to specific users)
CREATE TABLE IF NOT EXISTS user_assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    assessment_id VARCHAR(100) NOT NULL,
    selected_roles TEXT, -- JSON array of selected roles
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_score INTEGER,
    max_possible_score INTEGER,
    time_taken INTEGER, -- in seconds
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Assessment Details (detailed results per risk card)
CREATE TABLE IF NOT EXISTS user_assessment_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_assessment_id INTEGER NOT NULL,
    risk_card_id VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    answers TEXT, -- JSON array of answers
    hints_used INTEGER DEFAULT 0,
    time_taken INTEGER, -- in seconds
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_assessment_id) REFERENCES user_assessments(id) ON DELETE CASCADE,
    FOREIGN KEY (risk_card_id) REFERENCES risk_cards(id)
);

-- Password Reset Tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_level ON users(role_level);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON user_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_details_user_assessment_id ON user_assessment_details(user_assessment_id);

-- Insert default admin user (password: '123' hashed)
-- Note: In production, use proper password hashing like bcrypt
INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, organization, role_level) 
VALUES ('admin@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye7FRNpGUeOjlSLO0iLrpF9mZV5SQO5u6', 'System', 'Administrator', 'Deepfake Training Platform', 'super_admin');

-- Insert default test users (all passwords are '123')
INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, organization, department, role_level) 
VALUES 
('us2@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye7FRNpGUeOjlSLO0iLrpF9mZV5SQO5u6', 'John', 'Doe', 'TechCorp Inc', 'Finance', 'user'),
('us3@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye7FRNpGUeOjlSLO0iLrpF9mZV5SQO5u6', 'Jane', 'Smith', 'TechCorp Inc', 'IT Security', 'user'),
('manager@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye7FRNpGUeOjlSLO0iLrpF9mZV5SQO5u6', 'Sarah', 'Manager', 'TechCorp Inc', 'Management', 'admin'); 