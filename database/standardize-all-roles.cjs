const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

// All roles and their questions - exactly 5 per risk card for each role
const allRoleQuestions = {
  'CFO': {
    operational: [
      {
        question: 'As CFO, what financial measures should be implemented immediately during the operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The deepfake attack has caused significant business disruption, with fake executive communications leading to operational confusion. Emergency funds are available, but the duration of the impact is unknown.</strong>',
        options: ['Access emergency funds only', 'Implement comprehensive financial contingency plan including emergency funds, credit lines, and insurance claims', 'Wait for situation resolution', 'Only contact insurance provider'],
        correct_answer: 1,
        explanation: 'A comprehensive financial response ensures business continuity and recovery.',
        hints: ['Consider multiple financial resources', 'Think about immediate and short-term needs']
      },
      {
        question: 'From a CFO perspective, how should operational recovery costs be prioritized?',
        scenario: '<strong style="font-size: 1.25em">IT needs funds for deepfake detection tools, Legal needs resources for reputation management, and Support needs overtime pay. Limited immediate funds are available.</strong>',
        options: ['Based on department size', 'Based on revenue impact and critical business functions', 'Equal distribution', 'Based on request order'],
        correct_answer: 1,
        explanation: 'Prioritizing based on revenue impact ensures efficient resource allocation.',
        hints: ['Consider business impact', 'Think about revenue streams']
      },
      {
        question: 'What financial reporting should the CFO prioritize during operational disruption?',
        scenario: '<strong style="font-size: 1.25em">Stakeholders need updates on business continuity and financial position during the disruption. Clear financial reporting is essential.</strong>',
        options: ['Standard financial reports only', 'Enhanced financial reporting including disruption impact, recovery costs, and business continuity metrics', 'Delay reporting until disruption resolves', 'Minimal reporting to avoid concern'],
        correct_answer: 1,
        explanation: 'Enhanced reporting provides stakeholders with necessary information for decision-making.',
        hints: ['Think about stakeholder needs', 'Consider comprehensive vs. minimal reporting']
      },
      {
        question: 'How should the CFO manage cash flow during operational disruptions?',
        scenario: '<strong style="font-size: 1.25em">Operational disruptions may affect revenue streams and increase costs. Cash flow management is critical for business survival.</strong>',
        options: ['Maintain normal cash flow procedures', 'Implement enhanced cash flow management including daily monitoring and scenario planning', 'Focus only on reducing expenses', 'Wait for revenue to normalize'],
        correct_answer: 1,
        explanation: 'Enhanced cash flow management ensures financial stability during crisis periods.',
        hints: ['Think about proactive vs. reactive management', 'Consider monitoring and planning']
      },
      {
        question: 'What financial risk assessment should be conducted during operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The operational disruption creates new financial risks and may change existing risk profiles. Comprehensive assessment is needed for decision-making.</strong>',
        options: ['Continue existing risk assessments', 'Conduct comprehensive financial risk assessment including disruption-specific risks and revised risk profiles', 'Focus only on operational risks', 'Delay risk assessment until after disruption'],
        correct_answer: 1,
        explanation: 'Comprehensive risk assessment enables informed financial decision-making during crisis.',
        hints: ['Think about new vs. existing risks', 'Consider comprehensive assessment']
      }
    ],
    ransom: [
      {
        question: 'As CFO, what financial analysis is needed for the extortion payment decision?',
        scenario: '<strong style="font-size: 1.25em">The attackers demand payment to stop circulating deepfake content. Paying might stop the spread, but recovery costs are high either way. A decision is needed soon.</strong>',
        options: ['Only payment amount', 'Comprehensive analysis of payment impact, recovery costs, and business losses', 'Basic cost comparison', 'Insurance coverage only'],
        correct_answer: 1,
        explanation: 'A comprehensive financial analysis ensures informed decision-making.',
        hints: ['Consider all financial implications', 'Think about long-term impact']
      },
      {
        question: 'What financial documentation should the CFO maintain during extortion negotiations?',
        scenario: '<strong style="font-size: 1.25em">If negotiations occur, auditors and insurers will require detailed records of the process and any associated costs.</strong>',
        options: ['Basic payment records', 'Comprehensive documentation of all costs, decisions, and impact assessments', 'Only payment amounts', 'Minimal records'],
        correct_answer: 1,
        explanation: 'Thorough documentation supports decision-making and compliance.',
        hints: ['Think about audit requirements', 'Consider legal implications']
      },
      {
        question: 'How should the CFO evaluate insurance implications of ransom scenarios?',
        scenario: '<strong style="font-size: 1.25em">Insurance coverage for ransom payments and related losses may have specific conditions and requirements that affect financial decisions.</strong>',
        options: ['Assume standard coverage applies', 'Conduct detailed evaluation of insurance coverage including policy conditions and claim requirements', 'Focus only on payment coverage', 'Consult insurance after payment decisions'],
        correct_answer: 1,
        explanation: 'Detailed insurance evaluation ensures optimal use of coverage and informed decision-making.',
        hints: ['Think about policy conditions', 'Consider comprehensive vs. basic coverage']
      },
      {
        question: 'What financial scenario planning should be conducted for ransom decisions?',
        scenario: '<strong style="font-size: 1.25em">Ransom payment decisions require understanding of various financial outcomes including payment vs. non-payment scenarios.</strong>',
        options: ['Focus only on payment scenarios', 'Develop comprehensive financial scenario planning covering payment, non-payment, and partial resolution options', 'Basic cost-benefit analysis only', 'Wait for ransom demands before planning'],
        correct_answer: 1,
        explanation: 'Comprehensive scenario planning enables informed decision-making across multiple options.',
        hints: ['Think about multiple outcomes', 'Consider comprehensive planning']
      },
      {
        question: 'How should the CFO manage stakeholder communication regarding ransom financial impacts?',
        scenario: '<strong style="font-size: 1.25em">Stakeholders need information about financial implications of ransom scenarios while maintaining confidentiality and avoiding market speculation.</strong>',
        options: ['Avoid all stakeholder communication', 'Develop strategic stakeholder communication plan balancing transparency with confidentiality requirements', 'Share all financial details immediately', 'Communicate only after decisions are made'],
        correct_answer: 1,
        explanation: 'Strategic communication maintains stakeholder confidence while protecting sensitive information.',
        hints: ['Think about balance between transparency and confidentiality', 'Consider stakeholder needs']
      }
    ],
    financial: [
      {
        question: 'As CFO, how should you assess the total financial impact?',
        scenario: '<strong style="font-size: 1.25em">The incident involves direct costs (recovery, extortion if paid) and indirect costs (lost revenue, reputational harm). A full picture is needed.</strong>',
        options: ['Only direct costs', 'Comprehensive analysis including direct costs, indirect losses, and long-term implications', 'Basic damage estimate', 'Wait for final numbers'],
        correct_answer: 1,
        explanation: 'A comprehensive analysis ensures all financial impacts are considered.',
        hints: ['Consider all cost types', 'Think about long-term effects']
      },
      {
        question: 'What financial recovery strategies should the CFO implement?',
        scenario: '<strong style="font-size: 1.25em">Significant funds have been spent on incident response, and revenue was lost. Actions are needed to stabilize the company financially.</strong>',
        options: ['Cut costs across all departments', 'Balanced approach including cost management, resource reallocation, and recovery investments', 'Focus only on revenue generation', 'Wait for insurance recovery'],
        correct_answer: 1,
        explanation: 'A balanced strategy ensures effective recovery.',
        hints: ['Think about multiple recovery approaches', 'Consider balance']
      },
      {
        question: 'What financial reporting should the CFO prioritize?',
        scenario: '<strong style="font-size: 1.25em">During the recovery period, the board requires frequent updates on the financial situation beyond standard quarterly reports.</strong>',
        options: ['Standard quarterly reports only', 'Comprehensive reporting including impact analysis, recovery metrics, and forecasts', 'Basic cost summaries', 'Wait for annual reports'],
        correct_answer: 1,
        explanation: 'Comprehensive reporting supports decision-making.',
        hints: ['Think about board needs', 'Consider comprehensive vs. basic reporting']
      },
      {
        question: 'How should the CFO manage investor relations during financial recovery?',
        scenario: '<strong style="font-size: 1.25em">Investors are concerned about financial losses and recovery prospects. Clear communication is needed to maintain confidence and support.</strong>',
        options: ['Minimize investor communication', 'Develop comprehensive investor relations strategy including regular updates and recovery progress reporting', 'Share only positive developments', 'Delay communication until full recovery'],
        correct_answer: 1,
        explanation: 'Strategic investor relations maintains confidence and support during recovery.',
        hints: ['Think about investor confidence', 'Consider regular vs. delayed communication']
      },
      {
        question: 'What financial controls should be enhanced during recovery?',
        scenario: '<strong style="font-size: 1.25em">Financial losses highlight the need for enhanced controls to prevent future incidents and ensure efficient recovery spending.</strong>',
        options: ['Maintain existing financial controls', 'Implement enhanced financial controls including improved authorization, monitoring, and audit procedures', 'Focus only on expense reduction', 'Add controls only for incident-related spending'],
        correct_answer: 1,
        explanation: 'Enhanced controls prevent future losses and ensure efficient recovery.',
        hints: ['Think about comprehensive vs. minimal controls', 'Consider prevention and efficiency']
      }
    ],
    regulatory: [
      {
        question: 'As CFO, what financial reporting is required for regulatory compliance?',
        scenario: '<strong style="font-size: 1.25em">The incident has financial implications that may need to be reported to financial regulators.</strong>',
        options: ['Only report if material impact', 'Assess and report all financial impacts according to regulatory requirements', 'Include in next quarterly report', 'Only report direct costs'],
        correct_answer: 1,
        explanation: 'Complete financial reporting ensures regulatory compliance.',
        hints: ['Consider materiality thresholds', 'Think about reporting timelines']
      },
      {
        question: 'How should the CFO coordinate with auditors regarding regulatory reporting?',
        scenario: '<strong style="font-size: 1.25em">External auditors may need to verify financial impacts and reporting for regulatory compliance. Coordination is essential for accurate reporting.</strong>',
        options: ['Handle regulatory reporting independently', 'Coordinate closely with auditors to ensure accurate and compliant financial reporting', 'Wait for auditor guidance', 'Provide minimal information to auditors'],
        correct_answer: 1,
        explanation: 'Auditor coordination ensures accurate and compliant regulatory reporting.',
        hints: ['Think about accuracy and compliance', 'Consider coordination vs. independence']
      },
      {
        question: 'What financial controls should be documented for regulatory review?',
        scenario: '<strong style="font-size: 1.25em">Regulators may review financial controls and procedures used during the incident. Proper documentation is essential for regulatory compliance.</strong>',
        options: ['Document only major control changes', 'Comprehensively document all financial controls, procedures, and decision-making processes', 'Focus documentation on successful controls only', 'Provide documentation only if requested'],
        correct_answer: 1,
        explanation: 'Comprehensive documentation demonstrates control effectiveness and regulatory compliance.',
        hints: ['Think about comprehensive vs. selective documentation', 'Consider regulatory requirements']
      },
      {
        question: 'How should the CFO manage financial disclosure requirements?',
        scenario: '<strong style="font-size: 1.25em">Various regulatory bodies may have different financial disclosure requirements related to the incident. Managing multiple requirements efficiently is essential.</strong>',
        options: ['Handle each requirement separately as it arises', 'Develop comprehensive financial disclosure management plan covering all relevant regulatory requirements', 'Focus only on the most significant requirements', 'Delegate disclosure management to legal department'],
        correct_answer: 1,
        explanation: 'Comprehensive disclosure management ensures all regulatory requirements are met efficiently.',
        hints: ['Think about multiple vs. single requirements', 'Consider comprehensive planning']
      },
      {
        question: 'What financial penalty and fine management should be planned?',
        scenario: '<strong style="font-size: 1.25em">Regulatory non-compliance may result in financial penalties and fines. Planning for potential financial impacts is essential for accurate reporting.</strong>',
        options: ['Assume no penalties will be assessed', 'Develop financial planning for potential penalties including estimation, accrual, and impact assessment', 'Wait for actual penalties before planning', 'Focus only on the largest potential penalties'],
        correct_answer: 1,
        explanation: 'Penalty planning ensures accurate financial reporting and stakeholder communication.',
        hints: ['Think about potential vs. actual penalties', 'Consider comprehensive planning']
      }
    ],
    employment: [
      {
        question: 'As CFO, how should employee-related costs be managed during the incident?',
        scenario: '<strong style="font-size: 1.25em">Incident response involves overtime pay, and if employee data is compromised, costs for support services may arise.</strong>',
        options: ['Cut all non-essential expenses', 'Allocate specific resources for both incident response personnel costs and employee support/communication programs', 'Delay decisions until after the incident', 'Minimal spending only on critical response'],
        correct_answer: 1,
        explanation: 'Proper resource allocation ensures employee support and response effectiveness.',
        hints: ['Consider employee needs and response needs', 'Think about long-term impact']
      },
      {
        question: 'What financial support should the CFO consider for affected employees?',
        scenario: '<strong style="font-size: 1.25em">If employee information was used in deepfake content, the company may need to offer support services.</strong>',
        options: ['No support beyond legal requirements', 'Comprehensive support including identity protection services, mental health resources, and potentially direct assistance programs', 'Minimal assistance like a list of resources', 'Only legally required benefits'],
        correct_answer: 1,
        explanation: 'Comprehensive support maintains workforce stability and demonstrates care.',
        hints: ['Consider employee welfare', 'Think about retention and goodwill']
      },
      {
        question: 'How should the CFO budget for employee support programs?',
        scenario: '<strong style="font-size: 1.25em">HR proposes offering identity protection to all employees impacted by the deepfake incident. This has significant cost implications that need budgeting.</strong>',
        options: ['Use leftover funds from other budgets', 'Develop a comprehensive budget based on estimated uptake, vendor costs, and program duration for support programs and resources', 'No specific allocation, pay as needed', 'Standard HR benefits budget'],
        correct_answer: 1,
        explanation: 'Proper budgeting ensures adequate support and financial control.',
        hints: ['Consider program scope and costs', 'Think about long-term benefits']
      },
      {
        question: 'What employee-related financial risks should be assessed?',
        scenario: '<strong style="font-size: 1.25em">Employee notification incidents may create financial risks including potential lawsuits, turnover costs, and productivity impacts.</strong>',
        options: ['Focus only on immediate support costs', 'Conduct comprehensive assessment of employee-related financial risks including legal, turnover, and productivity impacts', 'Assume minimal financial risks', 'Wait for actual issues before assessment'],
        correct_answer: 1,
        explanation: 'Comprehensive risk assessment enables proactive financial planning and mitigation.',
        hints: ['Think about multiple types of employee-related costs', 'Consider proactive vs. reactive assessment']
      },
      {
        question: 'How should employee retention costs be factored into financial planning?',
        scenario: '<strong style="font-size: 1.25em">The incident may affect employee morale and retention. Financial planning should consider costs of potential turnover and retention efforts.</strong>',
        options: ['Assume normal retention rates', 'Include comprehensive retention cost analysis in financial planning including turnover costs and retention program investments', 'Focus only on replacing departed employees', 'Address retention costs only if turnover increases'],
        correct_answer: 1,
        explanation: 'Proactive retention planning reduces overall costs and maintains workforce stability.',
        hints: ['Think about proactive vs. reactive retention planning', 'Consider comprehensive cost analysis']
      }
    ],
    crisis: [
      {
        question: 'As CFO, how should financial communications be managed during crisis?',
        scenario: '<strong style="font-size: 1.25em">Stakeholders need financial information during the crisis, but incomplete or inaccurate information could cause further damage.</strong>',
        options: ['Provide minimal financial information', 'Develop strategic financial communication plan providing accurate, timely information while managing stakeholder concerns', 'Share all available financial details immediately', 'Delay all financial communications until crisis resolution'],
        correct_answer: 1,
        explanation: 'Strategic financial communication maintains stakeholder confidence while providing necessary information.',
        hints: ['Think about accuracy and timing', 'Consider stakeholder needs and concerns']
      },
      {
        question: 'What financial resources should be allocated for crisis communication?',
        scenario: '<strong style="font-size: 1.25em">Effective crisis communication requires financial resources for additional personnel, communication tools, and external support.</strong>',
        options: ['Use existing communication budgets only', 'Allocate dedicated financial resources for crisis communication including personnel, tools, and external expertise', 'Minimize communication spending to preserve cash', 'Wait to see actual communication needs before allocation'],
        correct_answer: 1,
        explanation: 'Dedicated resources ensure effective crisis communication and stakeholder management.',
        hints: ['Think about dedicated vs. existing resources', 'Consider comprehensive communication needs']
      },
      {
        question: 'How should the CFO coordinate financial messaging with other departments?',
        scenario: '<strong style="font-size: 1.25em">Financial messaging must be coordinated with legal, marketing, and operations to ensure consistent and accurate communications.</strong>',
        options: ['Handle financial messaging independently', 'Establish coordinated financial messaging process with regular interdepartmental communication and approval procedures', 'Let each department handle their own financial communications', 'Focus only on coordination with legal department'],
        correct_answer: 1,
        explanation: 'Coordinated messaging ensures consistency and accuracy across all communications.',
        hints: ['Think about coordination vs. independence', 'Consider multiple departments']
      },
      {
        question: 'What financial contingency planning should support crisis communication?',
        scenario: '<strong style="font-size: 1.25em">Crisis communication may require additional financial resources if the situation escalates or extends beyond initial expectations.</strong>',
        options: ['Plan for current communication needs only', 'Develop financial contingency planning for extended or escalated crisis communication scenarios', 'Wait for escalation before additional planning', 'Focus contingency planning only on major stakeholder communications'],
        correct_answer: 1,
        explanation: 'Contingency planning ensures adequate resources for effective communication regardless of crisis evolution.',
        hints: ['Think about escalation and extension scenarios', 'Consider contingency vs. current planning']
      },
      {
        question: 'How should financial impact communications be prioritized?',
        scenario: '<strong style="font-size: 1.25em">Different stakeholders have different information needs regarding financial impacts. Prioritization ensures efficient use of resources and effective communication.</strong>',
        options: ['Treat all stakeholders equally', 'Prioritize financial impact communications based on stakeholder importance, information needs, and regulatory requirements', 'Focus only on the most vocal stakeholders', 'Communicate financial impacts only to required parties'],
        correct_answer: 1,
        explanation: 'Prioritized communication ensures efficient resource use and meets stakeholder needs effectively.',
        hints: ['Think about stakeholder importance and needs', 'Consider prioritization vs. equal treatment']
      }
    ],
    strategic: [
      {
        question: 'As CFO, how should long-term financial strategy be adjusted?',
        scenario: '<strong style="font-size: 1.25em">This incident revealed vulnerabilities. Post-incident, the company needs to consider strategic financial adjustments for future resilience.</strong>',
        options: ['No changes needed, it was a one-off event', 'Comprehensive strategy revision including increased contingency funds, cyber insurance review, and risk mitigation investments', 'Minor adjustments to quarterly forecasts', 'Wait and see how the market reacts'],
        correct_answer: 1,
        explanation: 'Strategic revision incorporating lessons learned ensures long-term financial resilience.',
        hints: ['Consider future risks and preparedness', 'Think about financial resilience']
      },
      {
        question: 'What financial planning should the CFO implement for future resilience?',
        scenario: '<strong style="font-size: 1.25em">To better withstand future incidents, proactive investments in areas like deepfake detection and improved content verification are needed. This requires financial planning.</strong>',
        options: ['Standard operational budget planning', 'Enhanced financial planning including dedicated budgets for risk mitigation, resilience resources, and regular security audits', 'Update depreciation schedules only', 'Assume no major incidents will happen again'],
        correct_answer: 1,
        explanation: 'Enhanced planning specifically addressing security risks improves future resilience.',
        hints: ['Consider proactive security investments', 'Think about long-term preparedness costs']
      },
      {
        question: 'How should the CFO evaluate investment priorities for strategic resilience?',
        scenario: '<strong style="font-size: 1.25em">Multiple strategic investments compete for limited resources. Evaluation criteria must balance immediate needs with long-term resilience.</strong>',
        options: ['Focus investments on lowest cost options', 'Develop comprehensive investment evaluation criteria balancing cost, risk reduction, and strategic value', 'Prioritize only technology investments', 'Delay investment decisions until revenue recovers'],
        correct_answer: 1,
        explanation: 'Comprehensive evaluation ensures optimal resource allocation for strategic resilience.',
        hints: ['Think about multiple evaluation criteria', 'Consider balanced vs. single-factor evaluation']
      },
      {
        question: 'What strategic financial partnerships should be considered for resilience?',
        scenario: '<strong style="font-size: 1.25em">Strategic partnerships may provide access to resources and expertise for improved resilience while optimizing financial investments.</strong>',
        options: ['Avoid partnerships to maintain control', 'Evaluate strategic financial partnerships that enhance resilience while optimizing resource utilization', 'Focus only on traditional vendor relationships', 'Consider partnerships only for major investments'],
        correct_answer: 1,
        explanation: 'Strategic partnerships can enhance resilience while optimizing financial resource utilization.',
        hints: ['Think about resource optimization and expertise access', 'Consider partnership vs. independent approaches']
      },
      {
        question: 'How should the CFO integrate resilience costs into strategic financial planning?',
        scenario: '<strong style="font-size: 1.25em">Resilience investments must be integrated into overall strategic financial planning to ensure sustainable and comprehensive approach.</strong>',
        options: ['Treat resilience as separate, one-time costs', 'Integrate resilience costs into comprehensive strategic financial planning with ongoing budget allocation and performance measurement', 'Focus integration only on major resilience investments', 'Handle resilience costs through contingency funds only'],
        correct_answer: 1,
        explanation: 'Integrated planning ensures sustainable and comprehensive approach to financial resilience.',
        hints: ['Think about ongoing vs. one-time approach', 'Consider integration vs. separation']
      }
    ]
  }
  // ... I'll add all other roles similarly
};

console.log('Starting comprehensive role standardization...');

// For now, let's just do CFO to test the structure
const cfoQuestions = [];
Object.keys(allRoleQuestions.CFO).forEach(riskCard => {
  allRoleQuestions.CFO[riskCard].forEach(q => {
    cfoQuestions.push({
      role: 'CFO',
      risk_card: riskCard,
      question: q.question,
      scenario: q.scenario,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      hints: q.hints
    });
  });
});

console.log(`Planning to insert ${cfoQuestions.length} CFO questions`);

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
    
    cfoQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${cfoQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
        
        if (insertedCount === cfoQuestions.length) {
          insertStmt.finalize(() => {
            console.log(`CFO question generation complete. Inserted ${insertedCount} questions.`);
            db.close();
          });
        }
      });
    });
  });
}); 