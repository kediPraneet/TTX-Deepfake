const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const legalQuestions = [
  // Operational Disruptions (4 questions)
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'As Legal Counsel, what immediate legal protections should be implemented during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Fake executive communications are causing operational chaos. Legal exposure may include contract breaches, regulatory violations, and fiduciary duty concerns as operations are impacted.</strong>',
    options: [
      'Wait for operations to stabilize before legal review',
      'Immediately document all impacts and implement legal preservation protocols while coordinating operational response',
      'Focus only on external legal threats',
      'Delegate legal decisions to operational managers'
    ],
    correct_answer: 1,
    explanation: 'Immediate legal documentation and preservation protocols protect against future litigation while supporting operational recovery.',
    hints: ['Think about preserving evidence and documenting decisions', 'Consider multiple types of legal exposure']
  },
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'What contractual obligations must Legal Division address during deepfake-related operational delays?',
    scenario: '<strong style="font-size: 1.25em">Customer deliverables are delayed due to operational disruptions. Supplier agreements may be affected. Force majeure clauses and breach notifications need evaluation.</strong>',
    options: [
      'Assume all contracts have adequate force majeure protection',
      'Systematically review all affected contracts and implement appropriate legal notices and protections',
      'Handle contract issues only when counterparties complain',
      'Focus only on the largest contracts'
    ],
    correct_answer: 1,
    explanation: 'Proactive contract management minimizes legal exposure and maintains business relationships during operational crises.',
    hints: ['Consider reviewing all affected agreements', 'Think about proactive communication with counterparties']
  },
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'How should Legal Division manage employment law issues during operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Employees are unable to perform normal duties due to security measures. Productivity is down, overtime may be required for recovery, and employee relations are strained.</strong>',
    options: [
      'Maintain normal employment practices regardless of disruption',
      'Review employment obligations and implement appropriate accommodations while protecting employee rights',
      'Immediately modify all employment terms',
      'Focus only on senior executive employment issues'
    ],
    correct_answer: 1,
    explanation: 'Employment law compliance during operational changes protects both employee rights and company legal position.',
    hints: ['Think about employee rights during operational changes', 'Consider accommodation vs. modification of terms']
  },
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'What legal documentation should be maintained during operational recovery from deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Recovery efforts involve multiple departments and external parties. Legal documentation standards must support potential litigation, insurance claims, and regulatory reviews.</strong>',
    options: [
      'Basic incident reports only',
      'Comprehensive legal documentation including decision rationales, impact assessments, and recovery actions with privilege protections',
      'Minimal documentation to reduce legal exposure',
      'Standard operational documentation without legal review'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive, legally privileged documentation supports defense while providing evidence for insurance and regulatory compliance.',
    hints: ['Think about what documentation lawyers need for defense', 'Consider privilege protection for sensitive materials']
  },

  // Ransom Pay (4 questions)
  {
    role: 'Legal Division',
    risk_card: 'ransom',
    question: 'What legal framework should guide ransom payment decisions for deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">Attackers demand payment to stop circulating deepfake content. Legal considerations include sanctions compliance, money laundering laws, and fiduciary duties to stakeholders.</strong>',
    options: [
      'Focus only on immediate business impact',
      'Conduct comprehensive legal analysis including sanctions, AML, fiduciary duties, and jurisdictional requirements',
      'Follow insurance company recommendations without legal review',
      'Base decision solely on law enforcement guidance'
    ],
    correct_answer: 1,
    explanation: 'Ransom decisions require comprehensive legal analysis to ensure compliance with all applicable laws and fiduciary obligations.',
    hints: ['Consider multiple legal frameworks that might apply', 'Think about compliance with various laws and regulations']
  },
  {
    role: 'Legal Division',
    risk_card: 'ransom',
    question: 'How should Legal Division manage attorney-client privilege during ransom negotiations?',
    scenario: '<strong style="font-size: 1.25em">Ransom discussions involve multiple parties including executives, law enforcement, and insurers. Maintaining attorney-client privilege while enabling necessary coordination is critical.</strong>',
    options: [
      'Include all parties in all communications',
      'Carefully structure communications to maintain privilege while enabling appropriate coordination through common interest agreements',
      'Avoid any multi-party communications',
      'Assume privilege is waived during crisis situations'
    ],
    correct_answer: 1,
    explanation: 'Strategic privilege management protects confidential legal advice while enabling necessary coordination with aligned parties.',
    hints: ['Think about protecting confidential legal advice', 'Consider how to coordinate while maintaining privilege']
  },
  {
    role: 'Legal Division',
    risk_card: 'ransom',
    question: 'What legal implications should be considered regarding law enforcement coordination in ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Law enforcement wants to coordinate response efforts. Cooperation may affect payment decisions, legal strategies, and potential prosecutions. Corporate legal interests must be protected.</strong>',
    options: [
      'Fully cooperate without legal considerations',
      'Coordinate appropriately while protecting corporate legal interests and ensuring compliance with legal obligations',
      'Avoid all law enforcement contact',
      'Let law enforcement make all strategic decisions'
    ],
    correct_answer: 1,
    explanation: 'Law enforcement coordination must balance public policy support with protection of corporate legal interests and strategic flexibility.',
    hints: ['Think about balancing cooperation with legal protection', 'Consider corporate vs. public interests']
  },
  {
    role: 'Legal Division',
    risk_card: 'ransom',
    question: 'How should Legal Division prepare for potential litigation arising from ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Regardless of payment decision, shareholders, customers, or employees might challenge the decision. Legal preparation for potential litigation is necessary.</strong>',
    options: [
      'Wait until litigation is filed to prepare',
      'Proactively prepare litigation defense by documenting decision process, legal compliance, and business judgment rationale',
      'Focus only on avoiding litigation through settlement',
      'Assume business judgment rule provides complete protection'
    ],
    correct_answer: 1,
    explanation: 'Proactive litigation preparation strengthens legal position and demonstrates responsible decision-making processes.',
    hints: ['Think about potential challenges to the decision', 'Consider documenting the decision-making process']
  },

  // Financial Loss (3 questions)
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'What legal strategies should guide financial loss recovery from deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Significant financial losses require recovery strategies. Options include insurance claims, third-party liability claims, and potential criminal restitution proceedings.</strong>',
    options: [
      'Pursue only insurance recovery',
      'Develop comprehensive recovery strategy including insurance claims, third-party liability assessment, and coordination with criminal proceedings',
      'Focus solely on cost reduction',
      'Wait for natural business recovery'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive legal recovery strategy maximizes potential recovery through all available legal avenues.',
    hints: ['Think about multiple sources of potential recovery', 'Consider coordinating different legal proceedings']
  },
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'How should Legal Division handle third-party liability claims related to deepfake financial losses?',
    scenario: '<strong style="font-size: 1.25em">Third parties may be liable for security failures, negligent services, or inadequate warnings. Liability claims must be evaluated and pursued strategically.</strong>',
    options: [
      'Avoid pursuing third-party claims to maintain relationships',
      'Systematically evaluate and pursue viable third-party liability claims while considering business relationships and strategic implications',
      'Immediately sue all potential defendants',
      'Focus only on the largest potential recovery'
    ],
    correct_answer: 1,
    explanation: 'Strategic liability pursuit balances maximum recovery with business relationships and litigation costs.',
    hints: ['Consider balancing recovery with business relationships', 'Think about strategic vs. comprehensive approaches']
  },
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'What legal protections should be implemented for financial recovery efforts?',
    scenario: '<strong style="font-size: 1.25em">Recovery efforts may involve sensitive financial information, strategic decisions, and competitive implications. Legal protections are needed for confidential recovery planning.</strong>',
    options: [
      'Handle recovery planning without special legal protections',
      'Implement appropriate confidentiality protections and privilege structures for sensitive recovery planning and strategic decisions',
      'Make all recovery information publicly available',
      'Limit protections only to settlement negotiations'
    ],
    correct_answer: 1,
    explanation: 'Legal protections for recovery planning maintain confidentiality and strategic flexibility while protecting sensitive information.',
    hints: ['Think about protecting sensitive financial and strategic information', 'Consider what information should remain confidential']
  },

  // Regulatory Notification (4 questions)
  {
    role: 'Legal Division',
    risk_card: 'regulatory',
    question: 'What regulatory notification obligations apply to deepfake incidents affecting the organization?',
    scenario: '<strong style="font-size: 1.25em">Multiple regulatory frameworks may require notification: data breach laws, securities regulations, industry-specific requirements, and international obligations.</strong>',
    options: [
      'Notify only when specifically requested by regulators',
      'Systematically analyze all applicable regulatory notification requirements and ensure timely, compliant notifications',
      'Delay notifications until full impact assessment is complete',
      'Focus only on the most obvious regulatory requirements'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive regulatory analysis ensures compliance with all applicable notification obligations within required timeframes.',
    hints: ['Think about multiple regulatory frameworks that might apply', 'Consider timing requirements for notifications']
  },
  {
    role: 'Legal Division',
    risk_card: 'regulatory',
    question: 'How should Legal Division manage regulatory investigations of deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Multiple regulatory agencies may investigate the incident and response. Coordination must balance cooperation with legal protection and resource management.</strong>',
    options: [
      'Handle each investigation completely independently',
      'Develop coordinated investigation response strategy that ensures compliance while protecting legal interests and managing resources efficiently',
      'Provide unlimited cooperation without legal considerations',
      'Minimize all regulatory cooperation'
    ],
    correct_answer: 1,
    explanation: 'Coordinated investigation response ensures regulatory compliance while protecting legal interests and efficiently managing resources.',
    hints: ['Think about coordinating multiple investigations', 'Consider balancing cooperation with legal protection']
  },
  {
    role: 'Legal Division',
    risk_card: 'regulatory',
    question: 'What legal framework should guide regulatory penalty negotiations for deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory penalties are possible for security failures or delayed notifications. Settlement negotiations must balance cost, admission implications, and precedent concerns.</strong>',
    options: [
      'Accept proposed penalties without negotiation',
      'Develop strategic negotiation approach considering financial impact, legal precedent, and admission implications',
      'Fight all penalties regardless of strength of position',
      'Focus only on minimizing financial cost'
    ],
    correct_answer: 1,
    explanation: 'Strategic penalty negotiation balances multiple legal and business considerations beyond just financial cost.',
    hints: ['Think beyond just the financial cost of penalties', 'Consider precedent and admission implications']
  },
  {
    role: 'Legal Division',
    risk_card: 'regulatory',
    question: 'How should Legal Division prepare for enhanced regulatory oversight following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulators may impose enhanced oversight, reporting requirements, or compliance obligations. Legal preparation for ongoing regulatory relationship is necessary.</strong>',
    options: [
      'Address enhanced oversight only when imposed',
      'Proactively prepare compliance framework that demonstrates commitment while protecting legal interests in ongoing regulatory relationship',
      'Resist all enhanced oversight measures',
      'Implement changes only as legally required'
    ],
    correct_answer: 1,
    explanation: 'Proactive compliance preparation demonstrates good faith while positioning the organization favorably in ongoing regulatory relationships.',
    hints: ['Think about demonstrating commitment to compliance', 'Consider long-term regulatory relationships']
  },

  // Employee Notification (3 questions)
  {
    role: 'Legal Division',
    risk_card: 'employment',
    question: 'What legal requirements govern employee notification about deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employees may have been affected by the deepfake incident through data exposure, privacy violations, or security breaches. Legal notification obligations must be determined.</strong>',
    options: [
      'Notify employees only about directly confirmed impacts',
      'Analyze all applicable legal notification requirements and provide comprehensive, compliant employee communications',
      'Delay employee notification until investigations conclude',
      'Provide identical notification to all employees regardless of impact'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive legal analysis ensures compliance with employee notification obligations while providing appropriate information.',
    hints: ['Think about various legal requirements for employee notification', 'Consider different levels of impact on different employees']
  },
  {
    role: 'Legal Division',
    risk_card: 'employment',
    question: 'How should Legal Division address potential employment law claims arising from deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employees may claim privacy violations, discrimination in response measures, or workplace safety concerns. Proactive legal management is needed.</strong>',
    options: [
      'Wait for claims to be filed before responding',
      'Proactively assess potential employment law exposure and implement appropriate risk mitigation and response strategies',
      'Assume existing policies provide complete protection',
      'Focus only on senior executive employment issues'
    ],
    correct_answer: 1,
    explanation: 'Proactive employment law risk assessment enables early mitigation and demonstrates responsible employer practices.',
    hints: ['Think about various employment law risks that might arise', 'Consider proactive vs. reactive approaches']
  },
  {
    role: 'Legal Division',
    risk_card: 'employment',
    question: 'What legal protections should be implemented for employee-related deepfake response measures?',
    scenario: '<strong style="font-size: 1.25em">Enhanced security measures, monitoring, and verification procedures may raise employee privacy and rights concerns. Legal compliance is essential.</strong>',
    options: [
      'Implement security measures without legal review',
      'Ensure all employee-related security measures comply with employment law, privacy requirements, and collective bargaining obligations',
      'Avoid all measures that might raise legal concerns',
      'Apply measures uniformly without considering individual legal protections'
    ],
    correct_answer: 1,
    explanation: 'Legal compliance in security measures protects both employee rights and company legal position while enabling effective protection.',
    hints: ['Think about balancing security needs with employee rights', 'Consider various legal protections that might apply to employees']
  },

  // Crisis Communication (4 questions)
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'What legal review process should govern crisis communications during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications must be rapid but legally compliant. Legal review must balance speed with accuracy, privilege protection, and liability prevention.</strong>',
    options: [
      'Review all communications after they are sent',
      'Implement streamlined legal review process that ensures compliance while enabling timely crisis communications',
      'Avoid legal review to enable faster communications',
      'Require extensive legal review for all communications regardless of urgency'
    ],
    correct_answer: 1,
    explanation: 'Streamlined legal review balances crisis communication needs with legal compliance and liability protection.',
    hints: ['Think about balancing speed with legal protection', 'Consider streamlined vs. extensive review processes']
  },
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'How should Legal Division manage potential defamation issues in crisis communications about deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications may need to address false content, identify perpetrators, or defend against accusations. Defamation risks must be managed carefully.</strong>',
    options: [
      'Avoid mentioning any parties that might claim defamation',
      'Carefully structure communications to convey necessary information while minimizing defamation exposure through factual accuracy and appropriate qualifications',
      'Include all available information regardless of verification status',
      'Focus only on positive messaging without addressing false content'
    ],
    correct_answer: 1,
    explanation: 'Strategic communication structure enables necessary messaging while protecting against defamation claims through accuracy and appropriate qualifications.',
    hints: ['Think about how to communicate facts while avoiding defamation', 'Consider the importance of accuracy and appropriate qualifications']
  },
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'What legal coordination is needed for multi-jurisdictional crisis communications about deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">The organization operates in multiple jurisdictions with different legal requirements for crisis communications, privacy laws, and disclosure obligations.</strong>',
    options: [
      'Use identical communications in all jurisdictions',
      'Coordinate multi-jurisdictional legal review to ensure communications comply with all applicable legal requirements while maintaining consistent core messaging',
      'Handle each jurisdiction completely independently',
      'Focus only on the jurisdiction with the strictest requirements'
    ],
    correct_answer: 1,
    explanation: 'Multi-jurisdictional coordination ensures legal compliance while maintaining consistent and effective crisis messaging.',
    hints: ['Think about different legal requirements in different places', 'Consider maintaining consistency while ensuring compliance']
  },
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'How should Legal Division protect attorney-client privilege during crisis communications coordination?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications require coordination among legal, executive, PR, and external parties. Privilege protection is essential while enabling necessary coordination.</strong>',
    options: [
      'Avoid privileged communications during crisis coordination',
      'Structure communications and coordination to maintain privilege while enabling effective crisis management through appropriate protocols',
      'Assume privilege is waived during public crisis communications',
      'Include all parties in all legal communications'
    ],
    correct_answer: 1,
    explanation: 'Strategic privilege protection maintains confidential legal advice while enabling effective crisis coordination through appropriate protocols.',
    hints: ['Think about protecting confidential legal advice during coordination', 'Consider structured approaches to maintain privilege']
  },

  // Strategic Impact (3 questions)
  {
    role: 'Legal Division',
    risk_card: 'strategic',
    question: 'How should Legal Division assess the strategic legal implications of deepfake threats on business operations?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats may require fundamental changes to legal strategies, risk management, and business practices. Long-term legal planning must evolve with the threat landscape.</strong>',
    options: [
      'Continue existing legal strategies without modification',
      'Conduct comprehensive strategic legal assessment incorporating evolving deepfake threats into enterprise legal risk management',
      'Focus only on immediate incident response legal issues',
      'Wait for legal precedents to emerge before strategic planning'
    ],
    correct_answer: 1,
    explanation: 'Strategic legal assessment ensures the organization\'s legal framework evolves appropriately with emerging threat landscapes.',
    hints: ['Think about long-term legal strategy evolution', 'Consider comprehensive vs. narrow legal planning']
  },
  {
    role: 'Legal Division',
    risk_card: 'strategic',
    question: 'What legal framework should guide long-term deepfake risk management strategy?',
    scenario: '<strong style="font-size: 1.25em">Long-term strategy must balance legal compliance, business objectives, and evolving technology. Legal framework must be comprehensive yet adaptable.</strong>',
    options: [
      'Focus only on current legal compliance requirements',
      'Develop comprehensive, adaptable legal framework that balances compliance, business objectives, and technological evolution',
      'Copy legal frameworks from other organizations',
      'Wait for regulatory guidance before developing framework'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive, adaptable legal frameworks enable proactive risk management while maintaining business flexibility and compliance.',
    hints: ['Think about balancing multiple legal and business considerations', 'Consider adaptability for future changes']
  },
  {
    role: 'Legal Division',
    risk_card: 'strategic',
    question: 'How should Legal Division integrate deepfake considerations into corporate governance and board oversight?',
    scenario: '<strong style="font-size: 1.25em">Board oversight and corporate governance must evolve to address deepfake risks. Legal guidance on governance structures and oversight responsibilities is needed.</strong>',
    options: [
      'Address deepfake risks through existing governance structures without modification',
      'Integrate deepfake risk considerations into enhanced corporate governance framework with appropriate board oversight and reporting structures',
      'Create entirely separate governance structures for deepfake risks',
      'Focus governance only on traditional business risks'
    ],
    correct_answer: 1,
    explanation: 'Enhanced governance integration ensures appropriate board oversight while leveraging existing governance structures effectively.',
    hints: ['Think about integrating new risks into existing governance', 'Consider board oversight and reporting needs']
  }
];

console.log('Starting Legal Division question generation...');
console.log(`Planning to insert ${legalQuestions.length} questions`);

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
    
    legalQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${legalQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Legal Division question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 