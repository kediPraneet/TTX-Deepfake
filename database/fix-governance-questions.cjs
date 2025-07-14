const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// Governance and Compliance questions to add (4 total)
const governanceQuestions = [
  {
    role: 'Governance and Compliance',
    risk_card: 'employment',
    question: 'As Governance and Compliance, what employee privacy policies must be reviewed during deepfake employment incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake videos have been used to impersonate employees in company communications. Employee privacy rights may be affected, and existing policies need urgent review.</strong>',
    options: [
      'Review only data protection policies',
      'Conduct comprehensive review of privacy policies, employee rights, biometric data handling, and consent frameworks',
      'Wait for legal guidance',
      'Focus only on disciplinary policies'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive policy review ensures employee privacy protection and regulatory compliance.',
    hints: ['Consider all privacy aspects', 'Think about employee rights and consent']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'As Governance and Compliance, what financial governance frameworks must be activated during deepfake financial incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have compromised financial communications and decision-making processes. Financial governance controls need immediate activation to prevent further damage.</strong>',
    options: [
      'Activate only fraud detection systems',
      'Implement comprehensive financial governance including transaction verification, approval hierarchies, and audit trails',
      'Rely on existing controls',
      'Focus only on payment systems'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive financial governance ensures integrity of all financial processes.',
    hints: ['Consider all financial controls', 'Think about verification and approval processes']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'As Governance and Compliance, what operational governance structures must be implemented during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have disrupted normal operations and decision-making chains. Clear governance structures are needed to maintain operational integrity.</strong>',
    options: [
      'Maintain existing governance structures',
      'Implement enhanced governance including verification protocols, decision escalation procedures, and operational integrity checks',
      'Delegate to operational managers',
      'Focus only on communication protocols'
    ],
    correct_answer: 1,
    explanation: 'Enhanced governance structures ensure operational integrity during disruptions.',
    hints: ['Consider decision-making processes', 'Think about verification and escalation']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'ransom',
    question: 'As Governance and Compliance, what governance protocols must be followed when considering ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Attackers are demanding ransom payment following deepfake attacks. Governance protocols must ensure proper decision-making and regulatory compliance.</strong>',
    options: [
      'Let executives decide independently',
      'Implement formal governance protocols including board approval, legal review, regulatory consultation, and stakeholder notification',
      'Make quick decisions to minimize damage',
      'Focus only on payment logistics'
    ],
    correct_answer: 1,
    explanation: 'Formal governance protocols ensure proper decision-making and regulatory compliance.',
    hints: ['Consider all stakeholders', 'Think about regulatory requirements']
  }
];

console.log('Adding Governance and Compliance questions to reach 35 total...');

db.serialize(() => {
  db.all("SELECT id, name FROM roles WHERE name = 'Governance and Compliance'", [], (err, roles) => {
    if (err) {
      console.error('Error fetching Governance and Compliance role:', err);
      return;
    }
    
    const roleId = roles[0].id;
    console.log('Governance and Compliance Role ID:', roleId);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    governanceQuestions.forEach((q, index) => {
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
          console.log(`✅ Added Governance question ${insertedCount}/${governanceQuestions.length}: ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`\n🎉 Governance and Compliance questions complete! Added ${insertedCount} questions.`);
      console.log('Governance and Compliance should now have 35 questions total (5 per risk card).');
      db.close();
    });
  });
}); 