const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const itQuestions = [
  // Operational Disruptions (4 questions)
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'As IT Systems Manager, what is your first priority when deepfake content disrupts business operations?',
    scenario: '<strong style="font-size: 1.25em">Fake executive communications are circulating internally and externally. Employees are confused about which directives are authentic, causing operational paralysis.</strong>',
    options: [
      'Immediately shut down all communication systems',
      'Activate incident response protocols and establish verified communication channels',
      'Wait for management direction',
      'Focus only on external threat detection'
    ],
    correct_answer: 1,
    explanation: 'Rapid activation of incident response with verified communication channels is critical for operational continuity.',
    hints: ['Think about establishing trust in communications', 'Consider predefined response procedures']
  },
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'How should IT Systems prioritize technology resources during deepfake-related operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Multiple critical systems need attention: authentication servers, communication platforms, detection tools, and backup systems. Resources are limited and operations are impacted.</strong>',
    options: [
      'Address systems in order of technical complexity',
      'Prioritize based on business impact and operational criticality',
      'Focus only on the most damaged systems',
      'Treat all systems with equal priority'
    ],
    correct_answer: 1,
    explanation: 'Business impact prioritization ensures the most critical operational functions are restored first.',
    hints: ['Consider which systems affect core business operations', 'Think about cascading effects of system failures']
  },
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'What technical measures should IT implement to restore operational trust after deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employee confidence in digital communications is shattered. Normal operational workflows require digital verification and authentication to resume effectively.</strong>',
    options: [
      'Simply increase password complexity',
      'Implement multi-factor authentication, digital signatures, and verified communication protocols',
      'Revert to paper-based processes only',
      'Wait for employee confidence to naturally recover'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive technical safeguards rebuild trust through verifiable and authenticated communications.',
    hints: ['Think about how to prove authenticity of communications', 'Consider multiple layers of verification']
  },
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'How should IT Systems manage business continuity during ongoing deepfake threats?',
    scenario: '<strong style="font-size: 1.25em">The threat may persist for weeks. Business operations must continue while maintaining heightened security and verification standards.</strong>',
    options: [
      'Maintain maximum security at the cost of operational efficiency',
      'Balance security enhancements with operational efficiency through risk-based controls',
      'Return to normal operations immediately',
      'Operate in crisis mode indefinitely'
    ],
    correct_answer: 1,
    explanation: 'Sustainable business continuity requires balanced security measures that protect without paralyzing operations.',
    hints: ['Consider long-term sustainability of security measures', 'Think about balancing protection with productivity']
  },

  // Ransom Pay (3 questions)
  {
    role: 'IT System',
    risk_card: 'ransom',
    question: 'As IT Systems Manager, what technical factors should influence the ransom payment decision?',
    scenario: '<strong style="font-size: 1.25em">Attackers demand payment to stop circulating deepfake content. Management needs technical assessment of whether the threat can be mitigated without payment.</strong>',
    options: [
      'Recommend payment as the fastest solution',
      'Assess technical capabilities for content detection, removal, and prevention compared to payment scenarios',
      'Focus only on current technical defenses',
      'Leave the decision entirely to management'
    ],
    correct_answer: 1,
    explanation: 'Technical assessment of mitigation capabilities versus payment effectiveness informs strategic decision-making.',
    hints: ['Compare technical solutions to payment outcomes', 'Think about long-term technical capabilities']
  },
  {
    role: 'IT System',
    risk_card: 'ransom',
    question: 'What technical documentation should IT maintain during ransom negotiations?',
    scenario: '<strong style="font-size: 1.25em">Whether paying or not, detailed technical records of the attack, response capabilities, and decisions will be needed for legal, insurance, and future prevention purposes.</strong>',
    options: [
      'Basic incident logs only',
      'Comprehensive technical documentation including attack vectors, response actions, capability assessments, and decision rationales',
      'Minimal documentation to avoid legal exposure',
      'Focus only on successful response actions'
    ],
    correct_answer: 1,
    explanation: 'Thorough technical documentation supports legal defense, insurance claims, and improves future incident response.',
    hints: ['Think about what investigators and insurers will need', 'Consider lessons learned for future incidents']
  },
  {
    role: 'IT System',
    risk_card: 'ransom',
    question: 'How should IT Systems prepare for post-ransom scenarios regardless of payment decision?',
    scenario: '<strong style="font-size: 1.25em">Whether paying or not paying, IT must be ready for potential escalation, continued attacks, or copycat incidents targeting the organization.</strong>',
    options: [
      'Assume the threat will end with the payment decision',
      'Enhance detection, response, and prevention capabilities regardless of payment outcome',
      'Focus only on current incident resolution',
      'Wait to see if additional threats emerge'
    ],
    correct_answer: 1,
    explanation: 'Proactive security enhancement protects against continued threats regardless of immediate payment decisions.',
    hints: ['Think about ongoing threat landscape', 'Consider that payment decisions might not end the threat']
  },

  // Financial Loss (4 questions)
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'How should IT Systems quantify technology-related financial losses from deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">Management needs accurate assessment of IT-related costs: incident response, system downtime, recovery efforts, and necessary security improvements.</strong>',
    options: [
      'Estimate costs roughly based on time spent',
      'Develop comprehensive cost model including direct response costs, productivity losses, and required security investments',
      'Focus only on easily quantifiable hardware costs',
      'Use industry average estimates'
    ],
    correct_answer: 1,
    explanation: 'Accurate cost assessment requires comprehensive analysis of all technology-related impacts and necessary investments.',
    hints: ['Consider both visible and hidden IT costs', 'Think about immediate and future technology investments needed']
  },
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'What technology investments should IT prioritize for financial loss recovery?',
    scenario: '<strong style="font-size: 1.25em">Budget constraints require strategic technology investments. Options include detection tools, monitoring systems, authentication improvements, and staff training.</strong>',
    options: [
      'Invest equally across all technology areas',
      'Prioritize investments based on risk reduction and ROI analysis specific to deepfake threats',
      'Focus only on the most expensive solutions',
      'Implement minimal changes to save money'
    ],
    correct_answer: 1,
    explanation: 'Strategic technology investment based on risk-adjusted returns maximizes protection within budget constraints.',
    hints: ['Think about which technologies provide the best protection per dollar', 'Consider deepfake-specific threats']
  },
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'How should IT Systems optimize costs during financial recovery from deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">The organization needs to reduce costs while maintaining security improvements. IT must balance budget pressures with security requirements.</strong>',
    options: [
      'Cut all non-essential IT spending immediately',
      'Optimize spending through strategic vendor negotiations, open-source alternatives, and phased implementations',
      'Maintain all current spending levels',
      'Focus only on the cheapest security solutions'
    ],
    correct_answer: 1,
    explanation: 'Strategic cost optimization maintains security effectiveness while addressing financial pressures through smart procurement and implementation strategies.',
    hints: ['Think about maintaining security while reducing costs', 'Consider creative approaches to cost management']
  },
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'What metrics should IT track to demonstrate financial value during recovery?',
    scenario: '<strong style="font-size: 1.25em">Management needs evidence that IT investments are providing financial value and risk reduction. Clear metrics are needed to justify continued security spending.</strong>',
    options: [
      'Track only basic uptime metrics',
      'Develop comprehensive metrics including threat detection rates, incident response times, prevention effectiveness, and cost avoidance',
      'Focus solely on cost reduction metrics',
      'Wait for return on investment to become obvious'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive metrics demonstrate IT value through measurable risk reduction and prevention effectiveness.',
    hints: ['Think about how to prove IT investments prevent losses', 'Consider both efficiency and effectiveness metrics']
  },

  // Regulatory Notification (3 questions)
  {
    role: 'IT System',
    risk_card: 'regulatory',
    question: 'What technical information must IT provide for regulatory notifications about deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory agencies require detailed technical information about the incident, affected systems, response actions, and security measures. Accuracy and completeness are critical.</strong>',
    options: [
      'Provide minimal technical details',
      'Prepare comprehensive technical documentation including attack vectors, affected systems, response timeline, and remediation measures',
      'Wait for specific regulatory requests',
      'Focus only on successful response actions'
    ],
    correct_answer: 1,
    explanation: 'Regulatory compliance requires thorough technical documentation demonstrating professional incident response and remediation.',
    hints: ['Think about what technical details regulators need', 'Consider demonstrating professional response capabilities']
  },
  {
    role: 'IT System',
    risk_card: 'regulatory',
    question: 'How should IT Systems ensure technical compliance during regulatory investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulatory investigators need access to technical systems and logs. IT must balance regulatory cooperation with operational security and legal considerations.</strong>',
    options: [
      'Provide unlimited access to all systems',
      'Coordinate with legal counsel to provide appropriate technical access while maintaining system security and legal protections',
      'Deny access until compelled by court order',
      'Allow investigators to work independently'
    ],
    correct_answer: 1,
    explanation: 'Regulatory cooperation requires balanced approach that provides necessary access while maintaining security and legal protections.',
    hints: ['Balance cooperation with security', 'Consider legal guidance for technical access']
  },
  {
    role: 'IT System',
    risk_card: 'regulatory',
    question: 'What technical controls should IT implement to prevent future regulatory violations?',
    scenario: '<strong style="font-size: 1.25em">Regulators expect enhanced technical controls to prevent similar incidents. IT must implement measures that demonstrate compliance commitment while being technically feasible.</strong>',
    options: [
      'Implement minimal technical changes',
      'Develop comprehensive technical control framework addressing detection, prevention, response, and monitoring requirements',
      'Copy controls from other organizations',
      'Focus only on regulatory compliance without considering business impact'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive technical controls demonstrate regulatory commitment while providing practical protection against future incidents.',
    hints: ['Think about comprehensive vs. minimal compliance', 'Consider controls that work for both regulation and business protection']
  },

  // Employee Notification (4 questions)
  {
    role: 'IT System',
    risk_card: 'employment',
    question: 'How should IT Systems communicate technical aspects of deepfake incidents to employees?',
    scenario: '<strong style="font-size: 1.25em">Employees need to understand the technical nature of the threat and protective measures without creating panic or compromising security details.</strong>',
    options: [
      'Avoid sharing any technical details',
      'Provide clear, educational information about deepfake threats and protective technologies while maintaining appropriate security boundaries',
      'Share all technical details about the attack',
      'Focus only on what employees did wrong'
    ],
    correct_answer: 1,
    explanation: 'Educational communication builds employee awareness and cooperation while maintaining appropriate security boundaries.',
    hints: ['Think about balancing education with security', 'Consider what employees need to know to help protect the organization']
  },
  {
    role: 'IT System',
    risk_card: 'employment',
    question: 'What technical training should IT provide to employees following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employee training must cover deepfake detection, verification procedures, and response protocols. Training must be practical and effective without overwhelming non-technical staff.</strong>',
    options: [
      'Provide basic awareness training only',
      'Develop comprehensive, role-specific training covering detection, verification, and response appropriate to each employee\'s responsibilities',
      'Focus training only on technical staff',
      'Use generic cybersecurity training materials'
    ],
    correct_answer: 1,
    explanation: 'Effective training must be comprehensive yet appropriate to each role, ensuring all employees can contribute to organizational protection.',
    hints: ['Think about different roles needing different training levels', 'Consider practical skills employees need']
  },
  {
    role: 'IT System',
    risk_card: 'employment',
    question: 'How should IT manage employee access and verification during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Normal authentication may be insufficient during deepfake threats. Enhanced verification may be needed while maintaining operational efficiency for legitimate employees.</strong>',
    options: [
      'Immediately restrict all employee access',
      'Implement enhanced verification procedures that balance security with operational needs',
      'Maintain normal access procedures',
      'Require physical presence for all authentications'
    ],
    correct_answer: 1,
    explanation: 'Enhanced verification procedures must increase security against deepfake threats while maintaining practical operational capabilities.',
    hints: ['Think about balancing security with operational efficiency', 'Consider how to verify identity when digital methods might be compromised']
  },
  {
    role: 'IT System',
    risk_card: 'employment',
    question: 'What technical support should IT provide for employee stress and productivity during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employees are stressed about digital security and productivity is declining. IT support and tools may help maintain both security and productivity.</strong>',
    options: [
      'Focus only on security measures',
      'Provide technical tools and support that enhance both security and productivity, reducing employee stress through reliable, user-friendly solutions',
      'Ignore productivity concerns during security incidents',
      'Remove security measures to improve productivity'
    ],
    correct_answer: 1,
    explanation: 'Effective technical support addresses both security and productivity needs, reducing stress through reliable and user-friendly solutions.',
    hints: ['Think about how technology can reduce stress while improving security', 'Consider user-friendly security solutions']
  },

  // Crisis Communication (4 questions)
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'How should IT Systems support crisis communication during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications must be verified and trusted. IT needs to provide technical infrastructure and verification methods for authentic communication channels.</strong>',
    options: [
      'Use normal communication systems without changes',
      'Establish verified communication channels with technical authentication and backup systems for crisis communications',
      'Shut down all digital communications',
      'Rely entirely on external communication providers'
    ],
    correct_answer: 1,
    explanation: 'Crisis communication requires technically verified channels that stakeholders can trust during periods of uncertainty.',
    hints: ['Think about how to prove communications are authentic', 'Consider backup systems and redundancy']
  },
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'What technical information should IT share during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">Stakeholders want technical details about the incident and protective measures. IT must balance transparency with security and competitive considerations.</strong>',
    options: [
      'Share no technical details',
      'Provide appropriate technical information that builds confidence without compromising security or competitive advantage',
      'Share all technical details about systems and responses',
      'Focus only on technical problems without mentioning solutions'
    ],
    correct_answer: 1,
    explanation: 'Strategic technical communication builds stakeholder confidence while protecting security and competitive information.',
    hints: ['Think about what builds confidence without compromising security', 'Consider competitive implications of technical disclosures']
  },
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'How should IT coordinate with external parties during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">External parties including vendors, partners, and authorities need technical information. Coordination must be secure and consistent with overall crisis communication strategy.</strong>',
    options: [
      'Share information independently without coordination',
      'Establish secure coordination protocols that align technical information sharing with overall crisis communication strategy',
      'Refuse to share information with external parties',
      'Let external parties communicate directly with media'
    ],
    correct_answer: 1,
    explanation: 'Coordinated external communication ensures consistent messaging while maintaining appropriate security boundaries.',
    hints: ['Think about consistency across all communications', 'Consider security of external communications']
  },
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'What technical measures should IT implement for ongoing crisis communication needs?',
    scenario: '<strong style="font-size: 1.25em">The crisis may continue for extended periods. Technical infrastructure must support sustained crisis communication while maintaining security and reliability.</strong>',
    options: [
      'Use existing systems without modifications',
      'Implement robust, scalable communication infrastructure with enhanced security and verification capabilities for sustained crisis management',
      'Plan for crisis resolution within days',
      'Rely entirely on manual communication processes'
    ],
    correct_answer: 1,
    explanation: 'Sustained crisis communication requires robust technical infrastructure that can maintain security and reliability over extended periods.',
    hints: ['Think about long-term sustainability of crisis communication', 'Consider scalability and reliability requirements']
  },

  // Strategic Impact (3 questions)
  {
    role: 'IT System',
    risk_card: 'strategic',
    question: 'How should IT Systems evaluate the strategic technology implications of deepfake threats?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats may require fundamental changes to technology strategy, architecture, and capabilities. Long-term planning must account for evolving threat landscape.</strong>',
    options: [
      'Continue with existing technology strategy',
      'Conduct comprehensive strategic technology assessment incorporating deepfake threat evolution and defensive technology advancement',
      'Focus only on immediate threat response',
      'Copy strategies from other organizations'
    ],
    correct_answer: 1,
    explanation: 'Strategic technology planning requires comprehensive assessment of evolving threats and advancing defensive capabilities.',
    hints: ['Think about long-term technology evolution', 'Consider how threats and defenses will evolve together']
  },
  {
    role: 'IT System',
    risk_card: 'strategic',
    question: 'What strategic technology investments should IT prioritize following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Long-term technology strategy must balance deepfake defense with other business technology needs. Investment priorities should align with strategic business objectives.</strong>',
    options: [
      'Focus exclusively on deepfake defense technologies',
      'Integrate deepfake defense capabilities into broader strategic technology investments that support business objectives',
      'Maintain existing investment priorities unchanged',
      'Wait for technology standards to emerge'
    ],
    correct_answer: 1,
    explanation: 'Strategic technology investment integrates threat defense with business objectives for maximum value and sustainability.',
    hints: ['Think about integrating security with business value', 'Consider technologies that serve multiple purposes']
  },
  {
    role: 'IT System',
    risk_card: 'strategic',
    question: 'How should IT Systems plan for future deepfake threat evolution?',
    scenario: '<strong style="font-size: 1.25em">Deepfake technology will continue evolving, potentially outpacing current defenses. Strategic planning must anticipate technological advancement on both sides.</strong>',
    options: [
      'Assume current defenses will remain adequate',
      'Develop adaptive technology strategy that can evolve with advancing threats while maintaining business functionality',
      'Plan to always be reactive to new threats',
      'Focus only on currently available technologies'
    ],
    correct_answer: 1,
    explanation: 'Adaptive strategic planning enables proactive response to evolving threats while maintaining business continuity and efficiency.',
    hints: ['Think about planning for unknown future threats', 'Consider adaptive and flexible technology approaches']
  }
];

console.log('Starting IT System question generation...');
console.log(`Planning to insert ${itQuestions.length} questions`);

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
    
    itQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${itQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`IT System question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 