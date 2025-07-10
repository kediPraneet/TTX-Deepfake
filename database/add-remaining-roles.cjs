const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const remainingRolesQuestions = [
  // Governance and Compliance Questions (10 additional)
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'As Governance Officer, what governance framework adjustments are needed following deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">The operational disruption revealed governance gaps in crisis decision-making authority and stakeholder communication protocols.</strong>',
    options: [
      'Maintain existing governance structure',
      'Implement enhanced crisis governance framework with clear authority delegation and stakeholder communication protocols',
      'Focus only on technical governance improvements',
      'Wait for industry governance standards'
    ],
    correct_answer: 1,
    explanation: 'Enhanced crisis governance ensures effective decision-making and stakeholder management during future incidents.',
    hints: ['Think about decision-making clarity', 'Consider stakeholder communication needs']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'As Governance Officer, how should board oversight be structured during deepfake crisis management?',
    scenario: '<strong style="font-size: 1.25em">The board needs regular updates and input on crisis management decisions, but operational speed is critical. Governance balance is needed.</strong>',
    options: [
      'Require board approval for all crisis decisions',
      'Establish streamlined board oversight with delegated authority for time-sensitive decisions and regular comprehensive updates',
      'Exclude board from crisis management',
      'Convene board only for major decisions'
    ],
    correct_answer: 1,
    explanation: 'Streamlined oversight balances board governance responsibilities with operational crisis management needs.',
    hints: ['Think about balance between oversight and speed', 'Consider delegation frameworks']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'ransom',
    question: 'As Governance Officer, what governance controls should be implemented for ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Ransom payment decisions require careful governance oversight while maintaining decision-making speed and confidentiality.</strong>',
    options: [
      'Standard procurement approval process',
      'Specialized governance framework with enhanced authorization levels, confidentiality protocols, and audit requirements',
      'CEO-only decision authority',
      'Defer all decisions to law enforcement'
    ],
    correct_answer: 1,
    explanation: 'Specialized governance frameworks ensure appropriate oversight while maintaining necessary confidentiality and speed.',
    hints: ['Think about specialized vs. standard processes', 'Consider confidentiality needs']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'As Governance Officer, how should financial governance be adapted during deepfake incident cost management?',
    scenario: '<strong style="font-size: 1.25em">Significant unplanned costs require governance oversight, but traditional budget approval processes may be too slow for crisis response.</strong>',
    options: [
      'Use standard budget approval processes',
      'Implement crisis financial governance with expedited approval authority and enhanced reporting requirements',
      'Suspend all financial governance during crisis',
      'Delegate all financial decisions to CFO'
    ],
    correct_answer: 1,
    explanation: 'Crisis financial governance balances oversight responsibilities with operational speed requirements.',
    hints: ['Think about expedited vs. standard processes', 'Consider enhanced reporting value']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'regulatory',
    question: 'As Governance Officer, what compliance monitoring should be enhanced during regulatory deepfake investigations?',
    scenario: '<strong style="font-size: 1.25em">Multiple regulatory agencies are investigating. Compliance monitoring must ensure consistent cooperation while protecting company interests.</strong>',
    options: [
      'Monitor only primary regulator interactions',
      'Implement comprehensive compliance monitoring across all regulatory interactions with centralized coordination and consistency protocols',
      'Focus only on legal compliance requirements',
      'Delegate monitoring to individual departments'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive compliance monitoring ensures consistent regulatory cooperation while protecting company interests.',
    hints: ['Think about consistency across regulators', 'Consider centralized coordination benefits']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'strategic',
    question: 'As Governance Officer, how should strategic governance be evolved to address cyber threat resilience?',
    scenario: '<strong style="font-size: 1.25em">Strategic planning must incorporate cyber threat resilience as a core governance consideration for future business decisions.</strong>',
    options: [
      'Add cyber risk as an agenda item',
      'Integrate cyber resilience governance into strategic planning framework with risk assessment protocols and investment prioritization',
      'Focus only on current strategic priorities',
      'Create separate cyber governance committee'
    ],
    correct_answer: 1,
    explanation: 'Integrated cyber resilience governance ensures cyber considerations are embedded in all strategic decisions.',
    hints: ['Think about integration vs. separation', 'Consider strategic framework enhancement']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'employment',
    question: 'As Governance Officer, what employment governance should be established for deepfake incident workforce management?',
    scenario: '<strong style="font-size: 1.25em">Employee concerns about privacy, security, and job stability require governance oversight to ensure fair and consistent treatment.</strong>',
    options: [
      'Use existing HR governance processes',
      'Establish enhanced employment governance with employee rights protection, transparent communication protocols, and fair treatment oversight',
      'Focus only on management decisions',
      'Delegate all decisions to HR department'
    ],
    correct_answer: 1,
    explanation: 'Enhanced employment governance ensures fair treatment and transparent communication during crisis periods.',
    hints: ['Think about employee rights protection', 'Consider transparent communication value']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'operational',
    question: 'As Governance Officer, what operational governance improvements should be prioritized following deepfake incident analysis?',
    scenario: '<strong style="font-size: 1.25em">Operational governance gaps contributed to the incident impact. Strategic improvements are needed for future resilience.</strong>',
    options: [
      'Focus only on communication governance',
      'Implement comprehensive operational governance including decision authority frameworks, communication protocols, and stakeholder management systems',
      'Maintain existing operational governance',
      'Focus only on crisis-specific governance'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive operational governance improvements enhance resilience across all business operations.',
    hints: ['Think about comprehensive vs. narrow improvements', 'Consider multiple governance dimensions']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'As Governance Officer, how should stakeholder governance be structured during ongoing deepfake crisis management?',
    scenario: '<strong style="font-size: 1.25em">Multiple stakeholder groups need different information and engagement levels. Governance structure must coordinate stakeholder management effectively.</strong>',
    options: [
      'Treat all stakeholders equally',
      'Establish tiered stakeholder governance with appropriate engagement levels and information sharing protocols for each stakeholder group',
      'Focus only on primary stakeholders',
      'Minimize stakeholder engagement during crisis'
    ],
    correct_answer: 1,
    explanation: 'Tiered stakeholder governance ensures appropriate engagement while managing information sharing effectively.',
    hints: ['Think about tiered vs. equal treatment', 'Consider information sharing protocols']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'financial',
    question: 'As Governance Officer, what financial oversight governance should be maintained during deepfake incident cost escalation?',
    scenario: '<strong style="font-size: 1.25em">Incident costs are escalating beyond initial projections. Financial oversight governance must balance control with operational flexibility.</strong>',
    options: [
      'Implement strict cost controls',
      'Establish adaptive financial oversight that maintains governance controls while enabling necessary operational flexibility',
      'Suspend financial oversight during crisis',
      'Focus only on cost reduction governance'
    ],
    correct_answer: 1,
    explanation: 'Adaptive financial oversight balances governance controls with operational flexibility needed for effective crisis response.',
    hints: ['Think about adaptive vs. rigid controls', 'Consider operational flexibility needs']
  },

  // Security Incident Manager Questions (10 additional)
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'As Security Incident Manager, what security protocols should be enhanced to prevent operational disruption from future deepfake attacks?',
    scenario: '<strong style="font-size: 1.25em">Current security protocols failed to prevent operational disruption. Enhanced protocols must address deepfake-specific threats while maintaining business operations.</strong>',
    options: [
      'Add basic content verification steps',
      'Implement comprehensive deepfake detection protocols with AI-powered verification, multi-channel confirmation, and automated threat response',
      'Focus only on email security enhancements',
      'Rely on employee training alone'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive deepfake detection protocols provide multiple protection layers against sophisticated threats.',
    hints: ['Think about comprehensive vs. basic protection', 'Consider AI-powered solutions']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'As Security Incident Manager, how should security incident response be coordinated with overall crisis management?',
    scenario: '<strong style="font-size: 1.25em">Security incident response must integrate with Legal, Marketing, and Finance crisis management activities for coordinated organizational response.</strong>',
    options: [
      'Maintain independent security response',
      'Integrate security incident response into comprehensive crisis management framework with coordinated decision-making and communication',
      'Focus only on technical security response',
      'Delegate coordination to senior management'
    ],
    correct_answer: 1,
    explanation: 'Integrated security response ensures technical actions support overall crisis management objectives and stakeholder needs.',
    hints: ['Think about integration vs. independence', 'Consider coordinated decision-making']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'ransom',
    question: 'As Security Incident Manager, what security measures should be implemented if ransom payment is being considered?',
    scenario: '<strong style="font-size: 1.25em">Ransom payment consideration requires enhanced security measures to protect payment processes and prevent additional threats.</strong>',
    options: [
      'Use standard payment security measures',
      'Implement enhanced security protocols including isolated payment systems, advanced threat monitoring, and comprehensive incident tracking',
      'Focus only on payment transaction security',
      'Delegate security to financial systems'
    ],
    correct_answer: 1,
    explanation: 'Enhanced security protocols protect against additional threats while ensuring secure payment processing if authorized.',
    hints: ['Think about enhanced vs. standard measures', 'Consider comprehensive threat monitoring']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'As Security Incident Manager, how should security investment priorities be determined following deepfake incident cost analysis?',
    scenario: '<strong style="font-size: 1.25em">Security investments must be prioritized based on incident lessons learned while balancing cost considerations and business impact.</strong>',
    options: [
      'Focus on lowest-cost security improvements',
      'Prioritize security investments based on risk reduction value, business impact protection, and cost-effectiveness analysis',
      'Implement all possible security measures',
      'Focus only on deepfake-specific security'
    ],
    correct_answer: 1,
    explanation: 'Risk-based security investment prioritization optimizes protection while considering business impact and cost effectiveness.',
    hints: ['Think about risk-based vs. cost-based prioritization', 'Consider business impact value']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'regulatory',
    question: 'As Security Incident Manager, how should security incident information be shared with regulatory investigators?',
    scenario: '<strong style="font-size: 1.25em">Regulators require detailed security incident information. Information sharing must balance regulatory cooperation with security confidentiality.</strong>',
    options: [
      'Provide minimal security information',
      'Establish controlled information sharing protocols that meet regulatory requirements while protecting sensitive security details',
      'Share all security information requested',
      'Delegate information sharing to legal department'
    ],
    correct_answer: 1,
    explanation: 'Controlled information sharing balances regulatory cooperation with protection of sensitive security information and methods.',
    hints: ['Think about controlled vs. unrestricted sharing', 'Consider security confidentiality needs']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'strategic',
    question: 'As Security Incident Manager, what strategic security capabilities should be developed following deepfake incident insights?',
    scenario: '<strong style="font-size: 1.25em">Strategic security planning must incorporate lessons learned to build comprehensive deepfake threat defense capabilities.</strong>',
    options: [
      'Focus only on current threat responses',
      'Develop comprehensive strategic security capabilities including advanced threat detection, predictive analytics, and automated response systems',
      'Wait for vendor security solutions',
      'Focus only on deepfake-specific capabilities'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive strategic security capabilities provide defense against evolving threats including future deepfake variations.',
    hints: ['Think about comprehensive vs. narrow capabilities', 'Consider predictive and automated systems']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'employment',
    question: 'As Security Incident Manager, how should employee security training be enhanced following deepfake incident experience?',
    scenario: '<strong style="font-size: 1.25em">Employee inability to identify deepfake content contributed to incident impact. Enhanced security training is needed for all staff.</strong>',
    options: [
      'Provide basic deepfake awareness training',
      'Implement comprehensive security training including deepfake recognition, verification protocols, incident reporting, and response procedures',
      'Focus training only on high-risk employees',
      'Rely on general cybersecurity training'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security training empowers all employees to identify and respond appropriately to sophisticated threats.',
    hints: ['Think about comprehensive vs. basic training', 'Consider all employee types']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'operational',
    question: 'As Security Incident Manager, what operational security integration should be improved following deepfake disruption analysis?',
    scenario: '<strong style="font-size: 1.25em">Security measures must integrate better with operational processes to prevent disruption while maintaining protection.</strong>',
    options: [
      'Implement stronger security controls regardless of operational impact',
      'Develop integrated operational security that maintains protection while supporting business processes and minimizing operational friction',
      'Focus only on security effectiveness',
      'Separate security from operational considerations'
    ],
    correct_answer: 1,
    explanation: 'Integrated operational security provides protection while supporting business operations and minimizing workflow disruption.',
    hints: ['Think about integration vs. separation', 'Consider operational friction minimization']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'crisis',
    question: 'As Security Incident Manager, what security communication protocols should be established for crisis stakeholder management?',
    scenario: '<strong style="font-size: 1.25em">Different stakeholders need security information during crisis, but information sharing must maintain security while enabling effective communication.</strong>',
    options: [
      'Provide same security information to all stakeholders',
      'Establish tiered security communication protocols with appropriate information levels for different stakeholder groups',
      'Minimize security communication to all stakeholders',
      'Delegate security communication to other departments'
    ],
    correct_answer: 1,
    explanation: 'Tiered security communication ensures stakeholders receive appropriate information while maintaining security confidentiality.',
    hints: ['Think about tiered vs. uniform communication', 'Consider stakeholder-appropriate information']
  },
  {
    role: 'Security Incident Manager',
    risk_card: 'financial',
    question: 'As Security Incident Manager, how should security ROI be measured and reported for deepfake prevention investments?',
    scenario: '<strong style="font-size: 1.25em">Significant security investments are proposed for deepfake prevention. ROI measurement must demonstrate security value to business stakeholders.</strong>',
    options: [
      'Focus only on security tool costs',
      'Develop comprehensive security ROI framework including risk reduction value, business continuity benefits, and stakeholder confidence measures',
      'Use standard security metrics only',
      'Emphasize only threat prevention benefits'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive security ROI measurement demonstrates multiple value dimensions and supports investment decision-making.',
    hints: ['Think about multiple value types', 'Consider business continuity and confidence value']
  },

  // Vendor Manager Questions (10 additional)
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'As Vendor Manager, what vendor communication protocols should be established to prevent operational disruptions from deepfake content?',
    scenario: '<strong style="font-size: 1.25em">Vendors received conflicting instructions due to fake communications, disrupting supply chain operations. Enhanced protocols are needed.</strong>',
    options: [
      'Add basic email verification steps',
      'Implement comprehensive vendor authentication protocols with multi-channel verification, secure communication systems, and escalation procedures',
      'Focus only on major vendor communications',
      'Rely on existing vendor security measures'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive vendor authentication protocols prevent supply chain disruption from fake communications.',
    hints: ['Think about comprehensive vs. basic verification', 'Consider multi-channel confirmation']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'As Vendor Manager, how should vendor relationship management be coordinated during deepfake crisis response?',
    scenario: '<strong style="font-size: 1.25em">Vendor relationships require careful management during crisis to maintain supply chain stability while managing reputational concerns.</strong>',
    options: [
      'Minimize vendor communication during crisis',
      'Implement proactive vendor relationship management with transparent communication, support coordination, and partnership preservation strategies',
      'Focus only on critical vendors',
      'Delegate vendor management to individual departments'
    ],
    correct_answer: 1,
    explanation: 'Proactive vendor relationship management maintains supply chain stability and preserves important business partnerships.',
    hints: ['Think about proactive vs. reactive management', 'Consider partnership preservation']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'ransom',
    question: 'As Vendor Manager, what vendor security requirements should be enhanced if ransom payment discussions affect vendor confidence?',
    scenario: '<strong style="font-size: 1.25em">Vendors are concerned about security standards following ransom payment discussions. Enhanced security requirements may be needed to maintain vendor confidence.</strong>',
    options: [
      'Maintain existing vendor security requirements',
      'Implement enhanced vendor security standards with improved verification protocols, security assessments, and partnership protection measures',
      'Focus only on payment processing vendors',
      'Delegate security requirements to IT department'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor security standards help restore and maintain vendor confidence while improving overall supply chain security.',
    hints: ['Think about confidence restoration', 'Consider partnership protection measures']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'As Vendor Manager, how should vendor contract terms be adjusted to address deepfake incident financial impacts?',
    scenario: '<strong style="font-size: 1.25em">Financial pressures from the incident may require vendor contract adjustments. Terms must be renegotiated while preserving important vendor relationships.</strong>',
    options: [
      'Seek cost reductions from all vendors',
      'Develop strategic contract adjustment approach that balances financial needs with vendor relationship preservation and value optimization',
      'Maintain all existing contract terms',
      'Focus only on largest vendor contracts'
    ],
    correct_answer: 1,
    explanation: 'Strategic contract adjustments balance financial pressures with vendor relationship preservation and long-term value.',
    hints: ['Think about strategic vs. uniform approaches', 'Consider relationship preservation']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'regulatory',
    question: 'As Vendor Manager, how should vendor compliance be managed during regulatory deepfake investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulators may require vendor information and cooperation. Vendor compliance must be coordinated while protecting vendor relationships and confidentiality.</strong>',
    options: [
      'Provide regulator access to all vendor information',
      'Coordinate vendor compliance with appropriate confidentiality protection, relationship management, and regulatory cooperation protocols',
      'Minimize vendor involvement in regulatory process',
      'Let vendors handle regulatory requests independently'
    ],
    correct_answer: 1,
    explanation: 'Coordinated vendor compliance balances regulatory requirements with vendor relationship protection and confidentiality concerns.',
    hints: ['Think about coordination vs. independence', 'Consider confidentiality protection']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'strategic',
    question: 'As Vendor Manager, what strategic vendor partnership capabilities should be developed following deepfake incident insights?',
    scenario: '<strong style="font-size: 1.25em">Strategic vendor partnerships must be enhanced to provide better resilience and support during future incidents.</strong>',
    options: [
      'Focus only on current vendor capabilities',
      'Develop comprehensive strategic vendor partnership framework including crisis support capabilities, security collaboration, and resilience planning',
      'Wait for vendor security improvements',
      'Focus only on vendor cost optimization'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive strategic vendor partnerships provide enhanced resilience and support capabilities for future incident management.',
    hints: ['Think about comprehensive vs. narrow capabilities', 'Consider crisis support and resilience']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'employment',
    question: 'As Vendor Manager, how should vendor workforce coordination be improved following employee-vendor communication confusion during the deepfake incident?',
    scenario: '<strong style="font-size: 1.25em">Employee-vendor communication confusion contributed to operational disruption. Improved coordination protocols are needed.</strong>',
    options: [
      'Limit employee-vendor interactions',
      'Establish enhanced employee-vendor coordination protocols with clear communication channels, verification procedures, and escalation frameworks',
      'Focus only on management-vendor communications',
      'Delegate coordination to individual departments'
    ],
    correct_answer: 1,
    explanation: 'Enhanced coordination protocols improve communication clarity while maintaining necessary employee-vendor collaboration.',
    hints: ['Think about enhanced vs. limited interaction', 'Consider clear communication channels']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'As Vendor Manager, what vendor performance monitoring should be enhanced to detect and prevent operational disruptions from communication issues?',
    scenario: '<strong style="font-size: 1.25em">Vendor performance monitoring must detect communication-related issues before they cause operational disruption.</strong>',
    options: [
      'Use standard vendor performance metrics',
      'Implement enhanced vendor monitoring including communication effectiveness, response verification, and early warning indicators for potential disruption',
      'Focus only on delivery performance metrics',
      'Increase monitoring frequency only'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor monitoring with communication effectiveness metrics provides early warning of potential disruptions.',
    hints: ['Think about comprehensive vs. standard monitoring', 'Consider early warning systems']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'As Vendor Manager, what vendor support coordination should be established for crisis communication management?',
    scenario: '<strong style="font-size: 1.25em">Vendors can be valuable partners in crisis communication management, but coordination must maintain message consistency and relationship integrity.</strong>',
    options: [
      'Exclude vendors from crisis communications',
      'Establish vendor communication partnership framework with coordinated messaging, support protocols, and relationship protection measures',
      'Let vendors develop independent communications',
      'Focus only on internal crisis communications'
    ],
    correct_answer: 1,
    explanation: 'Vendor communication partnerships provide additional support while maintaining message consistency and relationship integrity.',
    hints: ['Think about partnership vs. exclusion', 'Consider coordinated messaging benefits']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'As Vendor Manager, how should vendor relationship ROI be measured and optimized following deepfake incident cost impacts?',
    scenario: '<strong style="font-size: 1.25em">Vendor relationships must be evaluated for ROI optimization while considering their support value during crisis management.</strong>',
    options: [
      'Focus only on vendor cost reduction',
      'Develop comprehensive vendor ROI framework including cost optimization, crisis support value, resilience contributions, and partnership benefits',
      'Maintain existing vendor evaluation methods',
      'Focus only on operational performance metrics'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive vendor ROI evaluation considers multiple value dimensions including crisis support and resilience contributions.',
    hints: ['Think about comprehensive vs. cost-only evaluation', 'Consider crisis support value']
  }
];

// Add database insertion logic
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
    
    console.log('Role mappings:', roleMap);
    
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    remainingRolesQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${remainingRolesQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Remaining roles questions insertion complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 