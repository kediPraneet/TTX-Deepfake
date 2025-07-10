const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database connection
const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// Question generation data
const questionsData = [
  // CFO Questions (25 total, distributed across 7 risk cards)
  // Operational Disruptions (4 CFO questions)
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'As CFO, what is your immediate priority when deepfake attacks disrupt daily operations?',
    scenario: '<strong style="font-size: 1.25em">Fake executive videos have caused confusion in multiple departments. Operations are slowing down, and employees are uncertain about which communications are authentic. Emergency budget allocation may be needed.</strong>',
    options: [
      'Wait for IT to resolve the technical issues',
      'Activate financial contingency plans and secure emergency operating funds',
      'Focus only on protecting current cash reserves',
      'Delegate financial decisions to department heads'
    ],
    correct_answer: 1,
    explanation: 'CFOs must ensure business continuity through proactive financial planning and resource allocation during operational disruptions.',
    hints: ['Think about maintaining business operations', 'Consider immediate cash flow needs']
  },
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'How should the CFO prioritize budget allocation during a deepfake-induced operational crisis?',
    scenario: '<strong style="font-size: 1.25em">Multiple departments are requesting emergency funds: IT needs $50K for detection tools, Legal needs $30K for crisis management, HR needs $20K for employee communications. Limited emergency budget is available.</strong>',
    options: [
      'Allocate equally among all departments',
      'Prioritize based on revenue impact and business continuity requirements',
      'Fund only the IT department request',
      'Postpone all funding decisions until crisis ends'
    ],
    correct_answer: 1,
    explanation: 'Strategic prioritization based on business impact ensures optimal resource allocation during crisis situations.',
    hints: ['Consider which departments directly impact revenue', 'Think about critical business functions']
  },
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'What financial metrics should the CFO monitor during operational disruptions caused by deepfakes?',
    scenario: '<strong style="font-size: 1.25em">The deepfake incident is affecting multiple business processes. Real-time financial monitoring is crucial to understand the full impact and guide recovery decisions.</strong>',
    options: [
      'Only track daily cash flow',
      'Monitor comprehensive metrics: cash flow, productivity losses, recovery costs, and customer retention rates',
      'Focus solely on incident response costs',
      'Wait until operations normalize to assess impact'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive financial monitoring provides the data needed for informed decision-making during crisis recovery.',
    hints: ['Think about multiple financial impact areas', 'Consider both immediate and downstream effects']
  },
  {
    role: 'CFO',
    risk_card: 'operational',
    question: 'As CFO, how should you handle investor communications during operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Investors are asking about the deepfake incident impact on quarterly earnings. The full financial impact is still being assessed, but transparency is important for maintaining investor confidence.</strong>',
    options: [
      'Avoid all investor communications until full assessment is complete',
      'Provide transparent updates with known facts while clearly stating what is still being evaluated',
      'Downplay the financial impact to maintain stock price',
      'Delegate all investor communications to the PR team'
    ],
    correct_answer: 1,
    explanation: 'Transparent, factual communication maintains investor trust while avoiding speculation about unknown impacts.',
    hints: ['Balance transparency with accuracy', 'Consider fiduciary responsibilities to shareholders']
  },

  // Ransom Pay (3 CFO questions)
  {
    role: 'CFO',
    risk_card: 'ransom',
    question: 'As CFO, what financial analysis framework should guide the ransom payment decision?',
    scenario: '<strong style="font-size: 1.25em">Attackers demand $500K to stop circulating deepfake videos of executives. The ongoing reputational damage is estimated at $100K per day. Legal and insurance implications are complex.</strong>',
    options: [
      'Simply compare the ransom amount to projected losses',
      'Conduct comprehensive cost-benefit analysis including payment, recovery, legal, insurance, and reputational factors',
      'Focus only on the immediate cash impact',
      'Leave the decision entirely to legal and security teams'
    ],
    correct_answer: 1,
    explanation: 'Complex financial decisions require comprehensive analysis of all financial, legal, and strategic implications.',
    hints: ['Consider all financial implications, not just the ransom amount', 'Think about long-term financial consequences']
  },
  {
    role: 'CFO',
    risk_card: 'ransom',
    question: 'What financial documentation should the CFO prepare for potential ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Whether paying or not paying the ransom, detailed financial records will be required for insurance claims, legal proceedings, and regulatory reporting.</strong>',
    options: [
      'Basic payment records only',
      'Comprehensive documentation of all costs, decision rationale, impact assessments, and alternative scenarios evaluated',
      'Minimal documentation to avoid legal exposure',
      'Only internal financial tracking'
    ],
    correct_answer: 1,
    explanation: 'Thorough documentation supports insurance claims, legal defense, and demonstrates responsible financial stewardship.',
    hints: ['Think about what auditors and insurers will need', 'Consider legal and regulatory requirements']
  },
  {
    role: 'CFO',
    risk_card: 'ransom',
    question: 'How should the CFO evaluate the financial risk of paying versus not paying ransom?',
    scenario: '<strong style="font-size: 1.25em">The decision team needs financial projections for both scenarios. Paying might stop immediate damage but could encourage future attacks. Not paying might extend current losses but avoids precedent setting.</strong>',
    options: [
      'Focus only on immediate financial calculations',
      'Model both short-term and long-term financial scenarios including precedent-setting risks and future attack probabilities',
      'Rely on insurance company recommendations',
      'Base decision on industry averages'
    ],
    correct_answer: 1,
    explanation: 'Strategic financial analysis must consider both immediate and long-term consequences of ransom decisions.',
    hints: ['Think beyond immediate costs', 'Consider precedent and future risk implications']
  },

  // Financial Loss (4 CFO questions)
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'As CFO, how should you quantify the total financial impact of a deepfake attack?',
    scenario: '<strong style="font-size: 1.25em">The deepfake incident has multiple financial impacts: direct response costs, lost revenue, productivity losses, and potential long-term reputational damage. A comprehensive assessment is needed for reporting and planning.</strong>',
    options: [
      'Focus only on direct incident response costs',
      'Develop comprehensive impact model including direct costs, lost revenue, productivity impacts, and long-term reputational effects',
      'Wait for all impacts to materialize before assessment',
      'Use industry average estimates'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive financial impact assessment is essential for accurate reporting, insurance claims, and strategic planning.',
    hints: ['Consider both visible and hidden costs', 'Think about immediate and long-term impacts']
  },
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'What financial recovery strategy should the CFO implement after significant deepfake-related losses?',
    scenario: '<strong style="font-size: 1.25em">Initial assessments show $2M in direct losses and ongoing revenue impact. Recovery planning must balance speed of recovery with financial sustainability.</strong>',
    options: [
      'Implement aggressive cost-cutting across all departments',
      'Develop balanced recovery plan prioritizing revenue restoration while maintaining strategic investments',
      'Focus solely on insurance recovery',
      'Wait for market conditions to naturally improve'
    ],
    correct_answer: 1,
    explanation: 'Effective financial recovery requires balanced approach that restores revenue while maintaining long-term competitiveness.',
    hints: ['Balance short-term recovery with long-term sustainability', 'Think about revenue restoration priorities']
  },
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'How should the CFO approach insurance claim management for deepfake-related losses?',
    scenario: '<strong style="font-size: 1.25em">Multiple types of losses need insurance coverage: cyber liability, business interruption, and reputational damage. Different policies may apply, and documentation requirements are complex.</strong>',
    options: [
      'File claims only for direct financial losses',
      'Develop comprehensive claim strategy covering all applicable policies with detailed documentation and expert support',
      'Wait for insurance company to guide the process',
      'Focus on the largest potential claim only'
    ],
    correct_answer: 1,
    explanation: 'Maximizing insurance recovery requires strategic approach across all applicable coverage areas with proper documentation.',
    hints: ['Think about all types of coverage that might apply', 'Consider the importance of documentation and expert help']
  },
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'What financial controls should the CFO implement to prevent future deepfake-related losses?',
    scenario: '<strong style="font-size: 1.25em">Following the incident, the board wants to understand what financial controls and procedures can reduce the risk and impact of future deepfake attacks.</strong>',
    options: [
      'Increase insurance coverage only',
      'Implement comprehensive financial risk framework including verification procedures, emergency funds, and response protocols',
      'Focus solely on technology solutions',
      'Rely on existing general risk management procedures'
    ],
    correct_answer: 1,
    explanation: 'Effective prevention requires specific financial controls tailored to deepfake attack vectors and impacts.',
    hints: ['Think about specific deepfake-related financial risks', 'Consider prevention, detection, and response capabilities']
  },

  // Regulatory Notification (4 CFO questions)
  {
    role: 'CFO',
    risk_card: 'regulatory',
    question: 'As CFO, what financial disclosure requirements apply to deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">The deepfake attack may require disclosure under various regulations: SEC reporting for public companies, customer notifications for privacy breaches, and industry-specific requirements.</strong>',
    options: [
      'Disclose only if specifically required by auditors',
      'Work with legal team to ensure all applicable financial disclosure requirements are met accurately and timely',
      'Minimize all disclosures to protect stock price',
      'Wait for regulators to request information'
    ],
    correct_answer: 1,
    explanation: 'CFOs must ensure compliance with all applicable disclosure requirements while working closely with legal counsel.',
    hints: ['Consider various regulatory frameworks that might apply', 'Think about the importance of accurate and timely disclosure']
  },
  {
    role: 'CFO',
    risk_card: 'regulatory',
    question: 'How should the CFO handle financial reporting during regulatory investigations of deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory agencies are investigating the deepfake incident. Financial records and reporting may be subject to scrutiny. Accuracy and transparency are critical while protecting company interests.</strong>',
    options: [
      'Provide minimal information unless compelled',
      'Ensure accurate, complete financial reporting while coordinating with legal counsel on investigation response',
      'Delay financial reporting until investigation concludes',
      'Focus only on protecting potentially damaging information'
    ],
    correct_answer: 1,
    explanation: 'Regulatory compliance requires accurate financial reporting while proper legal coordination protects company interests.',
    hints: ['Balance transparency with legal protection', 'Consider the importance of accuracy in regulatory contexts']
  },
  {
    role: 'CFO',
    risk_card: 'regulatory',
    question: 'What financial implications should the CFO consider regarding regulatory penalties for deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Potential regulatory violations could result in significant financial penalties. The CFO needs to assess potential exposure and ensure adequate financial planning for various penalty scenarios.</strong>',
    options: [
      'Wait to address penalties until they are imposed',
      'Assess potential penalty exposure and establish appropriate financial reserves while working on compliance remediation',
      'Focus only on avoiding penalties through legal defense',
      'Assume insurance will cover all regulatory penalties'
    ],
    correct_answer: 1,
    explanation: 'Proactive financial planning for potential penalties ensures adequate liquidity while supporting compliance efforts.',
    hints: ['Think about planning for various penalty scenarios', 'Consider the relationship between reserves and compliance efforts']
  },
  {
    role: 'CFO',
    risk_card: 'regulatory',
    question: 'How should the CFO budget for enhanced compliance measures following a deepfake incident?',
    scenario: '<strong style="font-size: 1.25em">Regulators and auditors expect enhanced controls and monitoring. Compliance improvements require significant investment in technology, personnel, and processes.</strong>',
    options: [
      'Implement minimal changes to reduce costs',
      'Develop comprehensive compliance investment plan balancing regulatory expectations with business sustainability',
      'Copy compliance approaches from other companies',
      'Focus only on technology solutions'
    ],
    correct_answer: 1,
    explanation: 'Effective compliance investment balances regulatory requirements with business needs and long-term sustainability.',
    hints: ['Consider what regulators expect vs. what the business can sustain', 'Think about comprehensive vs. minimal approaches']
  },

  // Employee Notification (3 CFO questions)
  {
    role: 'CFO',
    risk_card: 'employment',
    question: 'As CFO, how should you address employee concerns about job security during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Employees are worried that the financial impact of the deepfake attack might lead to layoffs or budget cuts. Clear communication about financial stability and job security is needed.</strong>',
    options: [
      'Avoid discussing financial implications with employees',
      'Provide transparent communication about financial position while reassuring employees about commitment to workforce stability',
      'Promise no changes regardless of financial impact',
      'Delegate all employee communications to HR'
    ],
    correct_answer: 1,
    explanation: 'Transparent communication about financial stability helps maintain employee morale and productivity during crisis.',
    hints: ['Balance honesty with reassurance', 'Consider the impact of uncertainty on employee productivity']
  },
  {
    role: 'CFO',
    risk_card: 'employment',
    question: 'What financial considerations apply to employee training and awareness programs for deepfake prevention?',
    scenario: '<strong style="font-size: 1.25em">The incident highlighted the need for comprehensive employee training on deepfake detection and response. Training programs require significant investment but could prevent future incidents.</strong>',
    options: [
      'Implement minimal training to control costs',
      'Invest in comprehensive training program viewing it as essential risk management with measurable ROI',
      'Focus training only on senior executives',
      'Rely on free online training resources only'
    ],
    correct_answer: 1,
    explanation: 'Strategic investment in employee training provides measurable risk reduction and long-term financial protection.',
    hints: ['Think about training as risk management investment', 'Consider the cost of prevention vs. cost of incidents']
  },
  {
    role: 'CFO',
    risk_card: 'employment',
    question: 'How should the CFO handle compensation and benefits during deepfake-related financial stress?',
    scenario: '<strong style="font-size: 1.25em">The deepfake incident has created financial pressure on the company. Employees expect clarity on whether compensation, benefits, or bonus programs will be affected.</strong>',
    options: [
      'Immediately reduce all discretionary compensation',
      'Carefully evaluate compensation impacts while communicating clearly with employees about decision rationale',
      'Maintain all compensation regardless of financial impact',
      'Make decisions without employee communication'
    ],
    correct_answer: 1,
    explanation: 'Thoughtful compensation decisions with clear communication maintain employee trust while addressing financial realities.',
    hints: ['Consider the balance between financial pressure and employee retention', 'Think about the importance of clear communication']
  },

  // Crisis Communication (4 CFO questions)
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'As CFO, how should you communicate financial impact to stakeholders during a deepfake crisis?',
    scenario: '<strong style="font-size: 1.25em">Media, investors, and customers are seeking information about the financial impact of the deepfake incident. Accurate communication is essential while avoiding speculation about unknown factors.</strong>',
    options: [
      'Refuse to discuss financial impacts until fully assessed',
      'Provide factual updates on known financial impacts while clearly distinguishing confirmed data from preliminary estimates',
      'Downplay financial impacts to maintain confidence',
      'Share all internal financial projections publicly'
    ],
    correct_answer: 1,
    explanation: 'Stakeholder communication requires factual accuracy while clearly distinguishing between confirmed and estimated impacts.',
    hints: ['Balance transparency with accuracy', 'Consider different stakeholder information needs']
  },
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'What financial messaging should the CFO coordinate during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">The crisis communication team needs consistent financial messaging across all channels. Different audiences (investors, customers, employees) may need different levels of financial detail.</strong>',
    options: [
      'Use identical financial messaging for all audiences',
      'Develop audience-appropriate financial messaging while maintaining consistency in core facts and figures',
      'Avoid financial details in external communications',
      'Let each department create their own financial messaging'
    ],
    correct_answer: 1,
    explanation: 'Effective crisis communication requires consistent core messaging adapted appropriately for different stakeholder needs.',
    hints: ['Think about what different audiences need to know', 'Consider consistency vs. appropriateness']
  },
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'How should the CFO address analyst and investor calls during a deepfake crisis?',
    scenario: '<strong style="font-size: 1.25em">Financial analysts are scheduling calls to understand the deepfake incident impact on earnings guidance and business outlook. Professional, accurate communication is essential for maintaining market confidence.</strong>',
    options: [
      'Cancel all analyst calls until crisis resolution',
      'Conduct calls with prepared, factual information while clearly stating limitations on forward-looking projections',
      'Provide optimistic projections to maintain stock price',
      'Delegate all analyst communications to investor relations'
    ],
    correct_answer: 1,
    explanation: 'Professional analyst communication with factual information and appropriate caveats maintains credibility and market confidence.',
    hints: ['Consider the importance of credibility with analysts', 'Think about balancing information sharing with appropriate caution']
  },
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'What financial communication protocols should the CFO establish for ongoing crisis management?',
    scenario: '<strong style="font-size: 1.25em">The deepfake crisis may continue for weeks. Establishing clear protocols for financial communication will ensure consistency and accuracy throughout the extended crisis period.</strong>',
    options: [
      'Handle communications on an ad-hoc basis',
      'Establish formal protocols for financial communication approval, fact-checking, and stakeholder coordination',
      'Centralize all communication through one spokesperson',
      'Limit communications to legally required disclosures only'
    ],
    correct_answer: 1,
    explanation: 'Formal communication protocols ensure accuracy, consistency, and appropriate coordination during extended crisis periods.',
    hints: ['Think about the importance of consistency over time', 'Consider coordination across different communication channels']
  },

  // Strategic Impact (3 CFO questions)
  {
    role: 'CFO',
    risk_card: 'strategic',
    question: 'As CFO, how should you evaluate the long-term strategic financial impact of deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Beyond immediate costs, the deepfake incident may have lasting effects on market position, customer trust, and competitive advantage. Strategic financial planning must account for these longer-term implications.</strong>',
    options: [
      'Focus only on quantifiable short-term costs',
      'Develop comprehensive strategic impact model including market position, customer relationships, and competitive implications',
      'Assume long-term impacts will resolve naturally',
      'Base projections on historical data from other types of incidents'
    ],
    correct_answer: 1,
    explanation: 'Strategic financial planning requires comprehensive analysis of both immediate and long-term business implications.',
    hints: ['Think beyond immediate financial costs', 'Consider market position and competitive effects']
  },
  {
    role: 'CFO',
    risk_card: 'strategic',
    question: 'What strategic investments should the CFO prioritize following a deepfake incident?',
    scenario: '<strong style="font-size: 1.25em">The board wants to strengthen the company against future deepfake threats. Investment options include technology, training, insurance, legal preparedness, and communication capabilities.</strong>',
    options: [
      'Invest equally in all possible improvements',
      'Prioritize investments based on risk-adjusted ROI and strategic value to long-term business resilience',
      'Focus solely on technology solutions',
      'Minimize investments to preserve cash'
    ],
    correct_answer: 1,
    explanation: 'Strategic investment decisions should balance risk reduction with business value and long-term competitive advantage.',
    hints: ['Think about which investments provide the best risk-adjusted returns', 'Consider long-term competitive positioning']
  },
  {
    role: 'CFO',
    risk_card: 'strategic',
    question: 'How should the CFO integrate deepfake risk into long-term financial planning?',
    scenario: '<strong style="font-size: 1.25em">Future financial planning must account for the possibility of recurring deepfake threats. Risk modeling and scenario planning need to incorporate this emerging threat category.</strong>',
    options: [
      'Treat deepfake incidents as one-time events',
      'Integrate deepfake risk scenarios into comprehensive enterprise risk management and financial planning frameworks',
      'Focus only on insurance coverage for future protection',
      'Wait for industry standards to emerge'
    ],
    correct_answer: 1,
    explanation: 'Effective long-term planning requires integration of emerging threats into comprehensive risk management frameworks.',
    hints: ['Think about deepfakes as an ongoing risk category', 'Consider integration with existing risk management']
  }
];

console.log('Starting question generation...');
console.log(`Planning to insert ${questionsData.length} questions`);

// Get role IDs from database first
db.serialize(() => {
  // Get role mappings
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
    
    // Insert questions
    const insertStmt = db.prepare(`
      INSERT INTO questions (risk_card_id, role_id, question_text, scenario_text, options, correct_answer, explanation, hints)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    let insertedCount = 0;
    
    questionsData.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${questionsData.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 