const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Create database connection
const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to SQLite database for user setup.');
});

// Read and execute user schema
const userSchema = fs.readFileSync(path.join(__dirname, 'user-schema.sql'), 'utf8');

console.log('Setting up user management tables...');

// Execute schema statements
db.serialize(() => {
    // Split schema by semicolons and execute each statement
    const statements = userSchema.split(';').filter(stmt => stmt.trim());
    
    statements.forEach((statement, index) => {
        if (statement.trim()) {
            db.run(statement, (err) => {
                if (err) {
                    console.error(`Error executing user schema statement ${index + 1}:`, err.message);
                } else {
                    console.log(`User schema statement ${index + 1} executed successfully`);
                }
            });
        }
    });
});

// Close database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('User management system initialized successfully!');
        console.log('\nDefault users created:');
        console.log('- admin@gmail.com (super_admin) - password: 123');
        console.log('- us2@gmail.com (user) - password: 123');
        console.log('- us3@gmail.com (user) - password: 123');
        console.log('- manager@gmail.com (admin) - password: 123');
    }
}); 