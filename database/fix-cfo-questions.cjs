const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// CFO questions to add (2 total)
const cfoQuestions = [
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'As CFO, how should you manage cash flow during extended operational disruptions caused by deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">The deepfake incident has extended beyond initial projections. Revenue streams are affected, and operational costs are mounting. Long-term financial stability needs to be secured.</strong>',
    options: [
      'Reduce all non-essential spending immediately',
      'Implement comprehensive cash flow management including credit facilities, expense prioritization, and revenue protection measures',
      'Wait for operations to normalize',
      'Focus only on cost reduction'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive cash flow management ensures business continuity during extended disruptions.',
    hints: ['Consider multiple financial tools', 'Think about both short and long-term needs']
  },
  {
    role: 'CFO',
    risk_card: 'regulatory',
    question: 'As CFO, what financial reporting obligations must be considered during deepfake regulatory incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory bodies are investigating the deepfake incident. The company may face fines, legal costs, and potential investor concerns. Transparent financial reporting is crucial.</strong>',
    options: [
      'Delay reporting until incident is resolved',
      'Prepare comprehensive financial disclosures including incident costs, potential liabilities, and impact assessments',
      'Provide minimal required information only',
      'Let legal team handle all reporting'
    ],
    correct_answer: 1,
    explanation: 'Transparent financial reporting maintains stakeholder trust and regulatory compliance.',
    hints: ['Consider all financial impacts', 'Think about stakeholder transparency']
  }
];

console.log('Adding CFO questions to reach 35 total...');

db.serialize(() => {
  db.all("SELECT id, name FROM roles WHERE name = 'CFO'", [], (err, roles) => {
    if (err) {
      console.error('Error fetching CFO role:', err);
      return;
    }
    
    const cfoRoleId = roles[0].id;
    console.log('CFO Role ID:', cfoRoleId);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    cfoQuestions.forEach((q, index) => {
      insertStmt.run([
        q.risk_card,
        cfoRoleId,
        q.question,
        q.scenario,
        JSON.stringify(q.options),
        q.correct_answer,
        q.explanation,
        JSON.stringify(q.hints)
      ], function(err) {
        if (err) {
          console.error(`Error inserting question ${index + 1}:`, err);
        } else {
          insertedCount++;
          console.log(`✅ Added CFO question ${insertedCount}/${cfoQuestions.length}: ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`\n🎉 CFO questions complete! Added ${insertedCount} questions.`);
      console.log('CFO should now have 35 questions total (5 per risk card).');
      db.close();
    });
  });
}); 