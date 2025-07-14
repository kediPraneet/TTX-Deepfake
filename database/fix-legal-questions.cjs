const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// Legal Division questions to add (10 total)
const legalQuestions = [
  // Crisis (need +1)
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'As Legal Division, what crisis litigation preparedness strategies must be implemented during deepfake crisis situations?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have created a legal crisis with potential lawsuits from stakeholders. Crisis litigation preparedness is essential to protect the organization.</strong>',
    options: [
      'Wait for lawsuits to be filed',
      'Implement comprehensive litigation preparedness including evidence preservation, expert witness identification, and settlement strategy development',
      'Focus only on media response',
      'Rely on existing legal counsel'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive litigation preparedness ensures readiness for potential legal challenges.',
    hints: ['Consider evidence preservation', 'Think about expert testimony needs']
  },
  // Employment (need +2)
  {
    role: 'Legal Division',
    risk_card: 'employment',
    question: 'As Legal Division, what employment law compliance measures must be implemented during deepfake employment incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents have affected employee rights and workplace policies. Employment law compliance needs immediate attention to prevent legal violations.</strong>',
    options: [
      'Review only affected policies',
      'Implement comprehensive employment law compliance including privacy rights, discrimination prevention, and workplace safety measures',
      'Wait for employee complaints',
      'Focus only on disciplinary actions'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive employment law compliance protects both employees and the organization.',
    hints: ['Consider all employee rights', 'Think about prevention measures']
  },
  {
    role: 'Legal Division',
    risk_card: 'employment',
    question: 'As Legal Division, what workplace investigation protocols must be established for deepfake employment cases?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents in the workplace require thorough investigation to determine facts and prevent future occurrences. Proper investigation protocols are essential.</strong>',
    options: [
      'Conduct informal inquiries',
      'Establish formal investigation protocols including forensic analysis, witness interviews, and evidence documentation',
      'Let HR handle investigations',
      'Focus only on technical aspects'
    ],
    correct_answer: 1,
    explanation: 'Formal investigation protocols ensure thorough and legally compliant workplace investigations.',
    hints: ['Consider forensic requirements', 'Think about evidence preservation']
  },
  // Financial (need +2)
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'As Legal Division, what financial fraud legal frameworks must be activated during deepfake financial incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have resulted in financial fraud and potential legal liability. Financial fraud legal frameworks need immediate activation.</strong>',
    options: [
      'Report to authorities only',
      'Activate comprehensive fraud legal frameworks including criminal reporting, civil litigation preparation, and regulatory compliance',
      'Focus only on recovery efforts',
      'Wait for law enforcement guidance'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive fraud legal frameworks ensure proper legal response to financial crimes.',
    hints: ['Consider multiple legal avenues', 'Think about prevention and recovery']
  },
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'As Legal Division, what financial liability assessments must be conducted during deepfake financial incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have created potential financial liability for the organization. Comprehensive liability assessments are needed to understand legal exposure.</strong>',
    options: [
      'Assess only direct losses',
      'Conduct comprehensive liability assessments including direct damages, consequential losses, and regulatory penalties',
      'Wait for claims to be filed',
      'Focus only on insurance coverage'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive liability assessments help understand full legal exposure and prepare appropriate responses.',
    hints: ['Consider all types of liability', 'Think about future claims']
  },
  // Operational (need +1)
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'As Legal Division, what operational compliance audits must be conducted during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have disrupted normal operations and may have created compliance violations. Operational compliance audits are needed to identify issues.</strong>',
    options: [
      'Conduct basic compliance checks',
      'Implement comprehensive operational compliance audits including regulatory review, policy compliance, and corrective action planning',
      'Wait for external audits',
      'Focus only on major violations'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive operational compliance audits ensure all regulatory requirements are met.',
    hints: ['Consider all regulatory areas', 'Think about corrective actions']
  },
  // Ransom (need +1)
  {
    role: 'Legal Division',
    risk_card: 'ransom',
    question: 'As Legal Division, what legal risk assessments must be conducted before making ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Ransom demands have been made following deepfake attacks. Legal risk assessments are crucial before making any payment decisions.</strong>',
    options: [
      'Assess only payment legality',
      'Conduct comprehensive legal risk assessments including sanctions compliance, criminal liability, and regulatory consequences',
      'Let executives decide',
      'Focus only on business impact'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive legal risk assessments ensure all legal implications are considered before payment decisions.',
    hints: ['Consider all legal consequences', 'Think about regulatory compliance']
  },
  // Regulatory (need +1)
  {
    role: 'Legal Division',
    risk_card: 'regulatory',
    question: 'As Legal Division, what regulatory enforcement defense strategies must be prepared during deepfake regulatory incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory enforcement actions are likely following deepfake incidents. Defense strategies need preparation to protect the organization.</strong>',
    options: [
      'Wait for enforcement actions',
      'Prepare comprehensive defense strategies including legal arguments, mitigation evidence, and cooperation frameworks',
      'Focus only on compliance remediation',
      'Rely on regulatory relationships'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive defense strategies prepare the organization for potential regulatory enforcement.',
    hints: ['Consider legal arguments', 'Think about mitigation evidence']
  },
  // Strategic (need +2)
  {
    role: 'Legal Division',
    risk_card: 'strategic',
    question: 'As Legal Division, what strategic legal planning must be conducted for long-term deepfake incident management?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents require long-term strategic legal planning to prevent future occurrences and manage ongoing legal risks.</strong>',
    options: [
      'Focus only on current incidents',
      'Develop comprehensive strategic legal plans including prevention policies, legal technology adoption, and stakeholder protection frameworks',
      'Wait for industry standards',
      'Rely on existing legal frameworks'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive strategic legal planning ensures long-term protection and prevention.',
    hints: ['Consider future prevention', 'Think about technology adoption']
  },
  {
    role: 'Legal Division',
    risk_card: 'strategic',
    question: 'As Legal Division, what legal technology integration strategies must be implemented for deepfake detection and prevention?',
    scenario: '<strong style="font-size: 1.25em">Advanced legal technology is needed to detect and prevent deepfake incidents. Integration strategies must balance effectiveness with legal compliance.</strong>',
    options: [
      'Implement basic detection tools',
      'Develop comprehensive legal technology integration including AI-powered detection, blockchain verification, and privacy-compliant monitoring',
      'Wait for proven solutions',
      'Focus only on detection capabilities'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive legal technology integration provides advanced protection while maintaining legal compliance.',
    hints: ['Consider privacy compliance', 'Think about verification technologies']
  }
];

console.log('Adding Legal Division questions to reach 35 total...');

db.serialize(() => {
  db.all("SELECT id, name FROM roles WHERE name = 'Legal Division'", [], (err, roles) => {
    if (err) {
      console.error('Error fetching Legal Division role:', err);
      return;
    }
    
    const roleId = roles[0].id;
    console.log('Legal Division Role ID:', roleId);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    legalQuestions.forEach((q, index) => {
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
          console.log(`✅ Added Legal Division question ${insertedCount}/${legalQuestions.length}: ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`\n🎉 Legal Division questions complete! Added ${insertedCount} questions.`);
      console.log('Legal Division should now have 35 questions total (5 per risk card).');
      db.close();
    });
  });
}); 