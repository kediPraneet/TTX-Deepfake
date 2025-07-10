const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

console.log('Current question counts by role:');
console.log('================================');

db.serialize(() => {
    db.all(`
        SELECT r.name as role, COUNT(*) as count 
        FROM questions q
        JOIN roles r ON q.role_id = r.id
        GROUP BY r.name 
        ORDER BY r.name
    `, [], (err, counts) => {
        if (err) {
            console.error('Error checking questions:', err.message);
            db.close();
            return;
        }

        let total = 0;
        counts.forEach(({ role, count }) => {
            console.log(`${role}: ${count} questions`);
            total += count;
        });
        
        console.log('================================');
        console.log(`Total: ${total} questions`);
        console.log(`Target: 175 questions (25 per role × 7 roles)`);
        console.log(`Remaining: ${175 - total} questions needed`);
        
        // Show distribution by risk card for verification
        console.log('\nDistribution by risk card:');
        console.log('==========================');
        
        db.all(`
            SELECT rc.id as risk_card, COUNT(*) as count 
            FROM questions q
            JOIN risk_cards rc ON q.risk_card_id = rc.id
            GROUP BY rc.id 
            ORDER BY rc.id
        `, [], (err, riskCounts) => {
            if (err) {
                console.error('Error checking risk cards:', err.message);
            } else {
                riskCounts.forEach(({ risk_card, count }) => {
                    console.log(`${risk_card}: ${count} questions`);
                });
            }
            
            db.close();
        });
    });
}); 