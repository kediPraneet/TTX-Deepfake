-- SQLite Database Schema for Deepfake Assessment System

-- Roles table
CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Risk Cards table  
CREATE TABLE risk_cards (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    impact VARCHAR(200)
);

-- Questions table
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    risk_card_id VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    scenario_text TEXT,
    options TEXT NOT NULL, -- JSON array of options
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    hints TEXT, -- JSON array of hints
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (risk_card_id) REFERENCES risk_cards(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Insert roles
INSERT INTO roles (name, description) VALUES 
('CFO', 'Chief Financial Officer - Financial decision making and budget management'),
('IT System', 'IT Systems Manager - Technical infrastructure and security'),
('Legal Division', 'Legal Department - Compliance and legal risk management'),
('Marketing', 'Marketing Department - Brand management and customer communication'),
('Vendor Manager', 'Vendor Management - Third-party relationships and contracts'),
('Governance and Compliance', 'Governance and Compliance - Risk management and regulatory compliance'),
('Security Incident Manager', 'Security Incident Response - Cybersecurity and incident management');

-- Insert risk cards
INSERT INTO risk_cards (id, title, description, icon, impact) VALUES 
('operational', 'Operational Disruptions', 'Managing business operations during deepfake incidents and service disruptions', 'Building2', 'Business Continuity'),
('ransom', 'Ransom Pay', 'Evaluating and managing extortion attempts', 'Banknote', 'Financial and Legal Implications'),
('financial', 'Financial Loss', 'Managing financial impact and recovery from deepfake attacks', 'DollarSign', 'Financial Impact'),
('regulatory', 'Regulatory Notification', 'Managing regulatory compliance and reporting requirements', 'FileText', 'Compliance and Legal'),
('employment', 'Employee Notification', 'Managing internal communications and employee concerns', 'Users', 'Internal Communications'),
('crisis', 'Crisis Communication', 'Managing external communications during crisis situations', 'MessageCircle', 'Public Relations'),
('strategic', 'Strategic Impact', 'Long-term strategic planning and business impact assessment', 'Target', 'Strategic Planning'); 