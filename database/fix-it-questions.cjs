const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// IT System questions to add (4 total)
const itQuestions = [
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'As IT System Manager, what technical crisis response protocols must be activated during deepfake crisis situations?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have created a technical crisis affecting multiple systems. Crisis response protocols need immediate activation to prevent system-wide failures.</strong>',
    options: [
      'Focus only on affected systems',
      'Activate comprehensive crisis protocols including system isolation, backup activation, security monitoring, and incident response teams',
      'Wait for management direction',
      'Rely on existing monitoring systems'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive crisis protocols ensure system stability and rapid response to technical emergencies.',
    hints: ['Consider all system aspects', 'Think about prevention and response']
  },
  {
    role: 'IT System',
    risk_card: 'employment',
    question: 'As IT System Manager, what employee access management systems must be implemented during deepfake employment incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake videos have impersonated employees in authentication scenarios. Employee access management systems need immediate strengthening to prevent unauthorized access.</strong>',
    options: [
      'Change passwords for affected accounts',
      'Implement comprehensive access management including multi-factor authentication, biometric verification, and behavioral analysis',
      'Disable all employee accounts',
      'Focus only on high-privilege accounts'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive access management ensures secure employee authentication and prevents unauthorized access.',
    hints: ['Consider multiple authentication factors', 'Think about behavior patterns']
  },
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'As IT System Manager, what financial system security protocols must be enhanced during deepfake financial incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have targeted financial systems and payment processes. Enhanced security protocols are needed to protect financial transactions and data.</strong>',
    options: [
      'Increase transaction monitoring',
      'Implement comprehensive financial security including transaction verification, encrypted communications, and real-time fraud detection',
      'Temporarily disable financial systems',
      'Focus only on payment gateways'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive financial security ensures integrity of all financial transactions and systems.',
    hints: ['Consider all financial touchpoints', 'Think about verification and encryption']
  },
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'As IT System Manager, what operational technology safeguards must be implemented during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have disrupted operational technology systems and workflows. Safeguards are needed to maintain operational integrity and prevent further disruption.</strong>',
    options: [
      'Restart affected systems',
      'Implement comprehensive operational safeguards including system verification, automated backups, and integrity monitoring',
      'Switch to manual operations',
      'Focus only on critical systems'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive operational safeguards ensure system integrity and business continuity.',
    hints: ['Consider system verification', 'Think about automated protection']
  }
];

console.log('Adding IT System questions to reach 35 total...');

db.serialize(() => {
  db.all("SELECT id, name FROM roles WHERE name = 'IT System'", [], (err, roles) => {
    if (err) {
      console.error('Error fetching IT System role:', err);
      return;
    }
    
    const roleId = roles[0].id;
    console.log('IT System Role ID:', roleId);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    itQuestions.forEach((q, index) => {
      insertStmt.run([
        q.risk_card,
        roleId,
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
          console.log(`✅ Added IT System question ${insertedCount}/${itQuestions.length}: ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`\n🎉 IT System questions complete! Added ${insertedCount} questions.`);
      console.log('IT System should now have 35 questions total (5 per risk card).');
      db.close();
    });
  });
}); 