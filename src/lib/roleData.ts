export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints?: string[];
  role: string;
  scenario?: string;
  cardTitle?: string;
}

export interface RiskCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
  questions: Question[];
  roles: string[];
}

export const roles = [
  'Legal Division',
  'CFO',
  'Marketing',
  'IT System',
  'Security',
  'Vendor Manager',
  'Governance, Risk and Compliance',
  'Security Incident Manager'
];

// --- Populate riskCards directly with specific scenarios ---
export const riskCards: RiskCard[] = [
  {
    id: 'operational',
    title: 'Deepfake - Operational Disruptions',
    description: 'Managing business operations during deepfake incidents and service disruptions',
    icon: 'Building2',
    impact: 'Business Continuity',
    roles: roles,
    questions: [
      {
        question: 'As CFO, what financial measures should be implemented immediately during the operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The deepfake attack has caused significant business disruption, with fake executive communications leading to operational confusion. Emergency funds are available, but the duration of the impact is unknown.</strong>',
        options: [
          'Access emergency funds only',
          'Implement comprehensive financial contingency plan including emergency funds, credit lines, and insurance claims',
          'Wait for situation resolution',
          'Only contact insurance provider'
        ],
        correctAnswer: 1, explanation: 'A comprehensive financial response ensures business continuity and recovery.', hints: ['Consider multiple financial resources', 'Think about immediate and short-term needs'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how should you handle customer communications during the disruption?',
        scenario: '<strong style="font-size: 1.25em">Customers are confused by fake executive videos and statements circulating online. Support lines are overwhelmed. A consistent message is needed urgently.</strong>',
        options: [
          'Delay all communications',
          'Develop a strategic communication plan with transparent updates',
          'Only respond to direct inquiries',
          'Delegate to customer service'
        ],
        correctAnswer: 1, explanation: 'Strategic communication maintains customer trust and manages expectations.', hints: ['Think about transparency', 'Consider customer relationships'], role: 'Marketing'
      },
      {
        question: 'From a CFO perspective, how should operational recovery costs be prioritized?',
        scenario: '<strong style="font-size: 1.25em">IT needs funds for deepfake detection tools, Legal needs resources for reputation management, and Support needs overtime pay. Limited immediate funds are available.</strong>',
        options: [
          'Based on department size',
          'Based on revenue impact and critical business functions',
          'Equal distribution',
          'Based on request order'
        ],
        correctAnswer: 1, explanation: 'Prioritizing based on revenue impact ensures efficient resource allocation.', hints: ['Consider business impact', 'Think about revenue streams'], role: 'CFO'
      },
      {
        question: 'As Marketing lead, how should you manage brand reputation during the disruption?',
        scenario: '<strong style="font-size: 1.25em">News of the deepfake videos is spreading. Competitors might leverage this. Negative press could have long-term impact if not managed proactively.</strong>',
        options: [
          'Minimize public communication',
          'Implement proactive reputation management strategy',
          'Only address negative feedback',
          'Wait for full resolution'
        ],
        correctAnswer: 1, explanation: 'Proactive reputation management helps maintain stakeholder confidence.', hints: ['Think about stakeholder perception', 'Consider long-term impact'], role: 'Marketing'
      },
      {
        question: 'What financial metrics should the CFO monitor during the operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The disruption is ongoing. To understand the daily financial impact and inform recovery decisions, specific metrics need close tracking.</strong>',
        options: [
          'Only cash flow',
          'Comprehensive metrics including cash flow, recovery costs, revenue impact, and customer retention',
          'Just daily expenses',
          'Only system downtime costs'
        ],
        correctAnswer: 1, explanation: 'Monitoring comprehensive metrics ensures effective financial management.', hints: ['Consider multiple financial aspects', 'Think about long-term impacts'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what is the primary legal concern regarding operational disruption caused by deepfakes?',
        scenario: '<strong style="font-size: 1.25em">The fake videos and statements mean the company is failing to meet its obligations to provide accurate information to stakeholders.</strong>',
        options: [
          'Employee overtime claims',
          'Breach of contract with customers/partners due to misinformation',
          'Office lease violations',
          'Trademark infringement'
        ],
        correctAnswer: 1, explanation: 'Operational disruptions can lead to failure to meet contractual obligations, posing significant legal risk.', hints: ['Consider external agreements', 'Think about service level agreements (SLAs)'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what is the first technical step to ensure operational continuity?',
        scenario: '<strong style="font-size: 1.25em">Monitoring shows fake executive communications are being circulated. The priority is to restore trust in official communications ASAP.</strong>',
        options: [
          'Order new hardware',
          'Activate the Crisis Communication Plan and implement secure communication channels',
          'Update antivirus software',
          'Reset all user passwords'
        ],
        correctAnswer: 1, explanation: 'The Crisis Communication Plan outlines procedures for establishing secure communication channels to minimize operational impact.', hints: ['Focus on immediate recovery actions', 'Consider predefined plans'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what advice should be given regarding communication about service unavailability?',
        scenario: '<strong style="font-size: 1.25em">Marketing is preparing a statement for customers about the deepfake situation. Legal needs to review it before release to manage liability.</strong>',
        options: [
          'Avoid mentioning the deepfake attack specifically',
          'Be transparent about the disruption but follow approved legal language',
          'Promise a specific recovery timeline immediately',
          'Blame a third-party vendor'
        ],
        correctAnswer: 1, explanation: 'Legal review is crucial to ensure communications are accurate, compliant, and manage liability.', hints: ['Balance transparency with legal risk', 'Think about regulatory disclosure requirements'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Deepfake - Ransom Pay',
    description: 'Evaluating and managing extortion attempts',
    icon: 'Banknote',
    impact: 'Financial and Legal Implications',
    roles: roles,
    questions: [
      {
        question: 'As CFO, what financial analysis is needed for the extortion payment decision?',
        scenario: '<strong style="font-size: 1.25em">The attackers demand payment to stop circulating deepfake content. Paying might stop the spread, but recovery costs are high either way. A decision is needed soon.</strong>',
        options: [
          'Only payment amount',
          'Comprehensive analysis of payment impact, recovery costs, and business losses',
          'Basic cost comparison',
          'Insurance coverage only'
        ],
        correctAnswer: 1, explanation: 'A comprehensive financial analysis ensures informed decision-making.', hints: ['Consider all financial implications', 'Think about long-term impact'], role: 'CFO'
      },
      {
        question: 'How should Marketing handle public perception if extortion payment is considered?',
        scenario: '<strong style="font-size: 1.25em">Internal discussions about potentially paying the extortionists are occurring. There\'s a risk this information could leak.</strong>',
        options: [
          'No communication',
          'Develop strategic messaging focusing on business continuity and customer protection',
          'Deny all payment discussions',
          'Only internal communications'
        ],
        correctAnswer: 1, explanation: 'Strategic messaging helps manage stakeholder perceptions.', hints: ['Consider stakeholder concerns', 'Think about transparency levels'], role: 'Marketing'
      },
      {
        question: 'What financial contingencies should the CFO prepare for extortion scenarios?',
        scenario: '<strong style="font-size: 1.25em">Whether paying the extortionists or funding a lengthy recovery, significant unplanned expenses are certain. Preparations are needed.</strong>',
        options: [
          'Only payment funds',
          'Comprehensive plan including payment options, recovery funds, and business continuity resources',
          'Basic emergency fund',
          'Wait for demands'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive contingency planning ensures readiness.',
        hints: ['Think about multiple scenarios', 'Consider resource allocation'],
        role: 'CFO'
      },
      {
        question: 'As Marketing Director, how should customer concerns about misinformation be addressed?',
        scenario: '<strong style="font-size: 1.25em">Regardless of payment, customers are worried about fake content and need reassurance about official communications.</strong>',
        options: [
          'Ignore concerns',
          'Implement transparent communication strategy with regular updates (based on known facts)',
          'Minimal responses',
          'Defer all questions'
        ],
        correctAnswer: 1,
        explanation: 'Transparent communication maintains customer trust.',
        hints: ['Consider customer confidence', 'Think about information sharing'],
        role: 'Marketing'
      },
      {
        question: 'What financial documentation should the CFO maintain during extortion negotiations?',
        scenario: '<strong style="font-size: 1.25em">If negotiations occur, auditors and insurers will require detailed records of the process and any associated costs.</strong>',
        options: [
          'Basic payment records',
          'Comprehensive documentation of all costs, decisions, and impact assessments',
          'Only payment amounts',
          'Minimal records'
        ],
        correctAnswer: 1,
        explanation: 'Thorough documentation supports decision-making and compliance.',
        hints: ['Think about audit requirements', 'Consider legal implications'],
        role: 'CFO'
      },
      {
        question: 'As Legal Division, what are the key legal risks associated with paying extortionists?',
        scenario: '<strong style="font-size: 1.25em">Paying the extortionists might violate government sanctions if they are on a restricted list. There could be severe penalties.</strong>',
        options: [
          'Tax implications',
          'Violation of anti-money laundering (AML) laws or sanctions (e.g., OFAC)',
          'Employee dissatisfaction',
          'Negative press coverage'
        ],
        correctAnswer: 1,
        explanation: 'Paying extortionists, especially to certain groups, can violate sanctions and AML regulations, leading to severe penalties.',
        hints: ['Consider regulatory compliance', 'Think about the recipient of the funds'],
        role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what technical factor most influences the "pay vs. don\'t pay" decision?',
        scenario: '<strong style="font-size: 1.25em">Management is weighing paying the extortionists versus implementing technical solutions. The ability to detect and block fake content is critical information.</strong>',
        options: [
          'The availability and effectiveness of deepfake detection tools',
          'The cost of the extortion demand',
          'The attacker\'s reputation for honoring agreements',
          'The type of content being faked'
        ],
        correctAnswer: 0,
        explanation: 'If reliable deepfake detection tools exist, blocking fake content is often preferable to paying extortionists.',
        hints: ['Consider technical solutions', 'Think about alternatives to payment'],
        role: 'IT System'
      },
      {
        question: 'As Legal Division, what documentation is essential if a decision is made to pay the extortionists?',
        scenario: '<strong style="font-size: 1.25em">If payment proceeds, regulatory bodies and insurance may investigate. Legal must ensure the decision and process are meticulously documented.</strong>',
        options: [
          'Only the transaction record',
          'Documentation justifying the decision, proof of sanctions checks, and communication records',
          'A summary for the CEO',
          'Notes from the negotiation calls'
        ],
        correctAnswer: 1,
        explanation: 'Thorough documentation is vital for potential regulatory scrutiny and insurance claims.',
        hints: ['Consider audit trails', 'Think about potential investigations'],
        role: 'Legal Division'
      }
    ]
  },
  {
    id: 'financial',
    title: 'Deepfake - Financial Loss',
    description: 'Managing financial impact and recovery costs',
    icon: 'Banknote',
    impact: 'Financial Management',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should you assess the total financial impact?',
        scenario: '<strong style="font-size: 1.25em">The incident involves direct costs (recovery, extortion if paid) and indirect costs (lost revenue, reputational harm). A full picture is needed.</strong>',
        options: [
          'Only direct costs',
          'Comprehensive analysis including direct costs, indirect losses, and long-term implications',
          'Basic damage estimate',
          'Wait for final numbers'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive analysis ensures all financial impacts are considered.',
        hints: ['Consider all cost types', 'Think about long-term effects'],
        role: 'CFO'
      },
      {
        question: 'How should Marketing communicate financial impacts to stakeholders?',
        scenario: '<strong style="font-size: 1.25em">The financial losses are substantial and must be reported. The messaging needs to be carefully crafted for investors and the public.</strong>',
        options: [
          'Share all details',
          'Develop strategic messaging that balances transparency with confidence in recovery',
          'No communication',
          'Only internal updates'
        ],
        correctAnswer: 1,
        explanation: 'Strategic communication maintains stakeholder confidence.',
        hints: ['Consider stakeholder needs', 'Think about market impact'],
        role: 'Marketing'
      },
      {
        question: 'What financial recovery strategies should the CFO implement?',
        scenario: '<strong style="font-size: 1.25em">Significant funds have been spent on incident response, and revenue was lost. Actions are needed to stabilize the company financially.</strong>',
        options: [
          'Cost cutting only',
          'Balanced approach including cost management, resource reallocation, and recovery investments',
          'Wait for insurance payout',
          'Minimal changes'
        ],
        correctAnswer: 1,
        explanation: 'A balanced strategy ensures effective recovery.',
        hints: ['Consider multiple approaches', 'Think about sustainability'],
        role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you maintain customer confidence during financial recovery?',
        scenario: '<strong style="font-size: 1.25em">News about the financial losses may worry customers about the company\'s future and the security of their ongoing services.</strong>',
        options: [
          'Ignore concerns',
          'Implement proactive communication strategy highlighting recovery efforts and future stability',
          'Minimal updates',
          'Only respond to queries'
        ],
        correctAnswer: 1,
        explanation: 'Proactive communication builds confidence.',
        hints: ['Think about customer retention', 'Consider brand trust'],
        role: 'Marketing'
      },
      {
        question: 'What financial reporting should the CFO prioritize?',
        scenario: '<strong style="font-size: 1.25em">During the recovery period, the board requires frequent updates on the financial situation beyond standard quarterly reports.</strong>',
        options: [
          'Basic reports',
          'Comprehensive reporting including impact analysis, recovery metrics, and forecasts',
          'Only mandatory reports',
          'Delay all reporting'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive reporting supports decision-making.',
        hints: ['Consider reporting needs', 'Think about stakeholder requirements'],
        role: 'CFO'
      },
      {
        question: 'As Legal Division, what steps must be taken if financial losses impact shareholder value significantly?',
        scenario: '<strong style="font-size: 1.25em">Analysis indicates the incident\'s financial impact is material and likely to affect stock price, triggering disclosure requirements.</strong>',
        options: [
          'Informal update to major shareholders',
          'Formal disclosure following securities regulations (e.g., SEC filings)',
          'Wait for the quarterly earnings report',
          'Consult with the marketing team only'
        ],
        correctAnswer: 1,
        explanation: 'Significant financial events often require formal disclosures to comply with securities laws and regulations.',
        hints: ['Consider investor protection laws', 'Think about material impact disclosure'],
        role: 'Legal Division'
      },
      {
        question: 'As IT System lead, how can IT contribute to mitigating future financial losses from similar incidents?',
        scenario: '<strong style="font-size: 1.25em">The high cost of this incident highlights the need for preventative IT measures to reduce the financial impact of future deepfake attacks.</strong>',
        options: [
          'By reducing the IT budget',
          'By implementing enhanced deepfake detection, improving content verification systems, and refining the crisis response plan',
          'By outsourcing all IT functions',
          'By focusing only on endpoint protection'
        ],
        correctAnswer: 1,
        explanation: 'Proactive IT security measures and robust detection systems are key to reducing the financial impact of future incidents.',
        hints: ['Focus on preventative measures', 'Consider resilience and detection speed'],
        role: 'IT System'
      },
      {
        question: 'As Legal Division, what are the potential legal costs associated with deepfake incidents?',
        scenario: '<strong style="font-size: 1.25em">The company may face lawsuits from affected parties, regulatory investigations, and costs for legal representation.</strong>',
        options: [
          'Only court filing fees',
          'Comprehensive legal costs including litigation, regulatory compliance, and potential settlements',
          'Basic legal consultation fees',
          'Minimal legal expenses'
        ],
        correctAnswer: 1,
        explanation: 'Deepfake incidents can lead to significant legal costs across multiple areas.',
        hints: ['Consider all potential legal actions', 'Think about regulatory compliance'],
        role: 'Legal Division'
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Deepfake - Regulatory Notification',
    description: 'Managing regulatory reporting and compliance requirements',
    icon: 'FileText',
    impact: 'Compliance',
    roles: roles,
    questions: [
      {
        question: 'As Legal Division, what regulatory notifications are required for deepfake incidents?',
        scenario: '<strong style="font-size: 1.25em">The deepfake attack has potentially exposed sensitive data and affected multiple stakeholders. Regulatory bodies need to be notified.</strong>',
        options: [
          'Only notify major regulators',
          'Comprehensive notification plan covering all relevant regulatory bodies based on data types and jurisdictions affected',
          'Wait for regulator inquiries',
          'Only notify if data was confirmed stolen'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive notification plan ensures compliance with all relevant regulations.',
        hints: ['Consider data protection laws', 'Think about industry-specific regulations'],
        role: 'Legal Division'
      },
      {
        question: 'As CFO, what financial reporting is required for regulatory compliance?',
        scenario: '<strong style="font-size: 1.25em">The incident has financial implications that may need to be reported to financial regulators.</strong>',
        options: [
          'Only report if material impact',
          'Assess and report all financial impacts according to regulatory requirements',
          'Include in next quarterly report',
          'Only report direct costs'
        ],
        correctAnswer: 1,
        explanation: 'Complete financial reporting ensures regulatory compliance.',
        hints: ['Consider materiality thresholds', 'Think about reporting timelines'],
        role: 'CFO'
      }
    ]
  },
  {
    id: 'employment',
    title: 'Deepfake - Employee Notification',
    description: 'Managing employee communications and support',
    icon: 'Users',
    impact: 'Employee Relations',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should employee-related costs be managed during the incident?',
        scenario: '<strong style="font-size: 1.25em">Incident response involves overtime pay, and if employee data is compromised, costs for support services may arise.</strong>',
        options: [
          'Cut all non-essential expenses',
          'Allocate specific resources for both incident response personnel costs and employee support/communication programs',
          'Delay decisions until after the incident',
          'Minimal spending only on critical response'
        ],
        correctAnswer: 1,
        explanation: 'Proper resource allocation ensures employee support and response effectiveness.',
        hints: ['Consider employee needs and response needs', 'Think about long-term impact'],
        role: 'CFO'
      },
      {
        question: 'How should Marketing handle internal communications?',
        scenario: '<strong style="font-size: 1.25em">Employees are anxious due to the deepfake incident. Clear, consistent, and reassuring internal communication is needed to maintain morale and trust.</strong>',
        options: [
          'No communication until everything is resolved',
          'Develop comprehensive internal communication strategy with regular, factual updates approved by Legal/HR',
          'Minimal updates via email only',
          'Only address emergency safety notices'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive communication maintains employee trust and morale.',
        hints: ['Think about transparency and accuracy', 'Consider employee morale'],
        role: 'Marketing'
      },
      {
        question: 'What financial support should the CFO consider for affected employees?',
        scenario: '<strong style="font-size: 1.25em">If employee information was used in deepfake content, the company may need to offer support services.</strong>',
        options: [
          'No support beyond legal requirements',
          'Comprehensive support including identity protection services, mental health resources, and potentially direct assistance programs',
          'Minimal assistance like a list of resources',
          'Only legally required benefits'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive support maintains workforce stability and demonstrates care.',
        hints: ['Consider employee welfare', 'Think about retention and goodwill'],
        role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you maintain employee engagement?',
        scenario: '<strong style="font-size: 1.25em">The incident response is stressful, and employees may feel disconnected or unappreciated. Engagement efforts are important for morale.</strong>',
        options: [
          'Focus only on external marketing',
          'Partner with HR to implement engaging internal communication, recognize response efforts, and provide clear support information',
          'Send basic company updates',
          'Delegate entirely to HR'
        ],
        correctAnswer: 1,
        explanation: 'Engaging communication and recognizing efforts maintains employee morale.',
        hints: ['Think about internal branding', 'Consider morale impact'],
        role: 'Marketing'
      },
      {
        question: 'How should the CFO budget for employee support programs?',
        scenario: '<strong style="font-size: 1.25em">HR proposes offering identity protection to all employees impacted by the deepfake incident. This has significant cost implications that need budgeting.</strong>',
        options: [
          'Use leftover funds from other budgets',
          'Develop a comprehensive budget based on estimated uptake, vendor costs, and program duration for support programs and resources',
          'No specific allocation, pay as needed',
          'Standard HR benefits budget'
        ],
        correctAnswer: 1,
        explanation: 'Proper budgeting ensures adequate support and financial control.',
        hints: ['Consider program scope and costs', 'Think about long-term benefits'],
        role: 'CFO'
      },
      {
        question: 'As Legal Division, what information must be communicated to employees if their images or data were used in deepfakes?',
        scenario: '<strong style="font-size: 1.25em">Forensic evidence suggests employee images or data were used in fake content. Specific laws dictate what employees must be told.</strong>',
        options: [
          'A general notice about the IT incident',
          'Specific details required by privacy laws (type of data used, potential risk, protection steps, contact info)',
          'Only that an IT incident occurred, details later',
          'Instructions to change their work passwords only'
        ],
        correctAnswer: 1,
        explanation: 'Specific privacy laws dictate the content required when informing affected individuals.',
        hints: ['Consider specific legal requirements (state/federal)', 'Think about individual rights to information'],
        role: 'Legal Division'
      },
      {
        question: 'As IT System lead, how can you support Legal in determining if employee data was compromised?',
        scenario: '<strong style="font-size: 1.25em">Legal needs confirmation and details about the potential use of employee data in deepfake content to fulfill notification duties.</strong>',
        options: [
          'By providing a list of all HR systems',
          'By conducting forensic analysis of affected content, access logs, and network traffic to identify specific data usage',
          'By confirming HR system backups are available',
          'By reporting the total number of employee records'
        ],
        correctAnswer: 1,
        explanation: 'Forensic analysis is essential to understand the scope and nature of data usage during the incident.',
        hints: ['Focus on evidence of specific data usage', 'Consider the technical investigation details for HR data'],
        role: 'IT System'
      },
      {
        question: 'As Legal Division, what are the implications of delaying necessary employee notifications about data usage in deepfakes?',
        scenario: '<strong style="font-size: 1.25em">There\'s pressure to delay employee notifications until recovery is complete, but privacy laws often have strict reporting timelines.</strong>',
        options: [
          'Improved employee morale by avoiding panic',
          'Potential violation of notification laws (which often have strict deadlines), leading to fines and lawsuits',
          'More time for IT to fix the issue without distraction',
          'Reduced communication costs'
        ],
        correctAnswer: 1,
        explanation: 'Delaying legally required notifications can result in significant legal and financial penalties.',
        hints: ['Consider notification deadlines in relevant laws', 'Think about regulatory consequences and employee lawsuits'],
        role: 'Legal Division'
      }
    ]
  },
  {
    id: 'crisis',
    title: 'Deepfake - Crisis Communication',
    description: 'Managing public relations and stakeholder communications',
    icon: 'Megaphone',
    impact: 'Reputation Management',
    roles: roles,
    questions: [
      {
        question: 'As Marketing Director, how should the crisis communication plan be activated?',
        scenario: '<strong style="font-size: 1.25em">The deepfake incident is gaining media attention. A coordinated communication response is needed.</strong>',
        options: [
          'Issue a single press release',
          'Implement comprehensive crisis communication plan with regular updates and stakeholder engagement',
          'Only respond to media inquiries',
          'Wait for situation to resolve'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive crisis communication plan helps manage stakeholder perceptions.',
        hints: ['Consider stakeholder needs', 'Think about message consistency'],
        role: 'Marketing'
      },
      {
        question: 'As Legal Division, what legal considerations are crucial for crisis communications?',
        scenario: '<strong style="font-size: 1.25em">Public statements about the deepfake incident must be carefully crafted to avoid legal issues.</strong>',
        options: [
          'Focus only on technical details',
          'Balance transparency with legal requirements, avoiding speculation and maintaining accuracy',
          'Minimize public statements',
          'Only communicate through legal channels'
        ],
        correctAnswer: 1,
        explanation: 'Balanced communication protects legal interests while maintaining transparency.',
        hints: ['Consider liability implications', 'Think about regulatory requirements'],
        role: 'Legal Division'
      }
    ]
  },
  {
    id: 'strategic',
    title: 'Deepfake - Strategic Impact',
    description: 'Evaluating long-term business impact and recovery',
    icon: 'Target',
    impact: 'Business Strategy',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should long-term financial strategy be adjusted?',
        scenario: '<strong style="font-size: 1.25em">This incident revealed vulnerabilities. Post-incident, the company needs to consider strategic financial adjustments for future resilience.</strong>',
        options: [
          'No changes needed, it was a one-off event',
          'Comprehensive strategy revision including increased contingency funds, cyber insurance review, and risk mitigation investments',
          'Minor adjustments to quarterly forecasts',
          'Wait and see how the market reacts'
        ],
        correctAnswer: 1, explanation: 'Strategic revision incorporating lessons learned ensures long-term financial resilience.', hints: ['Consider future risks and preparedness', 'Think about financial resilience'], role: 'CFO'
      },
      {
        question: 'How should Marketing adapt long-term brand strategy?',
        scenario: '<strong style="font-size: 1.25em">The incident has negatively impacted brand trust. The long-term marketing strategy must address how to rebuild this trust.</strong>',
        options: [
          'Maintain the current strategy and hope people forget',
          'Develop enhanced strategy incorporating transparency, rebuilding trust, and highlighting new security investments',
          'Minimal changes to messaging',
          'Focus marketing entirely on new products'
        ],
        correctAnswer: 1, explanation: 'Strategic adaptation is needed to rebuild trust and strengthen brand resilience.', hints: ['Consider brand perception and trust', 'Think about future positioning and messaging'], role: 'Marketing'
      },
      {
        question: 'What financial planning should the CFO implement for future resilience?',
        scenario: '<strong style="font-size: 1.25em">To better withstand future incidents, proactive investments in areas like deepfake detection and improved content verification are needed. This requires financial planning.</strong>',
        options: [
          'Standard operational budget planning',
          'Enhanced financial planning including dedicated budgets for risk mitigation, resilience resources, and regular security audits',
          'Update depreciation schedules only',
          'Assume no major incidents will happen again'
        ],
        correctAnswer: 1, explanation: 'Enhanced planning specifically addressing security risks improves future resilience.', hints: ['Consider proactive security investments', 'Think about long-term preparedness costs'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you rebuild long-term stakeholder confidence?',
        scenario: '<strong style="font-size: 1.25em">Following the incident, key stakeholders (investors, partners, customers) are concerned. A sustained effort is needed to restore their confidence.</strong>',
        options: [
          'Assume confidence will return over time',
          'Implement comprehensive confidence-building strategy involving consistent communication, showcasing improvements, and engaging stakeholders directly',
          'Send occasional positive news updates',
          'Focus only on acquiring new customers'
        ],
        correctAnswer: 1, explanation: 'A comprehensive, ongoing strategy is needed to actively rebuild stakeholder trust.', hints: ['Think about transparency and accountability', 'Consider long-term relationship building'], role: 'Marketing'
      },
      {
        question: 'How should the CFO structure long-term recovery investments?',
        scenario: '<strong style="font-size: 1.25em">Investing in better deepfake detection and content verification post-incident shouldn\'t be seen just as a cost, but as a strategic investment needing proper financial structuring.</strong>',
        options: [
          'As minimal operational expenses',
          'As strategic investments in resilience (detection tech, verification systems) and potentially growth (modernizing systems), evaluated for ROI',
          'Within the standard IT maintenance budget',
          'Delay investments until profitability fully recovers'
        ],
        correctAnswer: 1, explanation: 'Treating recovery and resilience as strategic investments ensures adequate funding and focus.', hints: ['Consider long-term value vs. short-term cost', 'Think about ROI and strategic alignment'], role: 'CFO'
      },
      {
        question: 'As Legal Division, how can lessons learned from the incident inform future contract negotiations (e.g., with vendors)?',
        scenario: '<strong style="font-size: 1.25em">The post-incident review showed weaknesses in current vendor contracts regarding content verification obligations. Future contracts need strengthening.</strong>',
        options: [
          'By demanding lower prices',
          'By incorporating stronger clauses related to content verification, liability limits, notification timelines, and audit rights',
          'By using standard contract templates only',
          'By avoiding contracts with IT vendors'
        ],
        correctAnswer: 1, explanation: 'Incidents highlight weaknesses; future contracts should address these through specific legal clauses.', hints: ['Consider vendor risk management', 'Think about contractual protections and liability'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what strategic technology investments could prevent similar incidents in the future?',
        scenario: '<strong style="font-size: 1.25em">The root cause analysis points to specific technology gaps (e.g., lack of deepfake detection, poor content verification). Strategic investment is needed to address these.</strong>',
        options: [
          'Faster internet connections for the office',
          'Investments in advanced deepfake detection, content verification systems, improved identity/access management, and enhanced monitoring solutions',
          'More user training videos about phishing',
          'New ergonomic keyboards for the IT team'
        ],
        correctAnswer: 1, explanation: 'Strategic IT investments should focus on core security capabilities and modern architectures to build long-term resilience.', hints: ['Think about layered security defense', 'Consider modern security frameworks'], role: 'IT System'
      },
      {
        question: 'As Legal Division, how should the company\'s incident response plan be updated based on this event?',
        scenario: '<strong style="font-size: 1.25em">The response to this incident revealed flaws in the existing Incident Response Plan (IRP), such as unclear roles or communication steps.</strong>',
        options: [
          'It doesn\'t need updating, this was unique',
          'Update roles/responsibilities, clarify communication protocols, refine legal/regulatory checklists, and incorporate lessons learned based on identified gaps',
          'Make the plan shorter and less detailed',
          'Focus the plan only on the technical recovery steps'
        ],
        correctAnswer: 1, explanation: 'The incident response plan should be a living document, updated with lessons learned to improve future responses.', hints: ['Consider the post-incident review findings', 'Think about operationalizing lessons learned'], role: 'Legal Division'
      }
    ]
  }
]; 