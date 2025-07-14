const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'assessment.db'));

const vendorManagerQuestions = [
  // Operational Disruptions (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'As Vendor Manager, how should you coordinate with suppliers during deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Key suppliers are receiving conflicting instructions due to fake communications. Supply chain operations are disrupted and vendor relationships are strained.</strong>',
    options: [
      'Let suppliers figure out authentic communications themselves',
      'Establish verified communication protocols and coordinate directly with key suppliers to restore operational clarity',
      'Suspend all vendor communications until crisis resolves',
      'Rely entirely on existing contract terms'
    ],
    correct_answer: 1,
    explanation: 'Direct coordination with verified protocols helps restore supply chain operations while maintaining vendor relationships.',
    hints: ['Think about supply chain continuity', 'Consider verified communication methods']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'What vendor risk assessment should be conducted during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">The incident may have exposed vendor communications or affected supplier operations. Risk assessment is needed to understand vendor-related vulnerabilities.</strong>',
    options: [
      'Continue normal vendor risk procedures',
      'Conduct enhanced vendor risk assessment focusing on communication security and deepfake vulnerabilities',
      'Assume vendors are not affected by the incident',
      'Wait for vendors to report their own risk assessments'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor risk assessment identifies communication vulnerabilities and prevents future supply chain disruptions.',
    hints: ['Think about vendor-specific vulnerabilities', 'Consider communication security risks']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'How should vendor contracts be evaluated following deepfake operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Current vendor contracts may not address deepfake-related disruptions. Contract terms may need updates for future protection.</strong>',
    options: [
      'Maintain existing contract terms without changes',
      'Review and update vendor contracts to include deepfake-related security requirements and communication protocols',
      'Immediately terminate contracts with affected vendors',
      'Focus only on the largest vendor contracts'
    ],
    correct_answer: 1,
    explanation: 'Contract updates ensure vendors understand security requirements and communication protocols for future incidents.',
    hints: ['Think about future protection through contracts', 'Consider security requirements and protocols']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'What vendor communication verification should be implemented after deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Future vendor communications need verification to prevent similar disruptions. Verification systems must be practical for ongoing vendor relationships.</strong>',
    options: [
      'Rely on normal email and phone communications',
      'Implement multi-factor verification for critical vendor communications with backup confirmation methods',
      'Require all vendor communications to go through legal review',
      'Use only face-to-face meetings for vendor communications'
    ],
    correct_answer: 1,
    explanation: 'Multi-factor verification ensures authentic vendor communications while maintaining practical business relationships.',
    hints: ['Think about practical verification methods', 'Consider critical vs. routine communications']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'operational',
    question: 'How should vendor performance metrics be adjusted during operational disruptions?',
    scenario: '<strong style="font-size: 1.25em">Normal vendor performance metrics may not be appropriate during crisis situations. Adjusted metrics should reflect the exceptional circumstances while maintaining accountability.</strong>',
    options: [
      'Maintain all existing performance metrics unchanged',
      'Adjust performance metrics to reflect crisis conditions while maintaining essential service requirements',
      'Suspend all vendor performance evaluations',
      'Apply stricter performance requirements to ensure reliability'
    ],
    correct_answer: 1,
    explanation: 'Adjusted metrics reflect crisis realities while maintaining vendor accountability for essential services.',
    hints: ['Think about crisis-appropriate expectations', 'Consider essential vs. non-essential services']
  },

  // Ransom Pay (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'ransom',
    question: 'How should Vendor Manager handle vendor communications about ransom payment decisions?',
    scenario: '<strong style="font-size: 1.25em">Key vendors need assurance about business continuity regardless of ransom payment decisions. Vendor confidence affects supply chain stability.</strong>',
    options: [
      'Avoid discussing ransom scenarios with vendors',
      'Communicate with key vendors about business continuity commitment while protecting specific decision details',
      'Share all ransom decision details with vendors',
      'Let vendors learn about decisions through media coverage'
    ],
    correct_answer: 1,
    explanation: 'Vendor communication about continuity commitment maintains supply chain relationships while protecting sensitive decisions.',
    hints: ['Focus on business continuity rather than payment details', 'Think about vendor confidence and relationships']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'ransom',
    question: 'What vendor security requirements should be enhanced following ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">The ransom incident highlights vendor security vulnerabilities. Enhanced security requirements may be needed for vendor relationships.</strong>',
    options: [
      'Maintain existing vendor security standards',
      'Implement enhanced vendor security requirements including deepfake awareness and communication protocols',
      'Immediately terminate relationships with vendors that lack advanced security',
      'Focus security requirements only on IT vendors'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor security requirements strengthen the entire supply chain against future deepfake threats.',
    hints: ['Think about strengthening the entire supply chain', 'Consider deepfake-specific security requirements']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'ransom',
    question: 'How should vendor due diligence processes be updated after ransom incidents?',
    scenario: '<strong style="font-size: 1.25em">Future vendor selection must consider deepfake resilience and security capabilities. Due diligence processes need updates to assess these factors.</strong>',
    options: [
      'Continue existing due diligence procedures without changes',
      'Update vendor due diligence to include deepfake security assessment and communication verification capabilities',
      'Focus due diligence only on financial stability',
      'Require all vendors to have identical security measures'
    ],
    correct_answer: 1,
    explanation: 'Updated due diligence ensures new vendors have appropriate security capabilities for deepfake threat environment.',
    hints: ['Think about evaluating vendor security capabilities', 'Consider deepfake-specific assessment criteria']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'ransom',
    question: 'How should vendor insurance and liability considerations be addressed in ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Ransom incidents may trigger vendor insurance claims and liability questions. Clear understanding of vendor insurance coverage and liability allocation is essential.</strong>',
    options: [
      'Assume existing vendor insurance is adequate',
      'Review vendor insurance coverage and liability allocation specific to deepfake and ransom scenarios',
      'Focus only on company insurance without considering vendor coverage',
      'Require all vendors to purchase identical insurance coverage'
    ],
    correct_answer: 1,
    explanation: 'Vendor insurance review ensures appropriate coverage and liability allocation for deepfake-related ransom scenarios.',
    hints: ['Think about comprehensive insurance coverage', 'Consider vendor vs. company liability allocation']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'ransom',
    question: 'What vendor business continuity planning should be implemented for ransom scenarios?',
    scenario: '<strong style="font-size: 1.25em">Ransom incidents may disrupt vendor operations and affect supply chain continuity. Business continuity planning should address these dependencies.</strong>',
    options: [
      'Assume vendors will maintain normal operations',
      'Develop comprehensive vendor business continuity plans that address ransom scenario impacts and alternative supply options',
      'Focus only on internal business continuity',
      'Require vendors to handle their own continuity planning'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive vendor continuity planning ensures supply chain resilience during ransom incidents.',
    hints: ['Think about supply chain dependencies', 'Consider alternative vendor options']
  },

  // Financial Loss (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'How should Vendor Manager address vendor payment and contract obligations during financial constraints?',
    scenario: '<strong style="font-size: 1.25em">Financial losses may affect vendor payment schedules and contract terms. Vendor relationship management must balance financial pressure with supply chain stability.</strong>',
    options: [
      'Immediately reduce all vendor payments to preserve cash',
      'Prioritize critical vendor payments while negotiating adjusted terms with other suppliers based on business impact',
      'Maintain all vendor payments regardless of financial constraints',
      'Delay all vendor communications about financial changes'
    ],
    correct_answer: 1,
    explanation: 'Strategic vendor payment prioritization maintains critical supply chains while managing financial constraints effectively.',
    hints: ['Think about critical vs. non-critical vendors', 'Consider negotiation and communication']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'What vendor consolidation strategies should be considered during financial recovery?',
    scenario: '<strong style="font-size: 1.25em">Financial constraints may require vendor consolidation to reduce costs. Strategy must balance cost savings with supply chain risk and vendor relationship value.</strong>',
    options: [
      'Eliminate all non-essential vendors immediately',
      'Conduct strategic vendor consolidation based on cost, risk, and relationship value analysis',
      'Maintain all existing vendor relationships regardless of cost',
      'Consolidate vendors based solely on lowest price'
    ],
    correct_answer: 1,
    explanation: 'Strategic consolidation balances cost reduction with supply chain resilience and relationship value preservation.',
    hints: ['Think about balancing cost savings with supply chain risk', 'Consider comprehensive evaluation criteria']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'How should vendor contract renegotiations be approached during financial recovery?',
    scenario: '<strong style="font-size: 1.25em">Financial pressure requires vendor contract renegotiations. Approach must achieve cost savings while maintaining vendor relationships and service quality.</strong>',
    options: [
      'Demand immediate price reductions from all vendors',
      'Develop strategic renegotiation approach that achieves cost savings while preserving key vendor relationships and service quality',
      'Avoid renegotiations to preserve vendor relationships',
      'Focus renegotiations only on the smallest vendors'
    ],
    correct_answer: 1,
    explanation: 'Strategic renegotiation achieves necessary cost savings while maintaining vendor partnerships essential for business continuity.',
    hints: ['Think about win-win negotiations', 'Consider long-term relationship value']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'What vendor performance metrics should be prioritized during financial constraints?',
    scenario: '<strong style="font-size: 1.25em">Limited resources require focused vendor performance monitoring. Metrics must identify cost optimization opportunities while ensuring service quality.</strong>',
    options: [
      'Monitor only basic contract compliance metrics',
      'Focus on comprehensive cost-effectiveness metrics including value delivery, efficiency, and relationship ROI',
      'Eliminate vendor performance monitoring to save resources',
      'Track only the easiest-to-measure financial metrics'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive cost-effectiveness metrics enable optimization decisions that balance cost savings with service quality and relationship value.',
    hints: ['Think about comprehensive value assessment', 'Consider cost-effectiveness vs. simple cost metrics']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'financial',
    question: 'How should vendor payment terms be restructured during financial recovery?',
    scenario: '<strong style="font-size: 1.25em">Financial recovery requires optimized cash flow management. Vendor payment terms may need restructuring to balance cash flow needs with vendor relationships.</strong>',
    options: [
      'Extend all payment terms to maximum allowed',
      'Negotiate strategic payment term adjustments based on vendor importance, cash flow impact, and relationship value',
      'Maintain all existing payment terms to avoid vendor issues',
      'Implement uniform payment term changes for all vendors'
    ],
    correct_answer: 1,
    explanation: 'Strategic payment term adjustments optimize cash flow while maintaining critical vendor relationships.',
    hints: ['Think about cash flow optimization', 'Consider vendor relationship importance']
  },

  // Regulatory Notification (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'regulatory',
    question: 'What vendor-related regulatory compliance issues must be addressed after deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Vendor relationships may involve regulatory compliance requirements that were affected by the deepfake incident. Assessment and remediation may be necessary.</strong>',
    options: [
      'Assume vendor compliance is unaffected by the incident',
      'Assess vendor-related regulatory compliance impacts and implement necessary remediation measures',
      'Focus only on direct company regulatory compliance',
      'Let vendors handle their own regulatory compliance issues'
    ],
    correct_answer: 1,
    explanation: 'Vendor compliance assessment ensures comprehensive regulatory coverage and prevents cascading compliance failures.',
    hints: ['Think about vendor compliance as part of overall compliance', 'Consider cascading regulatory risks']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'regulatory',
    question: 'How should vendor contracts address regulatory requirements following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Enhanced regulatory requirements may apply to vendor relationships. Contract terms may need updates to ensure vendor compliance with new obligations.</strong>',
    options: [
      'Leave existing vendor contracts unchanged',
      'Update vendor contracts to include enhanced regulatory compliance requirements and reporting obligations',
      'Terminate contracts with vendors that cannot meet enhanced requirements',
      'Apply regulatory requirements only to new vendor contracts'
    ],
    correct_answer: 1,
    explanation: 'Contract updates ensure vendors understand and comply with enhanced regulatory requirements arising from deepfake incidents.',
    hints: ['Think about ensuring vendor compliance through contracts', 'Consider enhanced vs. existing requirements']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'regulatory',
    question: 'What vendor reporting and documentation requirements should be implemented for regulatory compliance?',
    scenario: '<strong style="font-size: 1.25em">Regulatory compliance may require enhanced vendor reporting and documentation. Systems must be practical while ensuring comprehensive regulatory coverage.</strong>',
    options: [
      'Maintain existing vendor reporting requirements',
      'Implement enhanced vendor reporting and documentation requirements that support comprehensive regulatory compliance',
      'Require vendors to handle all regulatory reporting independently',
      'Focus reporting requirements only on the largest vendors'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor reporting ensures comprehensive regulatory compliance coverage while providing necessary documentation for oversight.',
    hints: ['Think about comprehensive regulatory coverage', 'Consider practical vs. comprehensive reporting']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'regulatory',
    question: 'How should vendor audit procedures be enhanced for regulatory compliance following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Regulatory requirements may necessitate enhanced vendor audit procedures. Audit programs must ensure vendor compliance while being practical to implement.</strong>',
    options: [
      'Continue existing vendor audit procedures',
      'Implement enhanced vendor audit procedures that specifically address deepfake risks and regulatory compliance requirements',
      'Eliminate vendor audits to reduce regulatory complexity',
      'Focus enhanced audits only on technology vendors'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor audits ensure regulatory compliance while addressing specific deepfake-related risks.',
    hints: ['Think about comprehensive audit coverage', 'Consider deepfake-specific risks']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'regulatory',
    question: 'What vendor regulatory training and awareness programs should be implemented?',
    scenario: '<strong style="font-size: 1.25em">Vendors may need training on regulatory requirements related to deepfake incidents. Training programs must be effective while being practical for vendor implementation.</strong>',
    options: [
      'Assume vendors understand regulatory requirements',
      'Develop comprehensive vendor regulatory training programs that address deepfake-related compliance requirements',
      'Require vendors to obtain their own regulatory training',
      'Focus training only on vendors with direct regulatory exposure'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive vendor training ensures regulatory compliance awareness across the supply chain.',
    hints: ['Think about supply chain compliance', 'Consider comprehensive vs. targeted training']
  },

  // Employee Notification (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'employment',
    question: 'How should Vendor Manager coordinate with vendors regarding employee notification requirements?',
    scenario: '<strong style="font-size: 1.25em">Vendor employees may have been affected by the deepfake incident. Coordination is needed to ensure appropriate notifications and support.</strong>',
    options: [
      'Let vendors handle their own employee notifications',
      'Coordinate with vendors to ensure appropriate employee notifications while providing necessary information and support',
      'Require vendors to use identical employee notification processes',
      'Focus only on notifications for vendor employees working on-site'
    ],
    correct_answer: 1,
    explanation: 'Vendor coordination ensures comprehensive employee notification coverage while providing necessary support and information sharing.',
    hints: ['Think about comprehensive employee coverage including vendor employees', 'Consider coordination vs. independent handling']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'employment',
    question: 'What vendor employee training requirements should be implemented after deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Vendor employees may need deepfake awareness training to prevent future incidents. Training requirements must be practical and effective.</strong>',
    options: [
      'Assume vendor employees do not need specialized training',
      'Implement vendor employee training requirements that ensure deepfake awareness and appropriate response procedures',
      'Require all vendor employees to complete identical training to company employees',
      'Focus training requirements only on vendor employees with system access'
    ],
    correct_answer: 1,
    explanation: 'Vendor employee training ensures comprehensive deepfake awareness across the extended workforce and supply chain.',
    hints: ['Think about extending training to the broader workforce', 'Consider practical vs. comprehensive training requirements']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'employment',
    question: 'How should vendor employee access and verification be managed after deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Vendor employee access to systems and information may need enhanced verification. Management must balance security with operational efficiency.</strong>',
    options: [
      'Maintain existing vendor employee access procedures',
      'Implement enhanced verification procedures for vendor employee access while maintaining operational efficiency',
      'Immediately revoke all vendor employee access',
      'Apply enhanced verification only to vendor employees with administrative access'
    ],
    correct_answer: 1,
    explanation: 'Enhanced vendor employee verification strengthens security while maintaining necessary operational access and efficiency.',
    hints: ['Think about balancing security with operational needs', 'Consider enhanced vs. existing verification procedures']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'employment',
    question: 'What vendor employee background check and security clearance requirements should be updated?',
    scenario: '<strong style="font-size: 1.25em">Deepfake incidents may require enhanced background check and security clearance requirements for vendor employees with access to sensitive systems or information.</strong>',
    options: [
      'Maintain existing background check requirements',
      'Implement enhanced background check and security clearance requirements for vendor employees based on access level and risk assessment',
      'Require identical background checks for all vendor employees',
      'Focus enhanced requirements only on vendor management personnel'
    ],
    correct_answer: 1,
    explanation: 'Risk-based background check enhancement ensures appropriate security while maintaining practical vendor relationship management.',
    hints: ['Think about risk-based security requirements', 'Consider access level and practical implementation']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'employment',
    question: 'How should vendor employee incident response training be coordinated with employee notification requirements?',
    scenario: '<strong style="font-size: 1.25em">Vendor employees may need incident response training that coordinates with employee notification procedures. Training must be practical while ensuring comprehensive coverage.</strong>',
    options: [
      'Assume vendor employees do not need incident response training',
      'Coordinate comprehensive incident response training for vendor employees that aligns with employee notification requirements',
      'Require vendor employees to complete identical training to company employees',
      'Focus training only on vendor employees with direct customer contact'
    ],
    correct_answer: 1,
    explanation: 'Coordinated incident response training ensures vendor employees understand their role in employee notification procedures.',
    hints: ['Think about coordinated response procedures', 'Consider vendor employee roles in notifications']
  },

  // Crisis Communication (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'How should Vendor Manager coordinate crisis communications with key suppliers during deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Key suppliers need timely, accurate information about the incident and response. Coordination ensures supply chain stability and vendor confidence.</strong>',
    options: [
      'Let vendors learn about the crisis through media coverage',
      'Coordinate proactive crisis communication with key vendors to ensure accurate information and maintain supply chain stability',
      'Provide identical crisis information to all vendors regardless of relationship importance',
      'Delay vendor communications until crisis resolution'
    ],
    correct_answer: 1,
    explanation: 'Proactive vendor crisis communication maintains supply chain relationships and ensures accurate information flow.',
    hints: ['Think about maintaining vendor relationships during crisis', 'Consider proactive vs. reactive communication']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'What vendor communication channels should be prioritized during crisis communications?',
    scenario: '<strong style="font-size: 1.25em">Normal vendor communication channels may be compromised or untrustworthy. Priority channels must be secure and verified.</strong>',
    options: [
      'Continue using all existing vendor communication channels',
      'Prioritize secure, verified communication channels while establishing backup methods for critical vendor communications',
      'Suspend all electronic communications with vendors',
      'Rely entirely on third-party communication services'
    ],
    correct_answer: 1,
    explanation: 'Secure communication channels with backup methods ensure reliable vendor communication during crisis periods.',
    hints: ['Think about secure and verified communication methods', 'Consider backup communication options']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'How should vendor relationship impacts be communicated during crisis management?',
    scenario: '<strong style="font-size: 1.25em">The crisis may affect vendor relationships and contracts. Clear communication about relationship continuity is essential for vendor confidence.</strong>',
    options: [
      'Avoid discussing potential vendor relationship impacts',
      'Communicate transparently about vendor relationship commitment while addressing any necessary operational adjustments',
      'Promise no changes to vendor relationships regardless of circumstances',
      'Focus communications only on immediate operational needs'
    ],
    correct_answer: 1,
    explanation: 'Transparent communication about relationship commitment maintains vendor confidence while managing expectations about operational adjustments.',
    hints: ['Think about vendor confidence and relationship continuity', 'Consider transparency vs. avoidance']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'What vendor crisis communication protocols should be established for media interactions?',
    scenario: '<strong style="font-size: 1.25em">Media may contact vendors for information about the crisis. Established protocols help ensure consistent messaging and protect vendor relationships.</strong>',
    options: [
      'Let vendors handle media interactions independently',
      'Establish coordinated vendor crisis communication protocols that ensure consistent messaging and protect vendor relationships',
      'Prohibit all vendor media interactions',
      'Focus protocols only on the largest vendors'
    ],
    correct_answer: 1,
    explanation: 'Coordinated vendor crisis communication protocols ensure consistent messaging while protecting vendor relationships.',
    hints: ['Think about message consistency', 'Consider vendor relationship protection']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'crisis',
    question: 'How should vendor stakeholder communication be coordinated during crisis periods?',
    scenario: '<strong style="font-size: 1.25em">Vendor stakeholders may need coordinated communication during crisis periods. Coordination ensures consistent messaging and maintains stakeholder confidence.</strong>',
    options: [
      'Assume vendors will handle their own stakeholder communications',
      'Coordinate vendor stakeholder communication to ensure consistent messaging and maintain stakeholder confidence',
      'Require vendors to avoid all stakeholder communications',
      'Focus coordination only on vendors with public stakeholders'
    ],
    correct_answer: 1,
    explanation: 'Coordinated vendor stakeholder communication ensures consistent messaging while maintaining stakeholder confidence.',
    hints: ['Think about stakeholder confidence', 'Consider coordinated vs. independent communication']
  },

  // Strategic Impact (5 questions)
  {
    role: 'Vendor Manager',
    risk_card: 'strategic',
    question: 'How should Vendor Manager assess the strategic impact of deepfake threats on supply chain management?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats may require fundamental changes to vendor selection, management, and supply chain strategy. Strategic assessment is needed for long-term planning.</strong>',
    options: [
      'Continue existing supply chain strategy without modification',
      'Conduct comprehensive strategic assessment of deepfake impacts on vendor management and supply chain resilience',
      'Focus only on immediate vendor relationship issues',
      'Copy supply chain strategies from other companies\' responses'
    ],
    correct_answer: 1,
    explanation: 'Comprehensive strategic assessment ensures supply chain strategy evolves appropriately for deepfake threat environment.',
    hints: ['Think about long-term supply chain strategy evolution', 'Consider comprehensive vs. immediate-focused assessment']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'strategic',
    question: 'What strategic vendor diversification should be considered following deepfake incidents?',
    scenario: '<strong style="font-size: 1.25em">Supply chain resilience may require vendor diversification to reduce deepfake-related risks. Strategy must balance diversification with relationship efficiency.</strong>',
    options: [
      'Maintain existing vendor concentration without changes',
      'Develop strategic vendor diversification plan that enhances supply chain resilience while maintaining operational efficiency',
      'Immediately diversify all vendor relationships regardless of cost',
      'Focus diversification only on technology vendors'
    ],
    correct_answer: 1,
    explanation: 'Strategic diversification enhances supply chain resilience against deepfake threats while maintaining operational and cost efficiency.',
    hints: ['Think about balancing resilience with efficiency', 'Consider strategic vs. immediate diversification']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'strategic',
    question: 'How should vendor selection criteria be updated to address ongoing deepfake threats?',
    scenario: '<strong style="font-size: 1.25em">Future vendor selection must consider deepfake resilience and security capabilities. Selection criteria need updates for the evolving threat landscape.</strong>',
    options: [
      'Maintain existing vendor selection criteria',
      'Update vendor selection criteria to include deepfake security capabilities and communication resilience requirements',
      'Focus selection criteria only on lowest cost',
      'Require all vendors to have identical deepfake protection measures'
    ],
    correct_answer: 1,
    explanation: 'Updated selection criteria ensure future vendors have appropriate capabilities for operating in deepfake threat environment.',
    hints: ['Think about future vendor capabilities needed', 'Consider security and resilience requirements']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'strategic',
    question: 'What strategic vendor partnership models should be developed for deepfake resilience?',
    scenario: '<strong style="font-size: 1.25em">Traditional vendor relationships may not provide adequate deepfake resilience. Strategic partnership models may be needed for enhanced security and collaboration.</strong>',
    options: [
      'Maintain traditional vendor relationship models',
      'Develop strategic vendor partnership models that enhance deepfake resilience through collaborative security measures',
      'Focus only on transactional vendor relationships',
      'Require all vendors to become strategic partners'
    ],
    correct_answer: 1,
    explanation: 'Strategic partnership models enhance deepfake resilience through collaborative security measures and shared responsibility.',
    hints: ['Think about collaborative security models', 'Consider partnership vs. transactional relationships']
  },
  {
    role: 'Vendor Manager',
    risk_card: 'strategic',
    question: 'How should vendor management strategy evolve to address long-term deepfake threats?',
    scenario: '<strong style="font-size: 1.25em">Deepfake threats are evolving and may require fundamental changes to vendor management strategy. Long-term strategic planning is essential for supply chain resilience.</strong>',
    options: [
      'Maintain existing vendor management strategy',
      'Develop evolved vendor management strategy that addresses long-term deepfake threats through enhanced security, communication, and relationship models',
      'Focus strategy only on immediate threat mitigation',
      'Copy vendor management strategies from other industries'
    ],
    correct_answer: 1,
    explanation: 'Evolved vendor management strategy addresses long-term deepfake threats through comprehensive security and relationship improvements.',
    hints: ['Think about long-term threat evolution', 'Consider comprehensive strategy development']
  }
];

console.log('Starting Vendor Manager question generation...');
console.log(`Planning to insert ${vendorManagerQuestions.length} questions`);

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
    
    vendorManagerQuestions.forEach((q, index) => {
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
          console.log(`Inserted question ${insertedCount}/${vendorManagerQuestions.length}: ${q.role} - ${q.risk_card}`);
        }
      });
    });
    
    insertStmt.finalize(() => {
      console.log(`Vendor Manager question generation complete. Inserted ${insertedCount} questions.`);
      db.close();
    });
  });
}); 