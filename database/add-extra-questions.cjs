const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const extraQuestions = [
  // CFO Questions (10 additional)
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'As CFO, how should you assess the financial impact of prolonged deepfake-related operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">The deepfake incident has entered its second week. Initial emergency funds are depleting, and stakeholders are demanding financial clarity on recovery timelines and costs.</strong>',
    options: [
      'Provide rough estimates based on current spending',
      'Conduct detailed financial impact modeling with scenario planning for different recovery timelines',
      'Wait until operations fully recover to assess impact',
      'Focus only on immediate cash flow needs'
    ],
    correct_answer: 1,
    explanation: 'Detailed financial modeling helps stakeholders understand potential outcomes and enables better decision-making.',
    hints: ['Consider multiple recovery scenarios', 'Think about stakeholder communication needs']
  },
  {
    role: 'CFO',
    risk_card: 'ransom',
    question: 'As CFO, what financial controls should be implemented if ransom payment is authorized?',
    scenario: '<strong style="font-size: 1.25em">The board has authorized potential ransom payment as a last resort. Financial controls and audit trails must be established before any payment consideration.</strong>',
    options: [
      'Simple payment authorization by CFO alone',
      'Multi-level approval process with complete audit documentation and legal review',
      'Standard payment procedures',
      'Delegate to security team'
    ],
    correct_answer: 1,
    explanation: 'Ransom payments require extraordinary financial controls and documentation for legal and audit purposes.',
    hints: ['Think about audit requirements', 'Consider legal implications of payment']
  },
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'As CFO, how should financial resources be allocated during the acute phase of a deepfake crisis?',
    scenario: '<strong style="font-size: 1.25em">Multiple departments need immediate funding: IT for detection tools, Legal for crisis management, Marketing for reputation control, and HR for employee communication.</strong>',
    options: [
      'Equal allocation to all departments',
      'Priority-based allocation focusing on immediate business continuity and customer protection',
      'Minimal spending until crisis scope is clear',
      'Standard budget allocation procedures'
    ],
    correct_answer: 1,
    explanation: 'Crisis resource allocation should prioritize immediate threats to business continuity and stakeholder trust.',
    hints: ['Think about immediate vs. long-term needs', 'Consider stakeholder impact']
  },
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'As CFO, what financial reporting adjustments are needed when deepfake attacks affect quarterly results?',
    scenario: '<strong style="font-size: 1.25em">The deepfake incident occurred mid-quarter, affecting revenue and increasing costs. Investors and regulators expect accurate financial reporting with proper disclosure.</strong>',
    options: [
      'Report normally without specific disclosure',
      'Provide detailed incident impact disclosure with separate reporting of crisis-related costs and revenue effects',
      'Delay financial reporting until impact is fully assessed',
      'Minimize disclosure to avoid negative market reaction'
    ],
    correct_answer: 1,
    explanation: 'Transparent financial reporting with proper disclosure maintains regulatory compliance and investor trust.',
    hints: ['Consider regulatory requirements', 'Think about investor transparency']
  },
  {
    role: 'CFO',
    risk_card: 'regulatory',
    question: 'As CFO, how should regulatory financial reporting be handled during ongoing deepfake investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulators are investigating the incident while quarterly reporting deadlines approach. Cooperation is required, but business confidentiality must be maintained.</strong>',
    options: [
      'Provide minimal information to regulators',
      'Establish transparent reporting protocols while maintaining appropriate confidentiality with legal guidance',
      'Delay all reporting until investigation concludes',
      'Report only what regulators specifically request'
    ],
    correct_answer: 1,
    explanation: 'Proactive regulatory cooperation with proper legal guidance maintains compliance while protecting business interests.',
    hints: ['Balance transparency with confidentiality', 'Consider legal guidance importance']
  },
  {
    role: 'CFO',
    risk_card: 'strategic',
    question: 'As CFO, what long-term financial strategy adjustments should be made following a deepfake incident?',
    scenario: '<strong style="font-size: 1.25em">Recovery is progressing, but the incident exposed vulnerabilities in financial planning for cyber threats. Strategic adjustments are needed for future resilience.</strong>',
    options: [
      'Return to pre-incident financial strategies',
      'Integrate cyber risk financial planning into long-term strategy with dedicated resilience investments',
      'Focus only on immediate recovery costs',
      'Wait for industry best practices to emerge'
    ],
    correct_answer: 1,
    explanation: 'Strategic financial planning must incorporate cyber resilience to prevent future incidents from causing similar disruption.',
    hints: ['Think about future prevention', 'Consider strategic resilience investment']
  },
  {
    role: 'CFO',
    risk_card: 'employment',
    question: 'As CFO, how should employee-related financial impacts of deepfake incidents be managed?',
    scenario: '<strong style="font-size: 1.25em">Employee productivity has declined due to confusion and stress. Overtime costs are rising, and some employees are considering leaving. Financial planning for HR response is needed.</strong>',
    options: [
      'Accept increased costs as temporary',
      'Develop comprehensive workforce financial planning including retention incentives and productivity recovery investments',
      'Reduce non-essential employee benefits to offset costs',
      'Focus only on overtime cost control'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive workforce financial planning helps maintain employee stability and productivity during crisis recovery.',
    hints: ['Consider employee retention costs', 'Think about productivity investment']
  },
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'As CFO, what financial metrics should guide operational recovery investment decisions?',
    scenario: '<strong style="font-size: 1.25em">Various operational improvements are proposed to prevent future incidents. Investment decisions must be based on clear financial metrics and ROI analysis.</strong>',
    options: [
      'Approve all proposed improvements',
      'Use ROI analysis combined with risk-adjusted financial modeling to prioritize investments',
      'Focus only on lowest-cost options',
      'Delay investments until full recovery'
    ],
    correct_answer: 1,
    explanation: 'Financial decision-making should combine ROI analysis with risk assessment to optimize investment allocation.',
    hints: ['Think about risk-adjusted returns', 'Consider long-term value creation']
  },
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'As CFO, how should crisis response financial planning be integrated into regular business planning?',
    scenario: '<strong style="font-size: 1.25em">The current crisis highlighted gaps in financial crisis planning. Future business plans must incorporate better crisis financial preparedness.</strong>',
    options: [
      'Add a simple contingency fund',
      'Integrate comprehensive crisis financial planning including scenario modeling, resource allocation protocols, and stakeholder communication plans',
      'Rely on insurance coverage alone',
      'Focus only on operational continuity planning'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive crisis financial planning integration ensures better preparedness for future incidents.',
    hints: ['Think about comprehensive vs. simple planning', 'Consider stakeholder needs']
  },
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'As CFO, what financial communication strategy should be used with different stakeholder groups during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Investors, lenders, customers, and employees all need financial information about the incident, but each group has different needs and risk tolerances.</strong>',
    options: [
      'Use the same financial message for all groups',
      'Develop tailored financial communication strategies for each stakeholder group with appropriate detail levels',
      'Minimize financial communication to all groups',
      'Only communicate with investors and lenders'
    ],
    correct_answer: 1,
    explanation: 'Tailored stakeholder communication ensures each group receives appropriate information for their decision-making needs.',
    hints: ['Consider different stakeholder needs', 'Think about appropriate detail levels']
  },

  // Marketing Questions (10 additional)
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'As Marketing Director, how should you manage customer acquisition efforts during ongoing deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">New customer prospects are aware of the deepfake incident through media coverage. The sales team needs guidance on addressing concerns while continuing business development.</strong>',
    options: [
      'Pause all new customer acquisition until incident resolves',
      'Develop transparent prospect communication strategy that addresses concerns while highlighting company response and resilience',
      'Avoid mentioning the incident in prospect communications',
      'Focus only on existing customer retention'
    ],
    correct_answer: 1,
    explanation: 'Transparent communication with prospects can actually demonstrate company resilience and crisis management capabilities.',
    hints: ['Think about transparency as a strength', 'Consider how crisis response demonstrates competence']
  },
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'As Marketing Director, what social media strategy should be implemented during the acute phase of a deepfake crisis?',
    scenario: '<strong style="font-size: 1.25em">Social media discussions about the incident are spreading rapidly. The company needs to engage appropriately while avoiding amplification of negative content.</strong>',
    options: [
      'Avoid all social media activity',
      'Implement proactive social media engagement with verified accounts, clear messaging, and real-time monitoring',
      'Only respond to direct mentions',
      'Delete all social media accounts temporarily'
    ],
    correct_answer: 1,
    explanation: 'Proactive social media management helps control narrative and provide accurate information to stakeholders.',
    hints: ['Think about narrative control', 'Consider real-time engagement benefits']
  },
  {
    role: 'Marketing',
    risk_card: 'ransom',
    question: 'As Marketing Director, how should marketing campaigns be adjusted if ransom payment discussions become public?',
    scenario: '<strong style="font-size: 1.25em">News outlets are reporting on potential ransom payment discussions. Current marketing campaigns may seem tone-deaf if continued without adjustment.</strong>',
    options: [
      'Continue all campaigns as planned',
      'Temporarily adjust campaign messaging to focus on security, transparency, and customer protection values',
      'Cancel all marketing campaigns',
      'Shift entirely to competitor comparison messaging'
    ],
    correct_answer: 1,
    explanation: 'Adjusting campaigns to align with current context shows awareness and appropriate response to stakeholder concerns.',
    hints: ['Think about message alignment with context', 'Consider stakeholder perception']
  },
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'As Marketing Director, how should marketing budgets be reallocated during deepfake incident financial pressures?',
    scenario: '<strong style="font-size: 1.25em">The CFO is requesting budget cuts from all departments. Marketing must maintain brand protection while reducing costs.</strong>',
    options: [
      'Cut all discretionary marketing spending equally',
      'Prioritize crisis communication and brand protection activities while reducing non-essential campaigns',
      'Maintain all current spending to show confidence',
      'Shift entire budget to digital advertising'
    ],
    correct_answer: 1,
    explanation: 'Strategic budget reallocation focuses resources on protecting brand value while supporting business recovery.',
    hints: ['Think about priority activities', 'Consider brand protection vs. promotion']
  },
  {
    role: 'Marketing',
    risk_card: 'regulatory',
    question: 'As Marketing Director, how should marketing communications comply with regulatory requirements during deepfake investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulators are investigating the incident. Marketing communications must be careful not to interfere with investigations while maintaining business promotion.</strong>',
    options: [
      'Stop all marketing communications',
      'Implement legal review process for all communications while maintaining business messaging that doesn\'t interfere with investigations',
      'Continue normal communications without changes',
      'Only communicate through legal department'
    ],
    correct_answer: 1,
    explanation: 'Legal review ensures communications compliance while allowing continued business operation and stakeholder engagement.',
    hints: ['Think about compliance without stopping business', 'Consider legal review importance']
  },
  {
    role: 'Marketing',
    risk_card: 'strategic',
    question: 'As Marketing Director, what long-term brand positioning strategy should emerge from deepfake incident experience?',
    scenario: '<strong style="font-size: 1.25em">The company has successfully managed the deepfake crisis. This experience can potentially be leveraged for positive brand differentiation in the market.</strong>',
    options: [
      'Never mention the incident in future positioning',
      'Position the company as a leader in crisis resilience and cybersecurity preparedness based on demonstrated response capabilities',
      'Focus only on pre-incident brand attributes',
      'Position as a victim to gain sympathy'
    ],
    correct_answer: 1,
    explanation: 'Successful crisis management can become a competitive advantage and brand differentiator when properly positioned.',
    hints: ['Think about turning challenges into strengths', 'Consider competitive differentiation']
  },
  {
    role: 'Marketing',
    risk_card: 'employment',
    question: 'As Marketing Director, how should employee advocacy programs be leveraged during deepfake incident recovery?',
    scenario: '<strong style="font-size: 1.25em">Employees who experienced the crisis response firsthand can be powerful advocates for the company\'s resilience and management capabilities.</strong>',
    options: [
      'Discourage employees from discussing the incident',
      'Develop structured employee advocacy program that empowers employees to share positive recovery experiences while maintaining confidentiality',
      'Only allow senior executives to discuss the incident',
      'Focus employee communications solely on internal audiences'
    ],
    correct_answer: 1,
    explanation: 'Employee advocates provide authentic, credible voices that can strengthen brand trust and demonstrate company culture.',
    hints: ['Think about authentic advocacy', 'Consider employee credibility']
  },
  {
    role: 'Marketing',
    risk_card: 'operational',
    question: 'As Marketing Director, how should customer service messaging be coordinated during operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Customer service representatives are fielding hundreds of calls about the incident. Consistent, accurate messaging across all touchpoints is critical.</strong>',
    options: [
      'Let customer service develop their own responses',
      'Create comprehensive customer service script library with regular updates and coordination protocols',
      'Refer all calls to the legal department',
      'Provide only basic talking points'
    ],
    correct_answer: 1,
    explanation: 'Coordinated customer service messaging ensures consistent, accurate communication across all customer touchpoints.',
    hints: ['Think about message consistency', 'Consider comprehensive preparation']
  },
  {
    role: 'Marketing',
    risk_card: 'crisis',
    question: 'As Marketing Director, what role should influencer and partner communications play during crisis management?',
    scenario: '<strong style="font-size: 1.25em">Business partners and influencers are asking for guidance on how to discuss the incident. Their communications can significantly impact brand perception.</strong>',
    options: [
      'Ask partners to avoid discussing the incident',
      'Provide partners with accurate information and suggested messaging while respecting their independence',
      'Control all partner communications directly',
      'End all partnerships until crisis resolves'
    ],
    correct_answer: 1,
    explanation: 'Supporting partners with accurate information helps maintain consistent messaging while respecting partnership relationships.',
    hints: ['Think about partnership respect', 'Consider information accuracy importance']
  },
  {
    role: 'Marketing',
    risk_card: 'financial',
    question: 'As Marketing Director, how should marketing ROI be measured and reported during and after a deepfake crisis?',
    scenario: '<strong style="font-size: 1.25em">Traditional marketing metrics may not capture the value of crisis communication and brand protection activities. New measurement approaches are needed.</strong>',
    options: [
      'Use only traditional ROI metrics',
      'Develop crisis-adjusted ROI metrics that include brand protection value, stakeholder trust measures, and business continuity contributions',
      'Stop measuring ROI during crisis periods',
      'Focus only on cost reduction metrics'
    ],
    correct_answer: 1,
    explanation: 'Crisis situations require adapted metrics that capture the value of brand protection and stakeholder relationship maintenance.',
    hints: ['Think about value beyond traditional metrics', 'Consider brand protection measurement']
  },

  // Legal Division Questions (10 additional)
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'As Legal Counsel, what legal documentation should be maintained during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">The operational disruption is affecting contracts and service level agreements. Legal documentation must protect the company while maintaining stakeholder relationships.</strong>',
    options: [
      'Document only major contract breaches',
      'Maintain comprehensive incident documentation including decisions, communications, and impact assessments for all stakeholder relationships',
      'Focus only on customer-facing documentation',
      'Wait until disruption ends to document impacts'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive documentation protects against future legal challenges while supporting stakeholder relationship management.',
    hints: ['Think about future legal protection', 'Consider all stakeholder types']
  },
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'As Legal Counsel, how should legal privilege be maintained during crisis communication coordination?',
    scenario: '<strong style="font-size: 1.25em">Multiple departments need legal guidance for crisis response. Communications must maintain attorney-client privilege while enabling effective coordination.</strong>',
    options: [
      'Avoid written communications with other departments',
      'Establish clear privilege protocols that protect sensitive communications while enabling necessary coordination',
      'Include all departments in privileged communications',
      'Handle all crisis communication through external counsel'
    ],
    correct_answer: 1,
    explanation: 'Proper privilege management protects sensitive information while enabling effective legal support for crisis response.',
    hints: ['Think about privilege protection', 'Consider coordination needs']
  },
  {
    role: 'Legal Division',
    risk_card: 'ransom',
    question: 'As Legal Counsel, what legal considerations should guide ransom payment decision frameworks?',
    scenario: '<strong style="font-size: 1.25em">The company is evaluating whether ransom payment is legally permissible and strategically advisable. Multiple legal factors must be considered.</strong>',
    options: [
      'Focus only on whether payment is legal',
      'Analyze legal permissibility, regulatory implications, precedent effects, and stakeholder liability considerations',
      'Defer entirely to law enforcement recommendations',
      'Consider only immediate legal risks'
    ],
    correct_answer: 1,
    explanation: 'Ransom payment decisions require comprehensive legal analysis of multiple factors and long-term implications.',
    hints: ['Think about multiple legal dimensions', 'Consider long-term precedent effects']
  },
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'As Legal Counsel, how should securities law compliance be managed during deepfake incident financial reporting?',
    scenario: '<strong style="font-size: 1.25em">The incident may constitute a material event requiring securities disclosure. Legal guidance is needed for accurate, compliant financial reporting.</strong>',
    options: [
      'Minimize disclosure to avoid market impact',
      'Ensure full securities law compliance with accurate disclosure while protecting confidential information appropriately',
      'Delay all financial reporting until legal review is complete',
      'Provide only general incident acknowledgment'
    ],
    correct_answer: 1,
    explanation: 'Securities law compliance requires accurate disclosure balanced with appropriate protection of confidential information.',
    hints: ['Think about disclosure obligations', 'Consider information protection balance']
  },
  {
    role: 'Legal Division',
    risk_card: 'regulatory',
    question: 'As Legal Counsel, what regulatory coordination strategy should be implemented during deepfake investigations?',
    scenario: '<strong style="font-size: 1.25em">Multiple regulatory agencies may have jurisdiction over different aspects of the incident. Coordinated legal response is needed.</strong>',
    options: [
      'Respond to each regulator independently',
      'Develop coordinated regulatory response strategy that ensures consistent information sharing while respecting each agency\'s jurisdiction',
      'Designate one agency as primary contact',
      'Minimize engagement with all regulators'
    ],
    correct_answer: 1,
    explanation: 'Coordinated regulatory response ensures consistency while respecting different agencies\' roles and requirements.',
    hints: ['Think about consistency across agencies', 'Consider jurisdictional respect']
  },
  {
    role: 'Legal Division',
    risk_card: 'strategic',
    question: 'As Legal Counsel, what legal risk management improvements should be implemented following deepfake incident experience?',
    scenario: '<strong style="font-size: 1.25em">The incident revealed gaps in legal preparedness for cyber threats. Strategic legal risk management enhancements are needed.</strong>',
    options: [
      'Focus only on cyber-specific legal policies',
      'Integrate comprehensive cyber risk legal preparedness into overall risk management including contracts, compliance, and crisis response',
      'Wait for industry legal standards to emerge',
      'Rely on existing general legal frameworks'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive legal risk management integration ensures better preparedness for future cyber incidents.',
    hints: ['Think about comprehensive integration', 'Consider multiple legal dimensions']
  },
  {
    role: 'Legal Division',
    risk_card: 'employment',
    question: 'As Legal Counsel, how should employment law considerations be managed during deepfake incident response?',
    scenario: '<strong style="font-size: 1.25em">Employee concerns about privacy, security, and job stability are rising. Legal guidance is needed for HR response that protects both employee rights and company interests.</strong>',
    options: [
      'Focus only on company protection',
      'Balance employee rights protection with company interests through transparent communication and appropriate policy adjustments',
      'Implement strict confidentiality requirements for all employees',
      'Avoid addressing employee concerns until incident resolves'
    ],
    correct_answer: 1,
    explanation: 'Balanced approach protects employee rights while supporting company interests and maintaining workforce stability.',
    hints: ['Think about balancing interests', 'Consider transparent communication value']
  },
  {
    role: 'Legal Division',
    risk_card: 'operational',
    question: 'As Legal Counsel, what contract renegotiation strategy should be used for agreements affected by deepfake disruptions?',
    scenario: '<strong style="font-size: 1.25em">Key contracts may need modification due to operational disruptions. Legal strategy must protect company interests while maintaining important business relationships.</strong>',
    options: [
      'Enforce all existing contract terms strictly',
      'Develop flexible renegotiation approach that protects company interests while maintaining strategic relationships',
      'Seek contract termination for all affected agreements',
      'Wait for counterparties to initiate renegotiation discussions'
    ],
    correct_answer: 1,
    explanation: 'Flexible renegotiation protects company interests while preserving valuable business relationships and future opportunities.',
    hints: ['Think about relationship preservation', 'Consider long-term business value']
  },
  {
    role: 'Legal Division',
    risk_card: 'crisis',
    question: 'As Legal Counsel, how should litigation risk be assessed and managed during ongoing deepfake crisis?',
    scenario: '<strong style="font-size: 1.25em">Potential litigation from various stakeholders is possible. Legal strategy must prepare for defense while avoiding actions that increase liability exposure.</strong>',
    options: [
      'Prepare for litigation only after claims are filed',
      'Implement proactive litigation risk management including documentation preservation, witness preparation, and exposure minimization',
      'Focus only on insurance coverage for potential claims',
      'Avoid any acknowledgment of incident impacts'
    ],
    correct_answer: 1,
    explanation: 'Proactive litigation risk management better positions the company for defense while minimizing additional exposure.',
    hints: ['Think about proactive vs. reactive preparation', 'Consider exposure minimization']
  },
  {
    role: 'Legal Division',
    risk_card: 'financial',
    question: 'As Legal Counsel, what legal considerations should guide insurance claim strategy for deepfake incident costs?',
    scenario: '<strong style="font-size: 1.25em">Multiple insurance policies may provide coverage for different aspects of incident costs. Legal strategy must maximize recovery while protecting policy relationships.</strong>',
    options: [
      'File claims under all potentially applicable policies immediately',
      'Develop strategic insurance claim approach that maximizes coverage while maintaining insurer relationships and avoiding policy conflicts',
      'Focus only on the largest coverage policy',
      'Wait until all costs are known before filing any claims'
    ],
    correct_answer: 1,
    explanation: 'Strategic insurance approach maximizes recovery while preserving important insurer relationships for future coverage.',
    hints: ['Think about relationship preservation', 'Consider strategic claim timing']
  },

  // IT System Questions (10 additional)
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'As IT Systems Manager, what technical controls should be implemented to prevent future deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Current operations are stabilizing, but technical controls must be enhanced to prevent similar future disruptions from deepfake content.</strong>',
    options: [
      'Install basic content filtering software',
      'Implement comprehensive deepfake detection system with AI-powered content verification, employee training, and incident response integration',
      'Rely on existing security measures',
      'Focus only on email security improvements'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive technical controls provide multiple layers of protection against sophisticated deepfake threats.',
    hints: ['Think about comprehensive vs. basic protection', 'Consider AI-powered solutions']
  },
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'As IT Systems Manager, how should technical crisis response capabilities be enhanced following deepfake incident experience?',
    scenario: '<strong style="font-size: 1.25em">The current incident highlighted gaps in technical crisis response. Enhanced capabilities are needed for future incident management.</strong>',
    options: [
      'Add more monitoring tools',
      'Develop integrated crisis response platform combining threat detection, communication systems, and automated response protocols',
      'Focus only on faster response times',
      'Increase IT staff availability'
    ],
    correct_answer: 1,
    explanation: 'Integrated crisis response platforms provide coordinated technical capabilities for effective incident management.',
    hints: ['Think about integration vs. individual tools', 'Consider automated response benefits']
  },
  {
    role: 'IT System',
    risk_card: 'ransom',
    question: 'As IT Systems Manager, what technical safeguards should be implemented if ransom payment becomes necessary?',
    scenario: '<strong style="font-size: 1.25em">If ransom payment is authorized, technical safeguards must ensure secure transaction processing while maintaining audit trails and system security.</strong>',
    options: [
      'Use standard payment processing systems',
      'Implement isolated payment processing environment with enhanced security controls and comprehensive audit logging',
      'Delegate payment processing to external service',
      'Use existing financial system infrastructure'
    ],
    correct_answer: 1,
    explanation: 'Isolated payment processing with enhanced controls protects systems while ensuring proper audit trails for ransom transactions.',
    hints: ['Think about system isolation', 'Consider audit trail importance']
  },
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'As IT Systems Manager, how should IT budget allocation be optimized following deepfake incident cost analysis?',
    scenario: '<strong style="font-size: 1.25em">The incident revealed significant IT security investment needs. Budget allocation must balance immediate security improvements with long-term strategic technology investments.</strong>',
    options: [
      'Focus all budget on immediate security fixes',
      'Develop balanced investment strategy addressing immediate security needs while maintaining strategic technology development',
      'Maintain existing budget allocation',
      'Request maximum possible budget increase'
    ],
    correct_answer: 1,
    explanation: 'Balanced investment ensures security improvements while maintaining technology capabilities needed for business growth.',
    hints: ['Think about balance vs. single focus', 'Consider long-term technology needs']
  },
  {
    role: 'IT System',
    risk_card: 'regulatory',
    question: 'As IT Systems Manager, how should technical compliance be maintained during regulatory deepfake investigations?',
    scenario: '<strong style="font-size: 1.25em">Regulators require technical data and system access for their investigation. Compliance must be balanced with system security and business continuity.</strong>',
    options: [
      'Provide unrestricted system access to regulators',
      'Implement controlled access protocols that meet regulatory requirements while maintaining system security and business operations',
      'Minimize data sharing with regulators',
      'Create separate systems for regulatory access'
    ],
    correct_answer: 1,
    explanation: 'Controlled access protocols balance regulatory compliance with system security and operational continuity.',
    hints: ['Think about controlled vs. unrestricted access', 'Consider business continuity needs']
  },
  {
    role: 'IT System',
    risk_card: 'strategic',
    question: 'As IT Systems Manager, what strategic technology roadmap adjustments should be made following deepfake incident insights?',
    scenario: '<strong style="font-size: 1.25em">The incident revealed technology vulnerabilities and capabilities gaps. Strategic technology planning must incorporate lessons learned for future resilience.</strong>',
    options: [
      'Focus only on security technology improvements',
      'Integrate comprehensive cyber resilience capabilities into strategic technology roadmap including AI, automation, and advanced threat detection',
      'Delay strategic initiatives until security is improved',
      'Maintain existing technology roadmap'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive cyber resilience integration ensures technology strategy supports both security and business objectives.',
    hints: ['Think about comprehensive vs. narrow focus', 'Consider strategic integration']
  },
  {
    role: 'IT System',
    risk_card: 'employment',
    question: 'As IT Systems Manager, how should employee technology training be enhanced following deepfake incident experience?',
    scenario: '<strong style="font-size: 1.25em">Employee confusion about identifying authentic communications contributed to operational disruption. Enhanced technology training is needed.</strong>',
    options: [
      'Provide basic email security training',
      'Develop comprehensive deepfake awareness training including recognition techniques, verification protocols, and incident reporting procedures',
      'Focus only on technical staff training',
      'Rely on general cybersecurity awareness training'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive deepfake awareness training empowers employees to identify and respond appropriately to sophisticated threats.',
    hints: ['Think about comprehensive vs. basic training', 'Consider all employee types']
  },
  {
    role: 'IT System',
    risk_card: 'operational',
    question: 'As IT Systems Manager, what technical architecture improvements should be prioritized for operational resilience?',
    scenario: '<strong style="font-size: 1.25em">The incident highlighted technical architecture vulnerabilities that contributed to operational disruption. Strategic improvements are needed.</strong>',
    options: [
      'Focus only on communication system redundancy',
      'Implement comprehensive resilience architecture including redundant systems, automated failover, and integrated threat response capabilities',
      'Upgrade existing systems incrementally',
      'Wait for vendor security improvements'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive resilience architecture provides multiple protection layers and automated response capabilities for operational continuity.',
    hints: ['Think about comprehensive vs. single-point improvements', 'Consider automation benefits']
  },
  {
    role: 'IT System',
    risk_card: 'crisis',
    question: 'As IT Systems Manager, how should technical incident response coordination be improved with other departments?',
    scenario: '<strong style="font-size: 1.25em">Technical incident response needs better coordination with Legal, Marketing, and Finance departments for effective crisis management.</strong>',
    options: [
      'Maintain separate IT incident response procedures',
      'Develop integrated incident response framework that coordinates technical actions with legal, marketing, and financial requirements',
      'Focus only on technical response speed',
      'Delegate coordination to management'
    ],
    correct_answer: 1,
    explanation: 'Integrated incident response ensures technical actions support overall crisis management objectives and stakeholder needs.',
    hints: ['Think about integration vs. isolation', 'Consider stakeholder coordination']
  },
  {
    role: 'IT System',
    risk_card: 'financial',
    question: 'As IT Systems Manager, how should technical ROI be measured and reported for deepfake prevention investments?',
    scenario: '<strong style="font-size: 1.25em">Significant investments in deepfake prevention technology are proposed. Technical ROI measurement must demonstrate value to financial stakeholders.</strong>',
    options: [
      'Focus only on cost reduction metrics',
      'Develop comprehensive ROI framework including risk reduction value, operational efficiency gains, and business continuity benefits',
      'Use standard IT ROI metrics',
      'Emphasize only security improvement benefits'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive ROI measurement demonstrates multiple value dimensions and supports investment decision-making.',
    hints: ['Think about multiple value types', 'Consider business continuity value']
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
    
    extraQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${extraQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Extra questions insertion complete. Inserted ${insertedCount} questions.`);
      
      // Verify the new counts
      db.all(`
        SELECT r.name as role, COUNT(*) as count 
        FROM questions q
        JOIN roles r ON q.role_id = r.id
        GROUP BY r.name 
        ORDER BY r.name
      `, [], (err, counts) => {
        if (err) {
          console.error('Error checking final counts:', err);
        } else {
          console.log('\n=== UPDATED QUESTION COUNTS ===');
          let total = 0;
          counts.forEach(({ role, count }) => {
            console.log(`${role}: ${count} questions`);
            total += count;
          });
          console.log(`Total: ${total} questions`);
        }
        db.close();
      });
    });
  });
}); 