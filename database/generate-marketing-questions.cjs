const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const marketingQuestions = [
  // Operational Disruptions (4 questions)
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'As Marketing Manager, how should you address customer confusion during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Customers are receiving conflicting messages due to fake communications. Customer service is overwhelmed with inquiries, and brand trust is being questioned.</strong>',
    options: [
      'Wait for operations to normalize before addressing customer concerns',
      'Immediately launch clear communication campaign to address confusion and provide verification channels for authentic information',
      'Focus only on damage control without providing solutions',
      'Redirect all customer inquiries to legal department'
    ],
    correct_answer: 1,
    explanation: 'Proactive customer communication with verification channels helps restore trust and reduces confusion during operational disruptions.',
    hints: ['Think about customer trust and clear communication', 'Consider providing ways for customers to verify authentic information']
  },
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'What marketing channels should be prioritized during deepfake-related operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Normal marketing operations are disrupted. Some channels may be compromised or untrustworthy. Customer outreach requires verified, secure communication methods.</strong>',
    options: [
      'Continue using all existing marketing channels without changes',
      'Prioritize verified, secure channels while establishing authentication protocols for critical customer communications',
      'Suspend all marketing communications until crisis resolves',
      'Switch entirely to third-party communication platforms'
    ],
    correct_answer: 1,
    explanation: 'Verified communication channels maintain customer relationship while ensuring message authenticity during crisis periods.',
    hints: ['Think about which channels customers trust most', 'Consider authentication and verification methods']
  },
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'How should Marketing coordinate with other departments during operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Multiple departments need to communicate with customers and stakeholders. Consistent messaging is critical while operational capabilities are limited.</strong>',
    options: [
      'Allow each department to handle their own customer communications',
      'Establish centralized message coordination to ensure consistent, verified customer communications across all departments',
      'Focus only on marketing department communications',
      'Delegate all communications to external PR agencies'
    ],
    correct_answer: 1,
    explanation: 'Centralized coordination ensures consistent messaging and prevents conflicting communications that could increase customer confusion.',
    hints: ['Think about consistency across departments', 'Consider coordination vs. independent messaging']
  },
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'What customer data protection measures should Marketing implement during operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Customer communications and data may be at risk during the disruption. Marketing databases and customer relationship management systems need enhanced protection.</strong>',
    options: [
      'Maintain normal data handling procedures',
      'Implement enhanced data protection protocols and restrict access to verified personnel only',
      'Stop all customer data collection until operations normalize',
      'Transfer all customer data to external secure storage'
    ],
    correct_answer: 1,
    explanation: 'Enhanced data protection maintains customer trust while ensuring marketing can continue essential customer relationship functions.',
    hints: ['Think about protecting customer data while maintaining operations', 'Consider enhanced security vs. normal procedures']
  },

  // Ransom Pay (3 questions)
  {
    role: 'Marketing',
    risk_card: 'ransom',
    question: 'How should Marketing address customer concerns about potential ransom payments?',
    scenario: '<strong style="font-size: 1.25em">News of ransom demands may become public. Customers want assurance that their data and relationships are protected regardless of payment decisions.</strong>',
    options: [
      'Avoid discussing ransom scenarios with customers',
      'Provide transparent communication about customer protection measures while avoiding specific details about payment decisions',
      'Promise that no ransom will be paid regardless of circumstances',
      'Direct all customer inquiries to law enforcement'
    ],
    correct_answer: 1,
    explanation: 'Transparent communication about customer protection builds trust while avoiding commitments about specific payment decisions.',
    hints: ['Focus on customer protection rather than payment decisions', 'Think about building trust through transparency']
  },
  {
    role: 'Marketing',
    risk_card: 'ransom',
    question: 'What messaging strategy should Marketing develop for potential ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Media coverage of ransom demands could damage brand reputation. Proactive messaging strategy is needed to protect customer relationships and brand value.</strong>',
    options: [
      'Develop reactive responses only after media coverage appears',
      'Create proactive messaging framework that emphasizes customer protection, security investment, and corporate responsibility',
      'Focus messaging entirely on technical security measures',
      'Avoid all public messaging about security incidents'
    ],
    correct_answer: 1,
    explanation: 'Proactive messaging framework demonstrates preparedness and commitment to customer protection, strengthening brand trust.',
    hints: ['Think about proactive vs. reactive messaging', 'Consider what customers need to hear about protection']
  },
  {
    role: 'Marketing',
    risk_card: 'ransom',
    question: 'How should Marketing handle competitive implications of ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Competitors may use ransom payment news to gain market advantage. Marketing strategy must protect competitive position while maintaining customer trust.</strong>',
    options: [
      'Ignore competitive implications and focus only on crisis management',
      'Develop competitive positioning that emphasizes security leadership and customer protection commitment',
      'Attack competitors\' security practices in response',
      'Minimize all discussion of security matters'
    ],
    correct_answer: 1,
    explanation: 'Strategic competitive positioning demonstrates security leadership and customer commitment, turning potential weakness into competitive strength.',
    hints: ['Think about turning crisis into competitive advantage', 'Consider how to demonstrate security leadership']
  },

  // Financial Loss (4 questions)
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'How should Marketing communicate with customers about service impacts from financial constraints?',
    scenario: '<strong style="font-size: 1.25em">Financial losses may require reduced marketing budgets and potential service limitations. Customer communication must maintain relationships while managing expectations.</strong>',
    options: [
      'Avoid mentioning any service changes until they are implemented',
      'Proactively communicate with customers about commitment to service quality while transparently addressing any necessary adjustments',
      'Blame all service issues on the security incident',
      'Immediately reduce all customer services without explanation'
    ],
    correct_answer: 1,
    explanation: 'Proactive, transparent communication maintains customer trust while managing expectations about necessary adjustments.',
    hints: ['Think about maintaining trust while managing expectations', 'Consider transparency vs. avoidance']
  },
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'What customer retention strategies should Marketing prioritize during financial recovery?',
    scenario: '<strong style="font-size: 1.25em">Reduced marketing budgets require strategic focus on highest-value customer retention activities. Resource allocation must maximize customer relationship preservation.</strong>',
    options: [
      'Reduce all customer-facing activities equally',
      'Prioritize high-value customer retention through targeted, cost-effective relationship management programs',
      'Focus only on acquiring new customers to replace losses',
      'Maintain all existing programs regardless of budget constraints'
    ],
    correct_answer: 1,
    explanation: 'Strategic prioritization of high-value customer retention maximizes relationship preservation within budget constraints.',
    hints: ['Think about which customers are most valuable to retain', 'Consider cost-effective retention strategies']
  },
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'How should Marketing demonstrate value during financial recovery periods?',
    scenario: '<strong style="font-size: 1.25em">Marketing budgets are under scrutiny during financial recovery. Clear demonstration of marketing ROI and customer relationship value is essential for maintaining resources.</strong>',
    options: [
      'Continue existing activities without measurement changes',
      'Implement enhanced measurement and reporting to demonstrate clear ROI and customer relationship value',
      'Reduce all marketing activities to minimize costs',
      'Focus only on easily quantifiable short-term metrics'
    ],
    correct_answer: 1,
    explanation: 'Enhanced measurement and ROI demonstration justifies marketing investment and shows contribution to financial recovery.',
    hints: ['Think about proving marketing value during budget pressure', 'Consider comprehensive vs. simple metrics']
  },
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'What cost-effective marketing strategies should be prioritized during financial constraints?',
    scenario: '<strong style="font-size: 1.25em">Marketing must maintain customer relationships and brand presence with reduced budgets. Strategy must focus on high-impact, cost-effective activities.</strong>',
    options: [
      'Eliminate all marketing activities until budgets recover',
      'Focus on high-impact, cost-effective strategies like customer relationship management and digital engagement',
      'Maintain expensive traditional advertising at reduced levels',
      'Copy cost-cutting strategies from other companies'
    ],
    correct_answer: 1,
    explanation: 'Strategic focus on cost-effective, high-impact activities maintains customer relationships while respecting budget constraints.',
    hints: ['Think about maximum impact with minimum cost', 'Consider which activities provide best customer relationship value']
  },

  // Regulatory Notification (3 questions)
  {
    role: 'Marketing',
    risk_card: 'regulatory',
    question: 'How should Marketing coordinate with regulatory notifications affecting customer communications?',
    scenario: '<strong style="font-size: 1.25em">Regulatory notifications may require specific customer communications or disclosures. Marketing must ensure compliance while maintaining positive customer relationships.</strong>',
    options: [
      'Let legal department handle all regulatory communication requirements',
      'Coordinate with legal to ensure customer communications meet regulatory requirements while maintaining positive tone and relationship focus',
      'Ignore regulatory requirements in customer-facing communications',
      'Simply copy regulatory language directly into marketing materials'
    ],
    correct_answer: 1,
    explanation: 'Coordination ensures regulatory compliance while maintaining marketing effectiveness and positive customer relationships.',
    hints: ['Think about meeting legal requirements while maintaining marketing effectiveness', 'Consider coordination vs. delegation']
  },
  {
    role: 'Marketing',
    risk_card: 'regulatory',
    question: 'What customer communication strategy should Marketing develop for regulatory investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulatory investigations may create customer uncertainty and competitive vulnerability. Marketing strategy must address customer concerns while supporting legal compliance.</strong>',
    options: [
      'Avoid all customer communication about regulatory matters',
      'Develop customer communication strategy that addresses concerns transparently while supporting regulatory compliance and maintaining competitive position',
      'Provide detailed information about all aspects of regulatory investigations',
      'Focus customer communications entirely on unrelated marketing messages'
    ],
    correct_answer: 1,
    explanation: 'Strategic customer communication addresses concerns while supporting compliance and maintaining competitive strength.',
    hints: ['Think about balancing transparency with competitive protection', 'Consider customer concerns during investigations']
  },
  {
    role: 'Marketing',
    risk_card: 'regulatory',
    question: 'How should Marketing handle industry reputation impacts from regulatory scrutiny?',
    scenario: '<strong style="font-size: 1.25em">Regulatory scrutiny may affect industry reputation and customer perceptions. Marketing strategy must address broader industry concerns while differentiating company response.</strong>',
    options: [
      'Focus only on company-specific messaging without industry context',
      'Address industry-wide challenges while demonstrating company leadership in security and compliance',
      'Criticize regulatory approaches to deflect attention',
      'Ignore industry reputation issues and focus only on immediate business needs'
    ],
    correct_answer: 1,
    explanation: 'Strategic industry context positioning demonstrates leadership while addressing customer concerns about broader industry challenges.',
    hints: ['Think about industry leadership positioning', 'Consider broader context vs. narrow company focus']
  },

  // Employee Notification (4 questions)
  {
    role: 'Marketing',
    risk_card: 'employment',
    question: 'How should Marketing support internal communications about deepfake incidents affecting employees?',
    scenario: '<strong style="font-size: 1.25em">Employees need clear information about the incident and protective measures. Marketing expertise in clear communication can support HR and management efforts.</strong>',
    options: [
      'Focus only on external customer communications',
      'Collaborate with HR to develop clear, engaging internal communications that help employees understand and respond to deepfake threats',
      'Let HR handle all internal communications without marketing input',
      'Use identical messaging for internal and external audiences'
    ],
    correct_answer: 1,
    explanation: 'Marketing communication expertise helps create clear, engaging internal communications that improve employee understanding and response.',
    hints: ['Think about applying marketing communication skills internally', 'Consider collaboration vs. separation of internal/external communications']
  },
  {
    role: 'Marketing',
    risk_card: 'employment',
    question: 'What role should Marketing play in employee security awareness and training programs?',
    scenario: '<strong style="font-size: 1.25em">Employee training programs need engaging, memorable content about deepfake threats. Marketing skills in content creation and engagement can improve training effectiveness.</strong>',
    options: [
      'Leave all training content creation to IT and security teams',
      'Collaborate to create engaging, memorable training content that effectively communicates deepfake awareness and response procedures',
      'Focus only on training content for customer-facing employees',
      'Create separate marketing-specific training without coordination'
    ],
    correct_answer: 1,
    explanation: 'Marketing expertise in engaging content creation improves training effectiveness and employee retention of critical security information.',
    hints: ['Think about using marketing skills for internal training', 'Consider engaging vs. technical content approaches']
  },
  {
    role: 'Marketing',
    risk_card: 'employment',
    question: 'How should Marketing address customer concerns about employee security during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Customers may worry about employee security training and company vulnerability. Marketing must address these concerns while protecting internal security details.</strong>',
    options: [
      'Avoid discussing employee security measures with customers',
      'Communicate about employee security commitment and training investment while protecting specific security procedure details',
      'Provide detailed information about all employee security procedures',
      'Focus only on technical security measures without mentioning employee factors'
    ],
    correct_answer: 1,
    explanation: 'Strategic communication about employee security commitment addresses customer concerns while protecting operational security details.',
    hints: ['Think about what customers need to know vs. what should remain confidential', 'Consider commitment vs. specific procedures']
  },
  {
    role: 'Marketing',
    risk_card: 'employment',
    question: 'What messaging should Marketing develop about employee resilience and company culture during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">The incident may affect perceptions of company culture and employee morale. Marketing messaging can reinforce positive culture and employee resilience narratives.</strong>',
    options: [
      'Avoid mentioning employee factors in external communications',
      'Develop messaging that highlights employee resilience, training investment, and positive security culture as competitive advantages',
      'Focus only on technical capabilities without cultural elements',
      'Copy employee messaging from other companies\' incidents'
    ],
    correct_answer: 1,
    explanation: 'Employee resilience and culture messaging demonstrates organizational strength and can differentiate company response as a competitive advantage.',
    hints: ['Think about culture and people as competitive advantages', 'Consider how employee resilience demonstrates organizational strength']
  },

  // Crisis Communication (4 questions)
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'What crisis communication strategy should Marketing lead for deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Multiple stakeholders need timely, accurate information. Marketing must coordinate comprehensive crisis communication while ensuring message consistency and brand protection.</strong>',
    options: [
      'React to media coverage and stakeholder inquiries as they arise',
      'Develop proactive, multi-stakeholder crisis communication strategy with coordinated messaging and verified information channels',
      'Focus only on damage control without proactive communication',
      'Delegate all crisis communication to external PR agencies'
    ],
    correct_answer: 1,
    explanation: 'Proactive, coordinated crisis communication strategy ensures consistent messaging and stakeholder confidence while protecting brand reputation.',
    hints: ['Think about proactive vs. reactive communication', 'Consider coordination across multiple stakeholders']
  },
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'How should Marketing manage social media and digital channels during deepfake crisis communications?',
    scenario: '<strong style="font-size: 1.25em">Social media requires rapid response but also verification of authenticity. Digital channels may be compromised or used to spread misinformation about the incident.</strong>',
    options: [
      'Suspend all social media activity until crisis resolution',
      'Implement verified, authenticated social media strategy with rapid response capabilities and misinformation monitoring',
      'Respond to all social media comments and posts immediately',
      'Focus only on traditional media channels'
    ],
    correct_answer: 1,
    explanation: 'Verified social media strategy enables rapid response while ensuring authenticity and monitoring misinformation spread.',
    hints: ['Think about authenticity and verification in social media', 'Consider rapid response vs. verified response']
  },
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'What stakeholder-specific messaging should Marketing coordinate during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">Different stakeholders (customers, investors, media, partners) need tailored messaging while maintaining core message consistency. Coordination prevents conflicting communications.</strong>',
    options: [
      'Use identical messaging for all stakeholders',
      'Develop stakeholder-specific messaging that maintains core message consistency while addressing each group\'s specific concerns and information needs',
      'Let each department develop independent messaging for their stakeholders',
      'Focus only on customer communications'
    ],
    correct_answer: 1,
    explanation: 'Stakeholder-specific messaging addresses unique concerns while maintaining consistency, demonstrating professionalism and thorough crisis management.',
    hints: ['Think about different stakeholder needs while maintaining consistency', 'Consider tailored vs. identical messaging']
  },
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'How should Marketing measure and adjust crisis communication effectiveness during ongoing deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications must be monitored and adjusted based on stakeholder response and evolving situation. Real-time measurement enables communication optimization.</strong>',
    options: [
      'Wait until crisis resolution to evaluate communication effectiveness',
      'Implement real-time monitoring and feedback systems to continuously optimize crisis communication effectiveness and stakeholder response',
      'Focus only on media coverage metrics',
      'Assume initial communication strategy will remain effective throughout crisis'
    ],
    correct_answer: 1,
    explanation: 'Real-time monitoring and adjustment capabilities enable responsive crisis communication that adapts to stakeholder needs and changing circumstances.',
    hints: ['Think about continuous improvement during crisis', 'Consider real-time monitoring vs. post-crisis evaluation']
  },

  // Strategic Impact (3 questions)
  {
    role: 'Marketing',
    risk_card: 'strategic',
    question: 'How should Marketing assess the long-term strategic impact of deepfake incidents on brand and market position?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents may have lasting effects on brand perception, customer relationships, and competitive position. Strategic marketing planning must account for these implications.</strong>',
    options: [
      'Focus only on immediate crisis recovery without long-term planning',
      'Conduct comprehensive strategic impact assessment including brand perception, customer relationships, and competitive positioning implications',
      'Assume brand and market impacts will resolve naturally over time',
      'Copy strategic responses from other companies\' similar incidents'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive strategic assessment enables proactive planning for brand recovery and competitive positioning in evolving threat environment.',
    hints: ['Think about long-term brand and competitive implications', 'Consider comprehensive vs. immediate-focused assessment']
  },
  {
    role: 'Marketing',
    risk_card: 'strategic',
    question: 'What strategic marketing investments should be prioritized following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Marketing strategy must evolve to address ongoing deepfake threats while supporting business objectives. Investment priorities should strengthen both security and competitive positioning.</strong>',
    options: [
      'Maintain existing marketing strategy without modification',
      'Prioritize investments in verified communication channels, customer relationship security, and trust-building initiatives',
      'Focus all marketing investment on crisis response capabilities',
      'Reduce all marketing investments to fund security measures'
    ],
    correct_answer: 1,
    explanation: 'Strategic investment in verified communications and trust-building strengthens both security and competitive positioning for ongoing threat environment.',
    hints: ['Think about investments that serve both security and marketing objectives', 'Consider verified communications and trust-building']
  },
  {
    role: 'Marketing',
    risk_card: 'strategic',
    question: 'How should Marketing integrate deepfake considerations into long-term brand and customer relationship strategy?',
    scenario: '<strong style="font-size: 1.25em">Future marketing strategy must account for ongoing deepfake threats while building stronger customer relationships. Integration must be comprehensive yet sustainable.</strong>',
    options: [
      'Address deepfake considerations as separate from core marketing strategy',
      'Integrate deepfake threat considerations into comprehensive brand and customer relationship strategy that strengthens trust and verification capabilities',
      'Focus entirely on deepfake-related marketing without broader business considerations',
      'Wait for industry standards to emerge before strategic integration'
    ],
    correct_answer: 1,
    explanation: 'Strategic integration builds deepfake resilience into core marketing capabilities, strengthening customer relationships and competitive advantage.',
    hints: ['Think about integration vs. separation of security and marketing considerations', 'Consider building security into core marketing capabilities']
  }
];

console.log('Starting Marketing question generation...');
console.log(`Planning to insert ${marketingQuestions.length} questions`);

db.serialize(() => {
  db.all("SELECT id, name FROM roles", [], (err, roles) => {
    if (err) {
      console.error('Error fetching roles:', err);
      return;
    }
    
    const roleMap = {};
    roles.forEach(role => {
      roleMap[role.name] = role.id;
    });
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    marketingQuestions.forEach((q, index) => {
      const roleId = roleMap[q.role];
      if (!roleId) {
        console.error(`Role not found: ${q.role}`);
        return;
      }
      
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
          console.log(`Inserted question ${insertedCount}/${marketingQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Marketing question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 