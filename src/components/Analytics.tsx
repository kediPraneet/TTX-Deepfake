import React from 'react';
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from 'recharts';
import { riskCards } from '../lib/roleData';

interface AnalyticsProps {
  answeredQuestions: boolean[];
  hintCounts: number[];
  currentRiskCardQuestions: any[];
  selectedRoles: string[];
  totalScore: number;
}

const COLORS = ['#FF8C00', '#000000', '#FFBB28', '#FF8042', '#8884d8'];

export const Analytics: React.FC<AnalyticsProps> = ({
  answeredQuestions,
  hintCounts,
  currentRiskCardQuestions,
  selectedRoles,
  totalScore,
}) => {
  // Calculate analytics data
  const correctAnswers = answeredQuestions.filter(Boolean).length;
  const incorrectAnswers = answeredQuestions.filter(answer => !answer).length;
  const totalQuestions = answeredQuestions.length;
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  const pieData = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: incorrectAnswers },
  ];

  // Group hint usage by question number
  const hintUsageData = hintCounts.map((count, index) => ({
    question: `Q${index + 1}`,
    hints: count,
  }));

  // Calculate performance by role
  const performanceByRole = selectedRoles.map(role => {
    const roleQuestions = currentRiskCardQuestions.filter(q => q.role === role);
    const correctForRole = roleQuestions.filter((_, idx) => answeredQuestions[idx]).length;
    return {
      role,
      score: roleQuestions.length > 0 ? (correctForRole / roleQuestions.length) * 100 : 0,
    };
  });

  // Calculate strengths and areas for improvement
  const strengthsData = [
    { subject: 'Knowledge', score: accuracy },
    { subject: 'Hint Independence', score: hintCounts.length > 0 ? 100 - (Math.max(...hintCounts) / 2) * 100 : 100 },
    { subject: 'Speed', score: 80 }, // This could be calculated based on time if tracked
    { subject: 'Consistency', score: 75 }, // This could be more dynamic based on patterns
    { subject: 'Overall', score: totalQuestions > 0 ? (totalScore / (totalQuestions * 5)) * 100 : 0 },
  ];

  // Calculate performance trends
  const performanceTrend = answeredQuestions.map((isCorrect, index) => ({
    question: index + 1,
    score: isCorrect ? 100 : 0,
  }));

  // Calculate lowest performing risk card(s)
  let sortedCardNames: string[] = [];
  if (currentRiskCardQuestions && currentRiskCardQuestions.length > 0) {
    // Group questions by card title, with fallback lookup
    const cardScores: Record<string, { correct: number; total: number }> = {};
    currentRiskCardQuestions.forEach((q: any, idx: number) => {
      let cardTitle = q.cardTitle;
      if (!cardTitle) {
        // Fallback: find the card by matching the question text
        const foundCard = riskCards.find(card => card.questions.some(qq => qq.question === q.question));
        cardTitle = foundCard ? foundCard.title : 'Unknown';
      }
      if (!cardScores[cardTitle]) cardScores[cardTitle] = { correct: 0, total: 0 };
      if (answeredQuestions[idx]) cardScores[cardTitle].correct++;
      cardScores[cardTitle].total++;
    });
    // Sort cards by score ascending
    sortedCardNames = Object.entries(cardScores)
      .map(([card, { correct, total }]) => ({
        card,
        score: total > 0 ? correct / total : 0
      }))
      .sort((a, b) => a.score - b.score)
      .map(obj => obj.card);
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
          <div className="text-4xl font-bold">{Math.round(accuracy)}%</div>
          <p className="mt-2">Total Questions: {totalQuestions}</p>
        </div>

        {/* Correct vs Incorrect Distribution */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Answer Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>



        {/* Hint Usage Chart */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Hint Usage by Question</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hintUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hints" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar Chart */}
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengthsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="mt-8 bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Areas for Improvement</h3>
        {accuracy > 75 ? (
          <div className="text-green-700 dark:text-green-300 font-semibold">Excellent performance! You have demonstrated strong knowledge and application.</div>
        ) : accuracy > 50 ? (
          <>
            <div className="text-blue-700 dark:text-blue-300 font-semibold mb-2">Good job! To reach excellence, focus on the following areas:</div>
            {sortedCardNames.length > 0 && (
              <>
                <div className="text-slate-700 dark:text-gray-300 mb-4">
                  <h4 className="font-semibold mb-2">Primary Focus Area: {sortedCardNames[0]}</h4>
                  <div className="pl-4 border-l-2 border-blue-500">
                    <p className="mb-2">Based on your performance, you showed challenges in understanding and applying concepts related to {sortedCardNames[0].toLowerCase()} management.</p>
                    <p className="mb-2">Specific Gaps:</p>
                    <p className="text-sm mb-2 text-slate-600 dark:text-slate-400">The following areas highlight where your understanding needs improvement, along with the specific concepts you should focus on:</p>
                    <ul className="list-disc pl-6 mb-2">
                      {currentRiskCardQuestions
                        .filter((q, idx) => q.cardTitle === sortedCardNames[0] && !answeredQuestions[idx])
                        .map((q, idx) => (
                          <li key={idx} className="mb-3">
                            <p className="font-medium mb-1">{q.question.split('?')[0]}</p>
                            <div className="pl-4">
                              <p className="text-sm mb-1">Current Understanding Gap: {q.explanation}</p>
                              <p className="text-sm mb-1">Key Concepts to Master:</p>
                              <ul className="list-disc pl-4 text-sm">
                                {q.role === 'CFO' && (
                                  <>
                                    <li>Financial impact assessment and risk quantification</li>
                                    <li>Resource allocation and budget management</li>
                                    <li>Stakeholder communication in financial terms</li>
                                  </>
                                )}
                                {q.role === 'Marketing' && (
                                  <>
                                    <li>Brand reputation management</li>
                                    <li>Crisis communication strategies</li>
                                    <li>Stakeholder engagement and trust building</li>
                                  </>
                                )}
                                {q.role === 'Legal Division' && (
                                  <>
                                    <li>Regulatory compliance requirements</li>
                                    <li>Legal risk assessment and mitigation</li>
                                    <li>Contract and policy implications</li>
                                  </>
                                )}
                                {q.role === 'IT System' && (
                                  <>
                                    <li>Technical security measures</li>
                                    <li>System resilience and recovery</li>
                                    <li>Technology risk management</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <p className="mb-2">Key Improvements:</p>
                    <ul className="list-disc pl-6 mb-2">
                      <li>Review the core concepts and best practices in {sortedCardNames[0].toLowerCase()} management</li>
                      <li>Practice scenario-based decision making in this area</li>
                      <li>Study the explanations for questions you answered incorrectly</li>
                      <li>Focus on understanding the role-specific responsibilities and decision-making frameworks</li>
                      <li>Analyze real-world case studies related to {sortedCardNames[0].toLowerCase()} management</li>
                      <li>Participate in practical exercises that simulate {sortedCardNames[0].toLowerCase()} scenarios</li>
                    </ul>
                    <p className="mb-2">Practical Next Steps:</p>
                    <ul className="list-disc pl-6">
                      <li>Start with reviewing the basic principles of {sortedCardNames[0].toLowerCase()} management</li>
                      <li>Create a checklist of key considerations for {sortedCardNames[0].toLowerCase()} scenarios</li>
                      <li>Practice identifying early warning signs and risk indicators</li>
                      <li>Develop a decision-making framework for {sortedCardNames[0].toLowerCase()} situations</li>
                      <li>Review and understand the interdependencies between different roles in {sortedCardNames[0].toLowerCase()} management</li>
                    </ul>
                  </div>
                </div>
                {sortedCardNames.length > 1 && (
                  <div className="text-slate-700 dark:text-gray-300 mb-4">
                    <h4 className="font-semibold mb-2">Secondary Focus Areas: {sortedCardNames.slice(1, 3).join(', ')}</h4>
                    <div className="pl-4 border-l-2 border-blue-500">
                      {sortedCardNames.slice(1, 3).map((cardName, cardIdx) => (
                        <div key={cardIdx} className="mb-4">
                          <p className="font-medium mb-2">{cardName}:</p>
                          <p className="mb-2">Based on your performance, you showed challenges in understanding and applying concepts related to {cardName.toLowerCase()} management.</p>
                          <p className="mb-2">Specific Gaps:</p>
                          <p className="text-sm mb-2 text-slate-600 dark:text-slate-400">The following areas highlight where your understanding needs improvement, along with the specific concepts you should focus on:</p>
                          <ul className="list-disc pl-6 mb-2">
                            {currentRiskCardQuestions
                              .filter((q, idx) => q.cardTitle === cardName && !answeredQuestions[idx])
                              .map((q, idx) => (
                                <li key={idx} className="mb-1">
                                  {q.question.split('?')[0]} - {q.explanation}
                                </li>
                              ))}
                          </ul>
                          <p className="mb-2">Recommended Actions:</p>
                          <ul className="list-disc pl-6">
                            <li>Review the core concepts and best practices in {cardName.toLowerCase()} management</li>
                            <li>Practice scenario-based decision making in this area</li>
                            <li>Study the explanations for questions you answered incorrectly</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">General Improvement Areas:</h4>
            <ul className="space-y-2">
              {accuracy < 70 && (
                  <li className="flex items-start text-slate-700 dark:text-gray-300">
                    <span className="mr-2 mt-1">•</span>
                    <div>
                      <p className="font-medium">Knowledge Application</p>
                      <p className="text-sm">Focus on understanding how to apply security concepts in practical scenarios. Review the explanations for incorrect answers to understand the reasoning behind correct responses.</p>
                    </div>
                </li>
              )}
              {Math.max(...hintCounts) > 1 && (
                  <li className="flex items-start text-slate-700 dark:text-gray-300">
                    <span className="mr-2 mt-1">•</span>
                    <div>
                      <p className="font-medium">Decision Confidence</p>
                      <p className="text-sm">Work on building confidence in your decision-making process. Try to analyze scenarios more thoroughly before using hints, focusing on identifying key factors and potential impacts.</p>
                    </div>
                </li>
              )}
              {performanceByRole.some(role => role.score < 60) && (
                  <li className="flex items-start text-slate-700 dark:text-gray-300">
                    <span className="mr-2 mt-1">•</span>
                    <div>
                      <p className="font-medium">Role-Specific Knowledge</p>
                      <p className="text-sm">Review materials related to roles where your performance was lower. Focus on understanding the specific responsibilities and decision-making frameworks for these roles.</p>
                    </div>
                </li>
              )}
            </ul>
            </div>
          </>
        ) : (
          <>
            <div className="text-yellow-700 dark:text-yellow-300 font-semibold mb-2">Critical: Immediate improvement needed. Please review the following areas:</div>
            {sortedCardNames.length > 0 && (
              <>
                <div className="text-slate-700 dark:text-gray-300 mb-4">
                  <h4 className="font-semibold mb-2">Critical Focus Area: {sortedCardNames[0]}</h4>
                  <div className="pl-4 border-l-2 border-yellow-500">
                    <p className="mb-2">Context: Your performance indicates significant gaps in understanding {sortedCardNames[0].toLowerCase()} management concepts.</p>
                    <p className="mb-2">Key Areas of Concern:</p>
                    <p className="text-sm mb-2 text-slate-600 dark:text-slate-400">The following areas highlight where your understanding needs improvement, along with the specific concepts you should focus on:</p>
                    <ul className="list-disc pl-6 mb-2">
                      {currentRiskCardQuestions
                        .filter((q, idx) => q.cardTitle === sortedCardNames[0] && !answeredQuestions[idx])
                        .map((q, idx) => (
                          <li key={idx} className="mb-3">
                            <p className="font-medium mb-1">{q.question.split('?')[0]}</p>
                            <div className="pl-4">
                              <p className="text-sm mb-1">Current Understanding Gap: {q.explanation}</p>
                              <p className="text-sm mb-1">Key Concepts to Master:</p>
                              <ul className="list-disc pl-4 text-sm">
                                {q.role === 'CFO' && (
                                  <>
                                    <li>Financial impact assessment and risk quantification</li>
                                    <li>Resource allocation and budget management</li>
                                    <li>Stakeholder communication in financial terms</li>
                                  </>
                                )}
                                {q.role === 'Marketing' && (
                                  <>
                                    <li>Brand reputation management</li>
                                    <li>Crisis communication strategies</li>
                                    <li>Stakeholder engagement and trust building</li>
                                  </>
                                )}
                                {q.role === 'Legal Division' && (
                                  <>
                                    <li>Regulatory compliance requirements</li>
                                    <li>Legal risk assessment and mitigation</li>
                                    <li>Contract and policy implications</li>
                                  </>
                                )}
                                {q.role === 'IT System' && (
                                  <>
                                    <li>Technical security measures</li>
                                    <li>System resilience and recovery</li>
                                    <li>Technology risk management</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <p className="mb-2">Immediate Actions Required:</p>
                    <ul className="list-disc pl-6">
                      <li>Start with foundational concepts in {sortedCardNames[0].toLowerCase()} management</li>
                      <li>Review all incorrect answers and their explanations thoroughly</li>
                      <li>Practice with simpler scenarios before moving to complex ones</li>
                      <li>Consider seeking additional training or mentorship in this area</li>
                    </ul>
                  </div>
                </div>
                {sortedCardNames.length > 1 && (
                  <div className="text-slate-700 dark:text-gray-300 mb-4">
                    <h4 className="font-semibold mb-2">Additional Focus Areas: {sortedCardNames.slice(1, 3).join(', ')}</h4>
                    <div className="pl-4 border-l-2 border-yellow-500">
                      <p className="mb-2">Context: You also need to strengthen your understanding in these areas:</p>
                      <p className="text-sm mb-2 text-slate-600 dark:text-slate-400">The following areas highlight where your understanding needs improvement, along with the specific concepts you should focus on:</p>
                      {sortedCardNames.slice(1, 3).map((cardName, cardIdx) => (
                        <div key={cardIdx} className="mb-3">
                          <p className="font-medium mb-1">{cardName}:</p>
                          <ul className="list-disc pl-6">
                            {currentRiskCardQuestions
                              .filter((q, idx) => q.cardTitle === cardName && !answeredQuestions[idx])
                              .map((q, idx) => (
                                <li key={idx} className="mb-1">
                                  {q.question.split('?')[0]} - {q.explanation}
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Fundamental Improvement Areas:</h4>
            <ul className="space-y-2">
                <li className="flex items-start text-slate-700 dark:text-gray-300">
                  <span className="mr-2 mt-1">•</span>
                  <div>
                    <p className="font-medium">Core Knowledge Building</p>
                    <p className="text-sm">Start with foundational security and incident response materials. Focus on understanding basic concepts before moving to complex scenarios.</p>
                  </div>
                </li>
                <li className="flex items-start text-slate-700 dark:text-gray-300">
                  <span className="mr-2 mt-1">•</span>
                  <div>
                    <p className="font-medium">Decision-Making Framework</p>
                    <p className="text-sm">Develop a structured approach to analyzing scenarios and making decisions. Practice identifying key factors and potential impacts in each situation.</p>
                  </div>
                </li>
                <li className="flex items-start text-slate-700 dark:text-gray-300">
                  <span className="mr-2 mt-1">•</span>
                  <div>
                    <p className="font-medium">Role Understanding</p>
                    <p className="text-sm">Review the responsibilities and decision-making frameworks for each role. Understand how different roles interact and contribute to incident response.</p>
                  </div>
              </li>
            </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 