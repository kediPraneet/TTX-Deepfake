const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// Define the missing questions needed for each role to reach exactly 5 per risk card
const missingQuestions = [
  // CFO missing questions
  {
    role: 'CFO',
    risk_card: 'crisis',
    question: 'How should the CFO manage investor confidence during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications may affect investor confidence and market perception. Financial leadership in communications is essential.</strong>',
    options: ['Let marketing handle all investor communications', 'Provide active financial leadership in crisis communications to maintain investor confidence', 'Avoid investor communications during crisis', 'Only communicate positive financial news'],
    correct_answer: 1,
    explanation: 'Active financial leadership in communications maintains investor confidence during crisis.',
    hints: ['Think about financial leadership role', 'Consider investor confidence']
  },
  {
    role: 'CFO',
    risk_card: 'employment',
    question: 'What financial metrics should track employee support program effectiveness?',
    scenario: '<strong style="font-size: 1.25em">Employee support programs require financial tracking to ensure effectiveness and proper resource allocation.</strong>',
    options: ['Only track total program costs', 'Implement comprehensive metrics including cost per employee, utilization rates, and effectiveness measures', 'Focus only on cost savings', 'Track metrics only if problems arise'],
    correct_answer: 1,
    explanation: 'Comprehensive metrics ensure effective resource allocation and program optimization.',
    hints: ['Think about program effectiveness vs. just costs', 'Consider multiple metric types']
  },
  {
    role: 'CFO',
    risk_card: 'employment',
    question: 'How should the CFO coordinate financial support with HR for employee programs?',
    scenario: '<strong style="font-size: 1.25em">Employee support programs require coordination between financial and HR departments for effective implementation.</strong>',
    options: ['Handle financial aspects independently', 'Establish integrated coordination between CFO and HR for comprehensive employee support programs', 'Let HR handle all aspects', 'Focus coordination only on major programs'],
    correct_answer: 1,
    explanation: 'Integrated coordination ensures comprehensive and effective employee support.',
    hints: ['Think about integrated vs. independent approaches', 'Consider comprehensive support']
  },
  {
    role: 'CFO',
    risk_card: 'financial',
    question: 'What financial modeling should support recovery planning?',
    scenario: '<strong style="font-size: 1.25em">Financial recovery requires modeling of various scenarios and recovery timelines to guide decision-making.</strong>',
    options: ['Use simple cost projections', 'Develop comprehensive financial modeling including multiple recovery scenarios and sensitivity analysis', 'Focus modeling only on best-case scenarios', 'Wait for actual recovery before modeling'],
    correct_answer: 1,
    explanation: 'Comprehensive modeling enables informed decision-making across multiple scenarios.',
    hints: ['Think about scenario planning', 'Consider comprehensive vs. simple modeling']
  },
  {
    role: 'CFO',
    risk_card: 'ransom',
    question: 'How should the CFO evaluate the business continuity financial impact of ransom decisions?',
    scenario: '<strong style="font-size: 1.25em">Ransom decisions affect business continuity and long-term financial performance beyond immediate payment considerations.</strong>',
    options: ['Focus only on immediate ransom costs', 'Conduct comprehensive evaluation of business continuity financial impacts including operational, reputational, and strategic costs', 'Consider only direct financial losses', 'Evaluate impacts only after decisions are made'],
    correct_answer: 1,
    explanation: 'Comprehensive evaluation ensures all financial impacts are considered in decision-making.',
    hints: ['Think about comprehensive vs. immediate costs', 'Consider long-term business impact']
  },
  {
    role: 'CFO',
    risk_card: 'ransom',
    question: 'What financial governance should oversee ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Ransom payment decisions require appropriate financial governance to ensure proper authorization and oversight.</strong>',
    options: ['CFO can make decisions independently', 'Implement comprehensive financial governance including board approval, audit trail, and compliance verification', 'Delegate decisions to legal department', 'Focus governance only on large payment amounts'],
    correct_answer: 1,
    explanation: 'Comprehensive governance ensures proper oversight and compliance for ransom decisions.',
    hints: ['Think about governance requirements', 'Consider oversight and compliance']
  },
  {
    role: 'CFO',
    risk_card: 'strategic',
    question: 'How should the CFO measure return on investment for strategic resilience investments?',
    scenario: '<strong style="font-size: 1.25em">Strategic resilience investments require ROI measurement to justify costs and guide future investment decisions.</strong>',
    options: ['Use traditional ROI calculations only', 'Develop specialized ROI measurement for resilience investments including risk reduction value and intangible benefits', 'Focus only on cost avoidance', 'Measure ROI only for successful investments'],
    correct_answer: 1,
    explanation: 'Specialized ROI measurement captures the full value of resilience investments.',
    hints: ['Think about traditional vs. specialized ROI', 'Consider intangible benefits']
  },
  {
    role: 'CFO',
    risk_card: 'strategic',
    question: 'What financial benchmarking should guide strategic resilience planning?',
    scenario: '<strong style="font-size: 1.25em">Strategic resilience planning benefits from financial benchmarking against industry standards and best practices.</strong>',
    options: ['Use internal financial data only', 'Implement comprehensive financial benchmarking including industry standards, peer comparisons, and best practice analysis', 'Focus benchmarking only on cost metrics', 'Benchmark only after implementation'],
    correct_answer: 1,
    explanation: 'Comprehensive benchmarking guides effective strategic resilience planning.',
    hints: ['Think about external vs. internal benchmarking', 'Consider comprehensive analysis']
  },

  // Governance and Compliance missing questions  
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'How should governance frameworks be adapted for crisis communication oversight?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications require governance oversight to ensure consistency with company policies and regulatory requirements.</strong>',
    options: ['Use normal communication governance', 'Adapt governance frameworks specifically for crisis communication oversight including expedited approval and compliance verification', 'Suspend governance during crisis', 'Focus governance only on external communications'],
    correct_answer: 1,
    explanation: 'Adapted governance ensures effective oversight while enabling rapid crisis response.',
    hints: ['Think about crisis-specific governance needs', 'Consider expedited vs. normal processes']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'crisis',
    question: 'What compliance monitoring should be enhanced during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">Crisis communications may involve regulatory requirements that need enhanced monitoring to ensure compliance.</strong>',
    options: ['Maintain standard compliance monitoring', 'Implement enhanced compliance monitoring specifically for crisis communications including real-time review and regulatory consultation', 'Reduce monitoring to focus on crisis response', 'Monitor compliance only for major communications'],
    correct_answer: 1,
    explanation: 'Enhanced monitoring ensures regulatory compliance during crisis communications.',
    hints: ['Think about crisis-specific compliance needs', 'Consider real-time vs. standard monitoring']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'regulatory',
    question: 'How should governance policies be updated to address regulatory notification requirements?',
    scenario: '<strong style="font-size: 1.25em">Regulatory notification requirements may necessitate updates to governance policies to ensure comprehensive compliance.</strong>',
    options: ['Maintain existing governance policies', 'Update governance policies specifically to address regulatory notification requirements including timelines, responsibilities, and documentation', 'Focus policy updates only on major regulatory requirements', 'Update policies only after regulatory guidance'],
    correct_answer: 1,
    explanation: 'Updated governance policies ensure comprehensive regulatory notification compliance.',
    hints: ['Think about specific vs. general policy updates', 'Consider comprehensive compliance']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'regulatory',
    question: 'What compliance audit procedures should be enhanced for regulatory notifications?',
    scenario: '<strong style="font-size: 1.25em">Regulatory notifications require enhanced audit procedures to ensure accuracy and compliance with regulatory requirements.</strong>',
    options: ['Use standard audit procedures', 'Implement enhanced compliance audit procedures specifically for regulatory notifications including documentation review and timeline verification', 'Focus audits only on completed notifications', 'Audit procedures only if compliance issues arise'],
    correct_answer: 1,
    explanation: 'Enhanced audit procedures ensure accurate and compliant regulatory notifications.',
    hints: ['Think about notification-specific audit needs', 'Consider proactive vs. reactive auditing']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'strategic',
    question: 'How should governance frameworks evolve to support strategic resilience planning?',
    scenario: '<strong style="font-size: 1.25em">Strategic resilience planning requires governance frameworks that support long-term risk management and decision-making.</strong>',
    options: ['Maintain existing governance frameworks', 'Evolve governance frameworks to specifically support strategic resilience including risk committee oversight and strategic planning integration', 'Focus governance only on operational resilience', 'Develop governance only for major strategic decisions'],
    correct_answer: 1,
    explanation: 'Evolved governance frameworks provide appropriate oversight for strategic resilience planning.',
    hints: ['Think about strategic vs. operational governance', 'Consider long-term risk management']
  },
  {
    role: 'Governance and Compliance',
    risk_card: 'strategic',
    question: 'What compliance framework should guide strategic resilience investments?',
    scenario: '<strong style="font-size: 1.25em">Strategic resilience investments must comply with various regulatory and governance requirements while achieving resilience objectives.</strong>',
    options: ['Apply standard investment compliance', 'Develop specialized compliance framework for strategic resilience investments including regulatory alignment and governance integration', 'Focus compliance only on major investments', 'Address compliance only after investment decisions'],
    correct_answer: 1,
    explanation: 'Specialized compliance frameworks ensure resilience investments meet all requirements.',
    hints: ['Think about specialized vs. standard compliance', 'Consider regulatory alignment']
  },

  // Continue with other roles...
  // IT System missing questions
  {
    role: 'IT System',
    risk_card: 'ransom',
    question: 'What technical alternatives to ransom payment should IT System evaluate?',
    scenario: '<strong style="font-size: 1.25em">Before considering ransom payment, IT should evaluate all technical alternatives for resolving the deepfake threat.</strong>',
    options: ['Focus primarily on ransom payment options', 'Comprehensively evaluate technical alternatives including detection tools, content blocking, and alternative recovery methods', 'Consider only immediate technical fixes', 'Evaluate alternatives only if ransom payment fails'],
    correct_answer: 1,
    explanation: 'Comprehensive evaluation of technical alternatives may provide solutions without ransom payment.',
    hints: ['Think about alternatives to payment', 'Consider comprehensive technical options']
  },
  {
    role: 'IT System',
    risk_card: 'ransom',
    question: 'How should IT systems be hardened following ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Ransom scenarios highlight vulnerabilities that need to be addressed through system hardening to prevent future incidents.</strong>',
    options: ['Focus hardening only on compromised systems', 'Implement comprehensive system hardening including vulnerability assessment, security controls, and monitoring enhancements', 'Apply standard hardening procedures', 'Address hardening only for critical systems'],
    correct_answer: 1,
    explanation: 'Comprehensive hardening addresses vulnerabilities and strengthens overall security posture.',
    hints: ['Think about comprehensive vs. targeted hardening', 'Consider prevention focus']
  },
  {
    role: 'IT System',
    risk_card: 'regulatory',
    question: 'What technical compliance monitoring should support regulatory notifications?',
    scenario: '<strong style="font-size: 1.25em">Regulatory notifications may require technical evidence and monitoring data to support compliance reporting.</strong>',
    options: ['Provide basic system logs only', 'Implement comprehensive technical compliance monitoring including detailed logging, evidence collection, and reporting automation', 'Focus monitoring only on critical systems', 'Provide monitoring data only when requested'],
    correct_answer: 1,
    explanation: 'Comprehensive monitoring provides necessary technical evidence for regulatory compliance.',
    hints: ['Think about evidence and compliance support', 'Consider comprehensive vs. basic monitoring']
  },
  {
    role: 'IT System',
    risk_card: 'regulatory',
    question: 'How should IT documentation be enhanced for regulatory compliance?',
    scenario: '<strong style="font-size: 1.25em">Regulatory compliance requires comprehensive IT documentation including system configurations, security controls, and incident response procedures.</strong>',
    options: ['Maintain standard IT documentation', 'Enhance IT documentation specifically for regulatory compliance including detailed configurations, procedures, and compliance mapping', 'Focus documentation only on compromised systems', 'Update documentation only when required'],
    correct_answer: 1,
    explanation: 'Enhanced documentation supports regulatory compliance and demonstrates due diligence.',
    hints: ['Think about compliance-specific documentation needs', 'Consider comprehensive vs. standard documentation']
  },
  {
    role: 'IT System',
    risk_card: 'strategic',
    question: 'What IT architecture changes should support strategic resilience?',
    scenario: '<strong style="font-size: 1.25em">Strategic resilience requires IT architecture that can adapt to evolving threats and support business continuity.</strong>',
    options: ['Maintain existing IT architecture', 'Implement strategic IT architecture changes including redundancy, scalability, and security integration', 'Focus changes only on security systems', 'Address architecture only for major systems'],
    correct_answer: 1,
    explanation: 'Strategic architecture changes provide foundation for long-term resilience.',
    hints: ['Think about strategic vs. tactical changes', 'Consider comprehensive architecture']
  },
  {
    role: 'IT System',
    risk_card: 'strategic',
    question: 'How should IT governance evolve to support strategic resilience planning?',
    scenario: '<strong style="font-size: 1.25em">Strategic resilience planning requires IT governance that aligns technology decisions with business resilience objectives.</strong>',
    options: ['Use existing IT governance processes', 'Evolve IT governance to specifically support strategic resilience including risk-based decision making and business alignment', 'Focus governance only on major IT decisions', 'Address governance evolution only when problems arise'],
    correct_answer: 1,
    explanation: 'Evolved IT governance ensures technology decisions support strategic resilience.',
    hints: ['Think about strategic vs. operational governance', 'Consider business alignment']
  }
];

console.log('Starting to add missing questions...');
console.log(`Planning to insert ${missingQuestions.length} missing questions`);

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
    
    missingQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${missingQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
        
        if (insertedCount === missingQuestions.length) {
          insertStmt.finalize(() => {
            console.log(`Missing questions addition complete. Inserted ${insertedCount} questions.`);
            db.close();
          });
        }
      });
    });
  });
}); 