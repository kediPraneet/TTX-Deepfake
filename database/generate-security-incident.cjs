const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const securityIncidentQuestions = [
  // Operational Disruptions (4 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'As Security Incident Manager, what is your immediate priority when deepfake attacks disrupt operations?',
    scenario: '<strong style="font-size: 1.25em">Deepfake content is causing operational confusion and potential security vulnerabilities. Incident response must address both immediate threats and operational continuity.</strong>',
    options: [
      'Focus only on identifying the source of deepfake content',
      'Activate comprehensive incident response addressing both security threats and operational continuity requirements',
      'Wait for management direction before implementing response procedures',
      'Focus solely on preventing additional deepfake content creation'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive incident response addresses immediate security threats while ensuring operational continuity and recovery.',
    hints: ['Think about comprehensive vs. narrow incident response', 'Consider both security and operational needs']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'What security containment measures should be implemented during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Operational systems may be compromised by deepfake attacks. Containment must prevent further damage while maintaining essential business functions.</strong>',
    options: [
      'Shut down all affected systems immediately',
      'Implement targeted containment that isolates threats while maintaining essential operational capabilities',
      'Continue normal operations without containment measures',
      'Focus containment only on external-facing systems'
    ],
    correct_answer: 1,
    explanation: 'Targeted containment prevents threat spread while preserving essential business operations during incident response.',
    hints: ['Think about balancing security containment with operational needs', 'Consider targeted vs. broad shutdown approaches']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'How should evidence preservation be managed during deepfake operational incidents?',
    scenario: '<strong style="font-size: 1.25em">Evidence of deepfake attacks must be preserved for investigation and potential legal proceedings while operations continue. Chain of custody is critical.</strong>',
    options: [
      'Focus on restoring operations without evidence preservation',
      'Implement comprehensive evidence preservation protocols with proper chain of custody while supporting operational recovery',
      'Preserve only the most obvious evidence to save time',
      'Delegate evidence preservation to legal department'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive evidence preservation supports investigation and legal proceedings while enabling operational recovery.',
    hints: ['Think about evidence preservation vs. operational recovery', 'Consider chain of custody requirements']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'What communication security protocols should be established during operational disruptions from deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">Normal communication channels may be compromised by deepfake attacks. Secure communication protocols are needed for incident coordination and operational recovery.</strong>',
    options: [
      'Continue using existing communication channels',
      'Establish verified, secure communication protocols for incident response and operational coordination with authentication measures',
      'Switch to entirely manual communication methods',
      'Use only external communication services'
    ],
    correct_answer: 1,
    explanation: 'Verified communication protocols ensure authentic incident coordination while supporting operational recovery efforts.',
    hints: ['Think about communication security during incidents', 'Consider verification and authentication methods']
  },

  // Ransom Pay (4 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'ransom',
    question: 'What security analysis should inform ransom payment decisions in deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">Ransom demands require security assessment of threat capabilities, attack vectors, and likelihood of successful resolution. Technical analysis informs business decisions.</strong>',
    options: [
      'Focus only on business impact without technical analysis',
      'Conduct comprehensive security analysis including threat assessment, attack vector analysis, and technical feasibility of attacker claims',
      'Assume attacker claims are accurate without verification',
      'Limit analysis to immediate threat containment'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security analysis provides technical foundation for informed ransom payment decision-making.',
    hints: ['Think about technical analysis informing business decisions', 'Consider threat assessment and attack vector analysis']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'ransom',
    question: 'How should security monitoring be enhanced during ransom negotiation periods?',
    scenario: '<strong style="font-size: 1.25em">Ransom negotiations may be accompanied by continued threats or additional attacks. Enhanced security monitoring is needed to detect escalation or new threats.</strong>',
    options: [
      'Maintain normal security monitoring during negotiations',
      'Implement enhanced security monitoring with focus on detecting continued threats, escalation attempts, and new attack vectors',
      'Reduce monitoring to avoid provoking attackers',
      'Focus monitoring only on payment-related communications'
    ],
    correct_answer: 1,
    explanation: 'Enhanced monitoring detects continued threats and attack escalation while supporting negotiation security.',
    hints: ['Think about ongoing threat detection during negotiations', 'Consider escalation and new attack monitoring']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'ransom',
    question: 'What technical security measures should be implemented regardless of ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Security improvements must be implemented regardless of payment decisions to prevent future attacks and demonstrate due diligence.</strong>',
    options: [
      'Wait for ransom resolution before implementing security improvements',
      'Implement immediate security enhancements including vulnerability remediation, access controls, and detection capabilities regardless of payment decisions',
      'Focus security measures only if ransom is not paid',
      'Limit security measures to basic containment'
    ],
    correct_answer: 1,
    explanation: 'Immediate security enhancements prevent future attacks and demonstrate responsible security management regardless of payment decisions.',
    hints: ['Think about proactive security vs. reactive measures', 'Consider security improvements independent of payment decisions']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'ransom',
    question: 'How should incident documentation be managed during ransom scenarios for legal and technical purposes?',
    scenario: '<strong style="font-size: 1.25em">Detailed incident documentation supports legal proceedings, insurance claims, and technical analysis while protecting sensitive negotiation information.</strong>',
    options: [
      'Minimize documentation to reduce legal exposure',
      'Maintain comprehensive incident documentation with appropriate confidentiality protections for technical analysis and legal support',
      'Document everything without confidentiality considerations',
      'Focus documentation only on technical details'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive documentation supports multiple objectives while protecting sensitive information through appropriate confidentiality measures.',
    hints: ['Think about comprehensive documentation with appropriate protections', 'Consider technical, legal, and confidentiality needs']
  },

  // Financial Loss (4 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'How should security priorities be adjusted during financial constraints following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Financial losses may limit security resources. Security priorities must be adjusted to maintain essential protection within budget constraints.</strong>',
    options: [
      'Reduce all security measures proportionally',
      'Prioritize critical security measures based on risk assessment while optimizing resource allocation within budget constraints',
      'Maintain all existing security measures regardless of cost',
      'Focus only on the least expensive security measures'
    ],
    correct_answer: 1,
    explanation: 'Risk-based security prioritization maintains essential protection while optimizing limited resources effectively.',
    hints: ['Think about risk-based prioritization vs. proportional cuts', 'Consider essential vs. non-essential security measures']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'What cost-effective security measures should be prioritized during financial recovery?',
    scenario: '<strong style="font-size: 1.25em">Limited budget requires focus on high-impact, cost-effective security measures. Resource allocation must maximize security effectiveness per dollar spent.</strong>',
    options: [
      'Eliminate all non-essential security tools',
      'Focus on high-impact, cost-effective security measures that provide maximum protection value within budget constraints',
      'Maintain expensive security tools at reduced capability',
      'Copy cost-cutting approaches from other organizations'
    ],
    correct_answer: 1,
    explanation: 'High-impact, cost-effective security measures maximize protection value while respecting financial constraints.',
    hints: ['Think about security value vs. cost optimization', 'Consider high-impact vs. expensive security measures']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'How should security metrics and ROI be demonstrated during financial recovery periods?',
    scenario: '<strong style="font-size: 1.25em">Security investments face scrutiny during financial recovery. Clear demonstration of security value and ROI is essential for maintaining resources.</strong>',
    options: [
      'Continue security activities without measurement changes',
      'Implement enhanced security metrics and ROI measurement to clearly demonstrate security value and cost-effectiveness',
      'Reduce security activities to minimize costs',
      'Focus only on easily quantifiable security metrics'
    ],
    correct_answer: 1,
    explanation: 'Enhanced security metrics and ROI demonstration justify security investment and show value during financial pressure.',
    hints: ['Think about demonstrating security value during budget pressure', 'Consider comprehensive vs. simple security metrics']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'What security partnerships and shared resources should be leveraged during financial constraints?',
    scenario: '<strong style="font-size: 1.25em">Financial constraints may require leveraging external partnerships and shared security resources to maintain protection levels cost-effectively.</strong>',
    options: [
      'Avoid external partnerships to maintain control',
      'Leverage strategic security partnerships and shared resources to maintain protection levels while optimizing costs',
      'Outsource all security functions to reduce costs',
      'Focus partnerships only on the largest security providers'
    ],
    correct_answer: 1,
    explanation: 'Strategic partnerships and shared resources enable cost-effective security maintenance while preserving essential capabilities.',
    hints: ['Think about strategic partnerships vs. complete outsourcing', 'Consider cost optimization through collaboration']
  },

  // Regulatory Notification (3 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'regulatory',
    question: 'What security information should be provided to regulators during deepfake incident notifications?',
    scenario: '<strong style="font-size: 1.25em">Regulatory notifications require technical security information while protecting sensitive details about vulnerabilities and response capabilities.</strong>',
    options: [
      'Provide minimal security information to avoid exposure',
      'Provide comprehensive security information that meets regulatory requirements while protecting sensitive operational security details',
      'Share all security information without restriction',
      'Focus only on attack impact without technical details'
    ],
    correct_answer: 1,
    explanation: 'Balanced security information sharing meets regulatory requirements while protecting sensitive operational capabilities.',
    hints: ['Think about regulatory compliance vs. operational security protection', 'Consider comprehensive but protected information sharing']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'regulatory',
    question: 'How should security evidence be preserved and managed for regulatory investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulatory investigations require comprehensive security evidence while maintaining chain of custody and protecting ongoing operations.</strong>',
    options: [
      'Provide evidence only when specifically requested',
      'Implement comprehensive evidence preservation and management protocols that support regulatory investigations while maintaining operational security',
      'Preserve all evidence without operational considerations',
      'Focus evidence management only on most obvious security failures'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive evidence management supports regulatory compliance while protecting ongoing security operations.',
    hints: ['Think about evidence preservation vs. operational security', 'Consider comprehensive vs. reactive evidence management']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'regulatory',
    question: 'What security improvements should be implemented to address regulatory requirements following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory requirements may mandate specific security improvements. Implementation must address compliance while enhancing overall security posture.</strong>',
    options: [
      'Implement only specifically mandated security measures',
      'Implement comprehensive security improvements that address regulatory requirements while enhancing overall security posture strategically',
      'Wait for detailed regulatory guidance before implementing improvements',
      'Focus improvements only on areas that failed during the incident'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security improvements address regulatory compliance while strategically enhancing overall security posture.',
    hints: ['Think about strategic security enhancement vs. minimum compliance', 'Consider comprehensive vs. narrow security improvements']
  },

  // Employee Notification (4 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'employment',
    question: 'What security awareness information should be included in employee notifications about deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employee notifications must include security awareness information that helps employees protect themselves without revealing sensitive security details.</strong>',
    options: [
      'Avoid including any security information in employee notifications',
      'Include comprehensive security awareness information that educates employees about threats while protecting sensitive security operational details',
      'Share all technical security details with employees',
      'Focus security information only on executive employees'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security awareness education helps employees protect themselves while maintaining operational security confidentiality.',
    hints: ['Think about employee education vs. operational security protection', 'Consider comprehensive awareness with appropriate boundaries']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'employment',
    question: 'How should employee security training be enhanced following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Enhanced employee security training is needed to prevent future deepfake attacks. Training must be effective, engaging, and practical for all employee roles.</strong>',
    options: [
      'Provide identical training to all employees regardless of role',
      'Develop role-based security training that addresses deepfake threats comprehensively while being practical and engaging for different employee functions',
      'Focus training only on employees with technology access',
      'Use generic cybersecurity training without deepfake-specific content'
    ],
    correct_answer: 1,
    explanation: 'Role-based training ensures comprehensive deepfake awareness while being practical and relevant for different employee functions.',
    hints: ['Think about role-based vs. generic training approaches', 'Consider comprehensive but practical training design']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'employment',
    question: 'What security monitoring and verification should be implemented for employee access following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Enhanced employee access monitoring and verification may be needed to prevent future incidents while maintaining employee privacy and operational efficiency.</strong>',
    options: [
      'Implement identical monitoring for all employees',
      'Implement risk-based access monitoring and verification that balances security enhancement with employee privacy and operational efficiency',
      'Avoid enhanced monitoring to preserve employee privacy',
      'Focus monitoring only on senior executives'
    ],
    correct_answer: 1,
    explanation: 'Risk-based monitoring balances security enhancement with employee privacy rights and operational efficiency requirements.',
    hints: ['Think about balancing security with privacy and efficiency', 'Consider risk-based vs. uniform monitoring approaches']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'employment',
    question: 'How should security incident response procedures be communicated to employees following deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">Employees need clear incident response procedures for future deepfake threats. Communication must be comprehensive yet practical for employee implementation.</strong>',
    options: [
      'Provide technical incident response procedures only to security team',
      'Develop clear, practical incident response procedures for employees that enable effective threat recognition and reporting while maintaining operational security',
      'Share all detailed security procedures with all employees',
      'Focus procedures only on the most obvious threat indicators'
    ],
    correct_answer: 1,
    explanation: 'Clear, practical procedures enable effective employee response while protecting detailed operational security information.',
    hints: ['Think about practical employee procedures vs. technical security details', 'Consider effective response enablement with appropriate boundaries']
  },

  // Crisis Communication (3 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'What security information should be coordinated with crisis communications during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications require security information input while protecting sensitive operational details. Coordination ensures accurate messaging without security exposure.</strong>',
    options: [
      'Avoid providing any security information for crisis communications',
      'Coordinate appropriate security information that enables accurate crisis communication while protecting sensitive operational security details',
      'Share all security analysis with crisis communication teams',
      'Focus security input only on attack attribution information'
    ],
    correct_answer: 1,
    explanation: 'Coordinated security information enables accurate crisis communication while protecting sensitive operational capabilities.',
    hints: ['Think about accurate communication vs. operational security protection', 'Consider coordinated vs. isolated security information sharing']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'How should security verification be implemented for crisis communication channels during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Crisis communication channels may be targets for additional deepfake attacks. Security verification ensures authentic crisis messaging while maintaining communication speed.</strong>',
    options: [
      'Use existing communication channels without additional verification',
      'Implement enhanced security verification for crisis communication channels while maintaining necessary speed and accessibility for stakeholders',
      'Delay all crisis communications until full security verification',
      'Focus verification only on external media communications'
    ],
    correct_answer: 1,
    explanation: 'Enhanced verification ensures authentic crisis communication while maintaining necessary speed and stakeholder accessibility.',
    hints: ['Think about communication authenticity vs. speed requirements', 'Consider comprehensive vs. selective verification']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'What ongoing security monitoring should be maintained during extended crisis communication periods?',
    scenario: '<strong style="font-size: 1.25em">Extended crisis periods require ongoing security monitoring to detect additional threats or attacks targeting crisis response efforts.</strong>',
    options: [
      'Focus monitoring only on the original attack vectors',
      'Maintain comprehensive security monitoring that detects new threats and attacks targeting crisis response while supporting ongoing communications',
      'Reduce monitoring to focus resources on crisis communication',
      'Delegate monitoring to external security providers'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive ongoing monitoring detects new threats targeting crisis response while supporting communication security.',
    hints: ['Think about ongoing threat detection during crisis', 'Consider comprehensive vs. narrow monitoring focus']
  },

  // Strategic Impact (3 questions)
  {
    role: 'Security Incident Manager',
    risk_card: 'strategic',
    question: 'How should security incident response capabilities be strategically enhanced for ongoing deepfake threats?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats require strategic enhancement of incident response capabilities. Improvements must address current gaps while preparing for evolving threats.</strong>',
    options: [
      'Focus enhancements only on technical security capabilities',
      'Develop comprehensive incident response enhancement strategy that addresses technical, procedural, and organizational capabilities for evolving deepfake threats',
      'Copy incident response approaches from other organizations',
      'Wait for threat landscape stabilization before strategic enhancements'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive incident response strategy addresses all capability dimensions while preparing for evolving deepfake threat landscape.',
    hints: ['Think about comprehensive vs. narrow capability enhancement', 'Consider current gaps and future threat evolution']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'strategic',
    question: 'What strategic security partnerships should be developed for deepfake threat management?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats may require strategic security partnerships with external organizations, agencies, and technology providers for comprehensive threat management.</strong>',
    options: [
      'Maintain existing security partnerships without expansion',
      'Develop strategic security partnerships that enhance deepfake threat detection, response, and recovery capabilities through collaborative approaches',
      'Avoid external partnerships to maintain security control',
      'Focus partnerships only on technology providers'
    ],
    correct_answer: 1,
    explanation: 'Strategic partnerships enhance comprehensive deepfake threat management through collaborative detection, response, and recovery capabilities.',
    hints: ['Think about collaborative vs. independent threat management', 'Consider comprehensive partnership vs. narrow technology focus']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'strategic',
    question: 'How should security metrics and threat intelligence be evolved for long-term deepfake risk management?',
    scenario: '<strong style="font-size: 1.25em">Long-term deepfake risk management requires evolved security metrics and threat intelligence capabilities to track threats and measure protection effectiveness.</strong>',
    options: [
      'Maintain existing security metrics without deepfake-specific enhancements',
      'Evolve security metrics and threat intelligence capabilities to comprehensively track deepfake threats and measure protection effectiveness over time',
      'Focus metrics only on immediate incident response measures',
      'Copy threat intelligence approaches from other organizations'
    ],
    correct_answer: 1,
    explanation: 'Evolved metrics and intelligence capabilities enable comprehensive deepfake threat tracking and protection effectiveness measurement.',
    hints: ['Think about comprehensive threat tracking vs. reactive measurement', 'Consider evolved vs. existing metrics and intelligence']
  }
];

console.log('Starting Security Incident Manager question generation...');
console.log(`Planning to insert ${securityIncidentQuestions.length} questions`);

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
    
    securityIncidentQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${securityIncidentQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Security Incident Manager question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
});