const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(path.join(dbDir, 'assessment.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to SQLite database.');
});

// Read and execute schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Execute schema statements
db.serialize(() => {
    // Split schema by semicolons and execute each statement
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    statements.forEach((statement, index) => {
        if (statement.trim()) {
            db.run(statement, (err) => {
                if (err) {
                    console.error(`Error executing statement ${index + 1}:`, err.message);
                } else {
                    console.log(`Statement ${index + 1} executed successfully`);
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
        console.log('Database initialized successfully!');
    }
}); 