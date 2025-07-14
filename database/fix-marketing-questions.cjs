const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// Marketing questions to add (10 total)
const marketingQuestions = [
  // Crisis (need +1)
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'As Marketing Director, what crisis brand recovery strategies must be implemented following deepfake crisis incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have damaged brand reputation and customer trust. Crisis brand recovery strategies are essential to restore market confidence.</strong>',
    options: [
      'Wait for media attention to diminish',
      'Implement comprehensive brand recovery strategies including reputation monitoring, stakeholder engagement, and trust rebuilding campaigns',
      'Focus only on advertising',
      'Rely on existing brand strength'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive brand recovery strategies help restore reputation and rebuild customer trust.',
    hints: ['Consider all stakeholders', 'Think about trust rebuilding']
  },
  // Employment (need +1)
  {
    role: 'Marketing',
    risk_card: 'employment',
    question: 'As Marketing Director, what internal communication strategies must be implemented during deepfake employment incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents have affected employee morale and internal communications. Strategic internal communication is needed to maintain team cohesion.</strong>',
    options: [
      'Send basic notifications',
      'Implement comprehensive internal communication strategies including employee updates, morale boosting, and transparent leadership communication',
      'Wait for incident resolution',
      'Focus only on management updates'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive internal communication strategies maintain employee morale and team unity.',
    hints: ['Consider employee concerns', 'Think about transparency']
  },
  // Financial (need +1)
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'As Marketing Director, what marketing budget reallocation strategies must be implemented during deepfake financial incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents have impacted marketing budgets and spending priorities. Strategic budget reallocation is needed to address crisis communications.</strong>',
    options: [
      'Maintain existing budget allocation',
      'Implement strategic budget reallocation including crisis communication funding, reputation management, and emergency response marketing',
      'Reduce all marketing spending',
      'Focus only on essential campaigns'
    ],
    correct_answer: 1,
    explanation: 'Strategic budget reallocation ensures adequate resources for crisis response and reputation management.',
    hints: ['Consider crisis priorities', 'Think about resource allocation']
  },
  // Operational (need +1)
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'As Marketing Director, what marketing operations continuity plans must be activated during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have disrupted marketing operations and campaign management. Continuity plans are needed to maintain marketing effectiveness.</strong>',
    options: [
      'Pause all marketing activities',
      'Activate comprehensive continuity plans including backup systems, alternative workflows, and crisis-adapted marketing strategies',
      'Reduce marketing efforts',
      'Focus only on digital channels'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive continuity plans ensure marketing operations can continue effectively during disruptions.',
    hints: ['Consider backup systems', 'Think about workflow alternatives']
  },
  // Ransom (need +2)
  {
    role: 'Marketing',
    risk_card: 'ransom',
    question: 'As Marketing Director, what crisis communication protocols must be followed during ransom demand situations?',
    scenario: '<strong style="font-size: 1.25em">Ransom demands have been made following deepfake attacks. Crisis communication protocols are crucial to manage stakeholder concerns.</strong>',
    options: [
      'Avoid public communication',
      'Implement comprehensive crisis communication protocols including stakeholder notification, transparency frameworks, and reputation protection measures',
      'Make minimal statements',
      'Focus only on media relations'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive crisis communication protocols ensure appropriate stakeholder management during ransom situations.',
    hints: ['Consider all stakeholders', 'Think about transparency balance']
  },
  {
    role: 'Marketing',
    risk_card: 'ransom',
    question: 'As Marketing Director, what brand protection strategies must be implemented during ransom payment considerations?',
    scenario: '<strong style="font-size: 1.25em">Ransom payment decisions could impact brand reputation and customer trust. Brand protection strategies are essential to minimize damage.</strong>',
    options: [
      'Wait for payment decision',
      'Implement comprehensive brand protection strategies including reputation monitoring, stakeholder communication, and trust preservation campaigns',
      'Focus only on damage control',
      'Rely on legal team guidance'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive brand protection strategies help minimize reputation damage during ransom situations.',
    hints: ['Consider reputation impact', 'Think about trust preservation']
  },
  // Regulatory (need +2)
  {
    role: 'Marketing',
    risk_card: 'regulatory',
    question: 'As Marketing Director, what regulatory compliance communication strategies must be implemented during deepfake regulatory incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory investigations are underway following deepfake incidents. Compliance communication strategies are needed to manage regulatory relationships.</strong>',
    options: [
      'Avoid regulatory communication',
      'Implement comprehensive compliance communication strategies including regulatory updates, cooperation messaging, and stakeholder reassurance',
      'Focus only on legal compliance',
      'Let legal team handle communications'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive compliance communication strategies help maintain positive regulatory relationships.',
    hints: ['Consider regulatory expectations', 'Think about cooperation messaging']
  },
  {
    role: 'Marketing',
    risk_card: 'regulatory',
    question: 'As Marketing Director, what marketing compliance audit strategies must be conducted during deepfake regulatory incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory scrutiny requires review of marketing practices and compliance. Audit strategies are needed to ensure all marketing activities meet regulatory standards.</strong>',
    options: [
      'Review only recent campaigns',
      'Conduct comprehensive marketing compliance audits including content review, claim verification, and regulatory alignment assessment',
      'Wait for regulatory guidance',
      'Focus only on problematic areas'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive marketing compliance audits ensure all marketing activities meet regulatory standards.',
    hints: ['Consider all marketing activities', 'Think about regulatory alignment']
  },
  // Strategic (need +2)
  {
    role: 'Marketing',
    risk_card: 'strategic',
    question: 'As Marketing Director, what long-term marketing strategy adjustments must be made following deepfake strategic incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents have highlighted the need for strategic marketing adjustments. Long-term strategy modifications are needed to address new market realities.</strong>',
    options: [
      'Maintain existing strategy',
      'Implement comprehensive strategy adjustments including trust-building focus, authenticity verification, and crisis-resilient marketing approaches',
      'Make minimal changes',
      'Focus only on digital security'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive strategy adjustments help adapt marketing to new challenges and opportunities.',
    hints: ['Consider long-term impact', 'Think about authenticity requirements']
  },
  {
    role: 'Marketing',
    risk_card: 'strategic',
    question: 'As Marketing Director, what marketing technology integration strategies must be implemented for deepfake detection and prevention?',
    scenario: '<strong style="font-size: 1.25em">Advanced marketing technology is needed to detect and prevent deepfake incidents in marketing contexts. Integration strategies must balance innovation with practicality.</strong>',
    options: [
      'Implement basic detection tools',
      'Develop comprehensive marketing technology integration including AI-powered content verification, blockchain authentication, and real-time monitoring systems',
      'Wait for industry standards',
      'Focus only on detection capabilities'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive marketing technology integration provides advanced protection while maintaining marketing effectiveness.',
    hints: ['Consider content verification', 'Think about authentication technologies']
  }
];

console.log('Adding Marketing questions to reach 35 total...');

db.serialize(() => {
  db.all("SELECT id, name FROM roles WHERE name = 'Marketing'", [], (err, roles) => {
    if (err) {
      console.error('Error fetching Marketing role:', err);
      return;
    }
    
    const roleId = roles[0].id;
    console.log('Marketing Role ID:', roleId);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    marketingQuestions.forEach((q, index) => {
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
          console.log(`✅ Added Marketing question ${insertedCount}/${marketingQuestions.length}: ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`\n🎉 Marketing questions complete! Added ${insertedCount} questions.`);
      console.log('Marketing should now have 35 questions total (5 per risk card).');
      db.close();
    });
  });
}); 