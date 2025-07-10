const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const governanceQuestions = [
  // Operational Disruptions (4 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'As Governance and Compliance Officer, what governance oversight is needed during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Operational disruptions may involve governance failures and compliance violations. Immediate oversight and corrective measures are essential.</strong>',
    options: [
      'Wait for operations to stabilize before governance review',
      'Implement immediate governance oversight to ensure compliance and identify corrective measures for operational disruptions',
      'Focus only on documenting governance failures after the fact',
      'Delegate governance oversight to operational managers'
    ],
    correct_answer: 1,
    explanation: 'Immediate governance oversight ensures compliance during crisis and enables proactive corrective measures.',
    hints: ['Think about governance during crisis vs. after crisis', 'Consider proactive vs. reactive oversight']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'What compliance monitoring should be enhanced during deepfake-related operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Normal compliance procedures may be inadequate during operational disruptions. Enhanced monitoring may be needed for regulatory requirements.</strong>',
    options: [
      'Maintain normal compliance monitoring procedures',
      'Implement enhanced compliance monitoring focused on regulatory requirements that may be affected by operational disruptions',
      'Suspend compliance monitoring until operations normalize',
      'Focus monitoring only on the most obvious compliance risks'
    ],
    correct_answer: 1,
    explanation: 'Enhanced compliance monitoring ensures regulatory requirements are met despite operational challenges.',
    hints: ['Think about compliance during disrupted operations', 'Consider enhanced vs. normal monitoring']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'How should governance policies be evaluated following deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Existing governance policies may not address deepfake-related operational challenges. Policy evaluation and updates may be necessary.</strong>',
    options: [
      'Maintain existing governance policies without changes',
      'Conduct comprehensive governance policy evaluation and implement updates to address deepfake-related operational challenges',
      'Focus policy updates only on technology governance',
      'Wait for regulatory guidance before policy updates'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive policy evaluation ensures governance frameworks address deepfake threats and operational challenges.',
    hints: ['Think about policy adequacy for new threats', 'Consider comprehensive vs. narrow policy evaluation']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'What governance reporting should be implemented for deepfake operational impacts?',
    scenario: '<strong style="font-size: 1.25em">Board and stakeholders need governance reporting on operational impacts and compliance status. Reporting must be accurate and comprehensive.</strong>',
    options: [
      'Provide basic operational status reports only',
      'Implement comprehensive governance reporting that covers operational impacts, compliance status, and corrective measures',
      'Delay governance reporting until full impact assessment is complete',
      'Focus reporting only on successful response actions'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive governance reporting provides board and stakeholders with necessary oversight information for informed decision-making.',
    hints: ['Think about what governance stakeholders need to know', 'Consider comprehensive vs. basic reporting']
  },

  // Ransom Pay (4 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'ransom',
    question: 'What governance framework should guide ransom payment decision-making processes?',
    scenario: '<strong style="font-size: 1.25em">Ransom payment decisions require clear governance framework to ensure appropriate stakeholder involvement and decision accountability.</strong>',
    options: [
      'Allow executive leadership to make ransom decisions independently',
      'Establish comprehensive governance framework with clear decision authorities, stakeholder involvement, and accountability measures for ransom scenarios',
      'Delegate ransom decisions to external consultants',
      'Focus governance only on post-incident review'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive governance framework ensures appropriate decision-making accountability and stakeholder involvement in critical ransom scenarios.',
    hints: ['Think about decision accountability and stakeholder involvement', 'Consider comprehensive vs. simplified governance']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'ransom',
    question: 'How should compliance risks be assessed in ransom payment scenarios?',
    scenario: '<strong style="font-size: 1.25em">Ransom payments may violate various compliance requirements including sanctions, money laundering laws, and fiduciary duties. Comprehensive assessment is needed.</strong>',
    options: [
      'Focus only on immediate business impact without compliance assessment',
      'Conduct comprehensive compliance risk assessment covering sanctions, AML, fiduciary duties, and all applicable regulatory requirements',
      'Assume compliance risks are manageable without detailed assessment',
      'Limit compliance assessment to most obvious legal requirements'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive compliance assessment ensures all regulatory obligations are considered in ransom payment decisions.',
    hints: ['Think about multiple compliance frameworks that might apply', 'Consider comprehensive vs. limited compliance analysis']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'ransom',
    question: 'What governance oversight is needed for ransom negotiation and payment processes?',
    scenario: '<strong style="font-size: 1.25em">Ransom negotiations require governance oversight to ensure process integrity, compliance, and appropriate decision documentation.</strong>',
    options: [
      'Minimize governance oversight to maintain negotiation flexibility',
      'Implement appropriate governance oversight that ensures process integrity while maintaining necessary negotiation flexibility and compliance',
      'Require governance approval for every negotiation decision',
      'Focus oversight only on final payment authorization'
    ],
    correct_answer: 1,
    explanation: 'Balanced governance oversight ensures process integrity and compliance while maintaining necessary flexibility for effective negotiations.',
    hints: ['Think about balancing oversight with negotiation flexibility', 'Consider process integrity and compliance needs']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'ransom',
    question: 'How should governance documentation and record-keeping be managed for ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Ransom scenarios require careful documentation for legal protection, regulatory compliance, and governance accountability while protecting sensitive information.</strong>',
    options: [
      'Minimize documentation to reduce legal exposure',
      'Implement comprehensive governance documentation that supports legal protection and regulatory compliance while managing confidentiality appropriately',
      'Document everything without confidentiality considerations',
      'Focus documentation only on final decisions'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive governance documentation supports legal protection and compliance while appropriately managing confidentiality and privilege concerns.',
    hints: ['Think about legal protection vs. transparency', 'Consider comprehensive documentation with appropriate confidentiality measures']
  },

  // Financial Loss (4 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'What governance oversight is required for financial loss management and recovery planning?',
    scenario: '<strong style="font-size: 1.25em">Financial losses require governance oversight of recovery planning, resource allocation, and stakeholder communication. Board oversight and accountability are essential.</strong>',
    options: [
      'Allow management to handle financial recovery without governance oversight',
      'Implement comprehensive governance oversight of financial recovery including board involvement, stakeholder accountability, and resource allocation approval',
      'Focus governance only on major financial decisions',
      'Delegate financial oversight to external advisors'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive governance oversight ensures appropriate board involvement and stakeholder accountability in financial recovery planning.',
    hints: ['Think about board oversight and stakeholder accountability', 'Consider comprehensive vs. limited governance involvement']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'How should compliance obligations be maintained during financial constraints from deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Financial constraints may pressure organizations to reduce compliance resources. Governance must ensure compliance obligations are maintained despite financial pressure.</strong>',
    options: [
      'Reduce compliance resources proportionally with other budget cuts',
      'Prioritize essential compliance obligations and ensure adequate resources are maintained for critical regulatory requirements despite financial constraints',
      'Suspend non-essential compliance activities until financial recovery',
      'Focus compliance resources only on the most expensive regulatory requirements'
    ],
    correct_answer: 1,
    explanation: 'Strategic compliance prioritization ensures critical regulatory obligations are met while managing financial constraints effectively.',
    hints: ['Think about essential vs. non-essential compliance activities', 'Consider prioritization vs. proportional cuts']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'What governance reporting is needed for financial recovery progress and compliance status?',
    scenario: '<strong style="font-size: 1.25em">Board and stakeholders need regular reporting on financial recovery progress and compliance status. Reporting must be accurate and support informed decision-making.</strong>',
    options: [
      'Provide financial recovery reports without compliance status updates',
      'Implement integrated governance reporting that covers both financial recovery progress and compliance status with regular board and stakeholder updates',
      'Focus reporting only on positive financial recovery developments',
      'Limit reporting to quarterly board meetings'
    ],
    correct_answer: 1,
    explanation: 'Integrated governance reporting provides complete picture of financial recovery and compliance status for informed stakeholder decision-making.',
    hints: ['Think about integrated vs. separate reporting', 'Consider comprehensive vs. selective information']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'How should governance policies address financial constraint decision-making authority and accountability?',
    scenario: '<strong style="font-size: 1.25em">Financial constraints may require rapid decisions that affect compliance and operations. Clear governance policies are needed for decision authority and accountability.</strong>',
    options: [
      'Maintain normal decision-making procedures regardless of financial constraints',
      'Develop clear governance policies that define decision authority and accountability for financial constraint scenarios while ensuring compliance oversight',
      'Centralize all financial decisions with executive leadership',
      'Focus governance policies only on major financial decisions'
    ],
    correct_answer: 1,
    explanation: 'Clear governance policies ensure appropriate decision authority and accountability while maintaining compliance oversight during financial constraints.',
    hints: ['Think about decision authority vs. compliance oversight', 'Consider clear policies vs. ad hoc decision-making']
  },

  // Regulatory Notification (3 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'regulatory',
    question: 'What governance framework should coordinate regulatory notification and compliance responses?',
    scenario: '<strong style="font-size: 1.25em">Multiple regulatory notifications may be required with different timing and content requirements. Coordinated governance approach is essential for comprehensive compliance.</strong>',
    options: [
      'Handle each regulatory notification independently',
      'Establish coordinated governance framework that ensures comprehensive regulatory notification compliance with appropriate oversight and consistency',
      'Delegate regulatory notifications to external legal counsel',
      'Focus governance only on the most significant regulatory requirements'
    ],
    correct_answer: 1,
    explanation: 'Coordinated governance framework ensures comprehensive regulatory compliance with appropriate oversight and consistent approach.',
    hints: ['Think about coordination vs. independent handling', 'Consider comprehensive vs. selective regulatory compliance']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'regulatory',
    question: 'How should governance policies address regulatory investigation cooperation and information protection?',
    scenario: '<strong style="font-size: 1.25em">Regulatory investigations require cooperation while protecting privileged information and strategic interests. Governance policies must balance these considerations.</strong>',
    options: [
      'Provide unlimited cooperation without information protection considerations',
      'Develop governance policies that balance regulatory cooperation with appropriate information protection and strategic interest preservation',
      'Minimize cooperation to protect all information',
      'Focus policies only on the most intrusive regulatory investigations'
    ],
    correct_answer: 1,
    explanation: 'Balanced governance policies enable appropriate regulatory cooperation while protecting privileged information and strategic interests.',
    hints: ['Think about balancing cooperation with protection', 'Consider comprehensive vs. extreme approaches']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'regulatory',
    question: 'What governance oversight is needed for regulatory penalty negotiations and settlement decisions?',
    scenario: '<strong style="font-size: 1.25em">Regulatory penalties and settlements require governance oversight to ensure appropriate stakeholder involvement and decision accountability. Board approval may be necessary.</strong>',
    options: [
      'Allow legal counsel to handle penalty negotiations independently',
      'Implement governance oversight that ensures appropriate board involvement and stakeholder accountability for regulatory penalty and settlement decisions',
      'Require board approval for all penalty discussions',
      'Focus oversight only on settlements above a certain threshold'
    ],
    correct_answer: 1,
    explanation: 'Appropriate governance oversight ensures board involvement and stakeholder accountability while enabling effective penalty negotiations.',
    hints: ['Think about board involvement vs. operational flexibility', 'Consider stakeholder accountability in regulatory matters']
  },

  // Employee Notification (4 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'employment',
    question: 'What governance oversight is needed for employee notification compliance during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employee notifications may involve multiple legal requirements and compliance obligations. Governance oversight ensures comprehensive compliance and appropriate stakeholder involvement.</strong>',
    options: [
      'Let HR handle employee notifications without governance oversight',
      'Implement governance oversight that ensures comprehensive employee notification compliance with appropriate legal review and stakeholder coordination',
      'Require legal approval for all employee communications',
      'Focus oversight only on senior executive notifications'
    ],
    correct_answer: 1,
    explanation: 'Governance oversight ensures comprehensive compliance while enabling effective employee notification coordination.',
    hints: ['Think about comprehensive compliance vs. departmental independence', 'Consider governance coordination vs. micromanagement']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'employment',
    question: 'How should governance policies address employee rights and privacy protection during deepfake response measures?',
    scenario: '<strong style="font-size: 1.25em">Enhanced security measures may affect employee rights and privacy. Governance policies must ensure compliance with employment law and privacy requirements.</strong>',
    options: [
      'Implement security measures without employee rights considerations',
      'Develop governance policies that ensure employee rights and privacy protection while enabling necessary deepfake response security measures',
      'Avoid all security measures that might affect employee rights',
      'Focus policies only on union employee rights'
    ],
    correct_answer: 1,
    explanation: 'Governance policies ensure employee rights protection while enabling necessary security measures for deepfake response.',
    hints: ['Think about balancing security needs with employee rights', 'Consider comprehensive vs. selective rights protection']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'employment',
    question: 'What governance framework should coordinate employee communication and training about deepfake threats?',
    scenario: '<strong style="font-size: 1.25em">Employee communication and training require coordination across departments while ensuring consistent messaging and compliance with employment obligations.</strong>',
    options: [
      'Allow each department to handle employee communication independently',
      'Establish governance framework that coordinates employee communication and training while ensuring consistent messaging and employment law compliance',
      'Centralize all employee communication with executive leadership',
      'Focus coordination only on customer-facing employee training'
    ],
    correct_answer: 1,
    explanation: 'Governance coordination ensures consistent employee communication while maintaining employment law compliance across departments.',
    hints: ['Think about coordination vs. independent departmental action', 'Consider consistent messaging and legal compliance']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'employment',
    question: 'How should governance policies address employee security clearance and access management following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Enhanced employee security requirements may affect access rights and clearance procedures. Governance policies must balance security with employment rights and operational efficiency.</strong>',
    options: [
      'Implement enhanced security requirements without governance policies',
      'Develop governance policies that balance enhanced security requirements with employee rights and operational efficiency',
      'Maintain existing access procedures without security enhancements',
      'Focus policies only on employees with the highest security access'
    ],
    correct_answer: 1,
    explanation: 'Governance policies ensure security enhancements are balanced with employee rights and operational efficiency requirements.',
    hints: ['Think about balancing security with rights and efficiency', 'Consider comprehensive vs. selective policy development']
  },

  // Crisis Communication (3 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'What governance oversight is needed for crisis communication compliance and consistency?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications must comply with multiple regulatory requirements while maintaining message consistency. Governance oversight ensures comprehensive compliance.</strong>',
    options: [
      'Allow marketing and communications teams to handle crisis messaging independently',
      'Implement governance oversight that ensures crisis communication compliance with regulatory requirements and maintains consistent messaging',
      'Require legal pre-approval for all crisis communications',
      'Focus oversight only on media communications'
    ],
    correct_answer: 1,
    explanation: 'Governance oversight ensures crisis communication compliance while maintaining message consistency and operational effectiveness.',
    hints: ['Think about compliance vs. communication speed', 'Consider comprehensive oversight vs. departmental independence']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'How should governance policies address stakeholder communication accountability during crisis situations?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications affect multiple stakeholders with different information needs. Governance policies must ensure appropriate accountability and information management.</strong>',
    options: [
      'Allow each department to communicate with their stakeholders independently',
      'Develop governance policies that ensure coordinated stakeholder communication with appropriate accountability and information management',
      'Centralize all stakeholder communication with executive leadership',
      'Focus policies only on investor and regulatory communications'
    ],
    correct_answer: 1,
    explanation: 'Governance policies ensure coordinated stakeholder communication with appropriate accountability while managing information effectively.',
    hints: ['Think about stakeholder coordination vs. departmental independence', 'Consider accountability and information management']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'What governance framework should coordinate multi-jurisdictional crisis communication compliance?',
    scenario: '<strong style="font-size: 1.25em">Organizations operating in multiple jurisdictions face different crisis communication requirements. Governance framework must ensure compliance while maintaining consistent messaging.</strong>',
    options: [
      'Handle each jurisdiction independently without coordination',
      'Establish governance framework that coordinates multi-jurisdictional compliance while maintaining consistent core messaging and appropriate local adaptations',
      'Use identical communications in all jurisdictions',
      'Focus framework only on the most regulated jurisdictions'
    ],
    correct_answer: 1,
    explanation: 'Governance coordination ensures multi-jurisdictional compliance while maintaining message consistency and appropriate local adaptations.',
    hints: ['Think about jurisdictional compliance vs. message consistency', 'Consider coordination vs. independent handling']
  },

  // Strategic Impact (3 questions)
  {
    role: 'Governance and Compliance',
    risk_card: 'strategic',
    question: 'How should governance frameworks evolve to address ongoing deepfake threats and strategic implications?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats require evolution of governance frameworks to address new strategic risks and oversight requirements. Framework updates must be comprehensive yet practical.</strong>',
    options: [
      'Maintain existing governance frameworks without modification',
      'Evolve governance frameworks to comprehensively address deepfake threats while maintaining practical oversight and strategic decision-making capabilities',
      'Create entirely separate governance structures for deepfake threats',
      'Focus framework evolution only on technology governance'
    ],
    correct_answer: 1,
    explanation: 'Governance framework evolution ensures comprehensive deepfake threat coverage while maintaining practical and effective oversight capabilities.',
    hints: ['Think about evolution vs. complete restructuring', 'Consider comprehensive vs. narrow governance updates']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'strategic',
    question: 'What governance oversight is needed for long-term strategic planning in the deepfake threat environment?',
    scenario: '<strong style="font-size: 1.25em">Long-term strategic planning must account for evolving deepfake threats and regulatory landscape. Governance oversight ensures appropriate risk assessment and strategic planning.</strong>',
    options: [
      'Focus strategic planning only on traditional business risks',
      'Implement governance oversight that integrates deepfake threat considerations into comprehensive long-term strategic planning and risk assessment',
      'Create separate strategic planning processes for deepfake threats',
      'Delegate deepfake strategic planning to technology departments'
    ],
    correct_answer: 1,
    explanation: 'Integrated governance oversight ensures deepfake considerations are comprehensively included in strategic planning and risk assessment.',
    hints: ['Think about integration vs. separation of threat considerations', 'Consider comprehensive vs. narrow strategic planning']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'strategic',
    question: 'How should board oversight and governance reporting be enhanced for deepfake risk management?',
    scenario: '<strong style="font-size: 1.25em">Board oversight of deepfake risks requires enhanced reporting and governance structures. Board education and oversight capabilities must evolve with threat landscape.</strong>',
    options: [
      'Maintain existing board reporting without deepfake-specific enhancements',
      'Enhance board oversight through comprehensive deepfake risk reporting, board education, and governance structure improvements',
      'Create separate board committee exclusively for deepfake risks',
      'Focus board oversight only on major deepfake incidents'
    ],
    correct_answer: 1,
    explanation: 'Enhanced board oversight ensures comprehensive deepfake risk management through improved reporting, education, and governance structures.',
    hints: ['Think about board education and capability enhancement', 'Consider comprehensive vs. incident-focused oversight']
  }
];

console.log('Starting Governance and Compliance question generation...');
console.log(`Planning to insert ${governanceQuestions.length} questions`);

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
    
    governanceQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${governanceQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Governance and Compliance question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 