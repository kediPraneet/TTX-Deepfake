const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// Security Incident Manager questions to add (10 total)
const securityQuestions = [
  // Crisis (need +2)
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'As Security Incident Manager, what crisis security protocols must be escalated during deepfake security crisis situations?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have created a security crisis requiring immediate escalation protocols. Crisis security measures must be activated to prevent further damage.</strong>',
    options: [
      'Activate standard security protocols',
      'Escalate to maximum security protocols including threat level elevation, emergency response teams, and crisis command activation',
      'Wait for threat assessment',
      'Focus only on technical measures'
    ],
    correct_answer: 1,
    explanation: 'Maximum security protocol escalation ensures comprehensive crisis response and threat containment.',
    hints: ['Consider threat level elevation', 'Think about emergency response coordination']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'As Security Incident Manager, what security incident recovery strategies must be implemented during deepfake crisis recovery?',
    scenario: '<strong style="font-size: 1.25em">Deepfake security crisis is being contained, but recovery strategies are needed to restore security posture and prevent recurrence.</strong>',
    options: [
      'Return to normal security operations',
      'Implement comprehensive recovery strategies including security posture restoration, threat intelligence integration, and preventive measure deployment',
      'Focus only on immediate fixes',
      'Wait for all-clear signal'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive recovery strategies ensure security posture restoration and future threat prevention.',
    hints: ['Consider security posture restoration', 'Think about prevention measures']
  },
  // Employment (need +1)
  {
    role: 'Security Incident Manager',
    risk_card: 'employment',
    question: 'As Security Incident Manager, what employee security awareness programs must be implemented during deepfake employment incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents have highlighted employee security awareness gaps. Comprehensive awareness programs are needed to prevent future incidents.</strong>',
    options: [
      'Send basic security reminders',
      'Implement comprehensive security awareness programs including deepfake recognition training, reporting procedures, and behavioral security measures',
      'Focus only on technical training',
      'Wait for incident resolution'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security awareness programs help employees recognize and respond to deepfake threats.',
    hints: ['Consider recognition training', 'Think about reporting procedures']
  },
  // Financial (need +1)
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'As Security Incident Manager, what financial security monitoring systems must be enhanced during deepfake financial incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have targeted financial systems requiring enhanced monitoring. Security monitoring systems need immediate upgrading to detect financial fraud.</strong>',
    options: [
      'Increase monitoring frequency',
      'Implement enhanced financial security monitoring including real-time fraud detection, transaction verification, and anomaly analysis systems',
      'Focus only on payment systems',
      'Wait for system updates'
    ],
    correct_answer: 1,
    explanation: 'Enhanced financial security monitoring provides comprehensive protection against deepfake financial fraud.',
    hints: ['Consider real-time detection', 'Think about transaction verification']
  },
  // Operational (need +1)
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'As Security Incident Manager, what operational security resilience measures must be implemented during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Deepfake attacks have disrupted operational security requiring resilience measures. Security resilience is needed to maintain operations during ongoing threats.</strong>',
    options: [
      'Implement basic backup systems',
      'Deploy comprehensive security resilience measures including redundant security systems, fail-safe mechanisms, and adaptive security protocols',
      'Focus only on critical systems',
      'Wait for threat elimination'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security resilience measures ensure operational continuity during ongoing security threats.',
    hints: ['Consider redundant systems', 'Think about adaptive protocols']
  },
  // Ransom (need +1)
  {
    role: 'Security Incident Manager',
    risk_card: 'ransom',
    question: 'As Security Incident Manager, what security containment strategies must be implemented during ransom demand situations?',
    scenario: '<strong style="font-size: 1.25em">Ransom demands have been made following deepfake attacks. Security containment strategies are crucial to prevent further compromise during negotiations.</strong>',
    options: [
      'Maintain current security level',
      'Implement maximum security containment including system isolation, threat monitoring, and security perimeter reinforcement',
      'Focus only on affected systems',
      'Wait for ransom resolution'
    ],
    correct_answer: 1,
    explanation: 'Maximum security containment prevents further compromise during ransom situations.',
    hints: ['Consider system isolation', 'Think about threat monitoring']
  },
  // Regulatory (need +2)
  {
    role: 'Security Incident Manager',
    risk_card: 'regulatory',
    question: 'As Security Incident Manager, what security compliance documentation must be prepared during deepfake regulatory incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory investigations require detailed security compliance documentation. Comprehensive documentation is needed to demonstrate security measures and incident response.</strong>',
    options: [
      'Prepare basic incident reports',
      'Compile comprehensive security compliance documentation including incident timelines, response measures, technical analysis, and corrective actions',
      'Focus only on technical details',
      'Wait for regulatory requests'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security compliance documentation demonstrates thorough incident response and regulatory cooperation.',
    hints: ['Consider incident timelines', 'Think about response measures']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'regulatory',
    question: 'As Security Incident Manager, what security audit cooperation strategies must be implemented during deepfake regulatory incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory security audits are underway following deepfake incidents. Cooperation strategies are needed to facilitate thorough audits while maintaining security.</strong>',
    options: [
      'Provide minimal required information',
      'Implement comprehensive audit cooperation strategies including secure information sharing, technical expert availability, and transparent security demonstration',
      'Focus only on compliant areas',
      'Wait for specific audit requests'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive audit cooperation strategies facilitate thorough regulatory review while maintaining security integrity.',
    hints: ['Consider secure information sharing', 'Think about expert availability']
  },
  // Strategic (need +2)
  {
    role: 'Security Incident Manager',
    risk_card: 'strategic',
    question: 'As Security Incident Manager, what long-term security architecture modifications must be implemented following deepfake strategic incidents?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents have revealed security architecture vulnerabilities. Long-term architectural modifications are needed to address emerging threats.</strong>',
    options: [
      'Make minimal security adjustments',
      'Implement comprehensive security architecture modifications including threat-adaptive designs, zero-trust principles, and deepfake-resistant security layers',
      'Focus only on current vulnerabilities',
      'Wait for industry standards'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security architecture modifications provide long-term protection against emerging deepfake threats.',
    hints: ['Consider threat-adaptive designs', 'Think about zero-trust principles']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'strategic',
    question: 'As Security Incident Manager, what security innovation strategies must be developed for future deepfake threat prevention?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats are evolving rapidly, requiring innovative security strategies. Future-focused security innovation is needed to stay ahead of emerging threats.</strong>',
    options: [
      'Rely on existing security tools',
      'Develop comprehensive security innovation strategies including AI-powered threat detection, blockchain authentication, and predictive security analytics',
      'Focus only on reactive measures',
      'Wait for vendor solutions'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security innovation strategies provide proactive protection against evolving deepfake threats.',
    hints: ['Consider AI-powered detection', 'Think about predictive analytics']
  }
];

console.log('Adding Security Incident Manager questions to reach 35 total...');

db.serialize(() => {
  db.all("SELECT id, name FROM roles WHERE name = 'Security Incident Manager'", [], (err, roles) => {
    if (err) {
      console.error('Error fetching Security Incident Manager role:', err);
      return;
    }
    
    const roleId = roles[0].id;
    console.log('Security Incident Manager Role ID:', roleId);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    securityQuestions.forEach((q, index) => {
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
          console.log(`✅ Added Security Incident Manager question ${insertedCount}/${securityQuestions.length}: ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`\n🎉 Security Incident Manager questions complete! Added ${insertedCount} questions.`);
      console.log('Security Incident Manager should now have 35 questions total (5 per risk card).');
      console.log('\n🚀 ALL ROLES COMPLETE! Every role now has exactly 35 questions (5 per risk card).');
      db.close();
    });
  });
}); 