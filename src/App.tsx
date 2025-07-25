import React, { useState, useEffect } from 'react';
import { Shield, Lock, BookOpen, ArrowRight, Shield as ShieldIcon, Users, CheckCircle, UserCog, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNav } from './components/ui/floating-navbar';
import GridBackgroundDemo from './components/ui/grid-background-demo';
import { riskCards, RiskCard, Question } from './lib/roleData';
import { RiskCardIcon } from './components/RiskCardIcon';
import { assessmentStore, AssessmentData } from './lib/assessmentStore';
import { Analytics } from './components/Analytics';
import { io } from 'socket.io-client';
import { fetchQuestionsByRoles, fetchGeneralQuestions, type Question as DatabaseQuestion } from './lib/api';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

// Add type definitions at the top of the file
type SocketMessage = {
  type: 'question_display' | 'answer_selection' | 'hint_used' | 'navigation' | 'results_display';
  data: any;
};

type ClientInfo = {
  id: string;
  connectedAt: string;
  lastActivity: string;
};

type SessionRiskCardResult = {
  cardId: string;
  cardTitle: string;
  totalScore: number;
  maxScore: number;
  answers: any[];
  timestamp: string;
  questions?: any[];
  selectedAnswers?: any[];
};

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function App() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [filteredRiskCards, setFilteredRiskCards] = useState<RiskCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [hintCounts, setHintCounts] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [currentRiskCardQuestions, setCurrentRiskCardQuestions] = useState<Question[]>([]);
  const [roleSelectionComplete, setRoleSelectionComplete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [userLoginError, setUserLoginError] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [completedRiskCards, setCompletedRiskCards] = useState<string[]>([]);
  const [showFinalAnalytics, setShowFinalAnalytics] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  
  // Add state variables for current session risk card results
  const [sessionRiskCardResults, setSessionRiskCardResults] = useState<SessionRiskCardResult[]>([]);
  const [showSessionResults, setShowSessionResults] = useState(false);
  
  // Add state to track skipped questions count
  const [skippedQuestionsCount, setSkippedQuestionsCount] = useState(0);

  // Add new state variables for admin mirroring
  const [mirroredQuestion, setMirroredQuestion] = useState<any>(null);
  const [mirroredAnswer, setMirroredAnswer] = useState<any>(null);
  const [mirroredHints, setMirroredHints] = useState<number[]>([]);
  const [mirroredResults, setMirroredResults] = useState<any>(null);
  const [activeClient, setActiveClient] = useState<string | null>(null);

  // Add new state for connected clients
  const [connectedClients, setConnectedClients] = useState<ClientInfo[]>([]);

  // Add new state for user selection popup
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userSelectionError, setUserSelectionError] = useState('');

  const roles = [
    'CFO',
    'IT System',
    'Legal Division',
    'Marketing',
    'Vendor Manager',
    'Governance and Compliance',
    'Security Incident Manager'
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRoles(prev => {
      if (prev.includes(role)) {
        // If clicking the same role, deselect it
        return [];
      } else {
        // If clicking a different role, select only that role
        return [role];
      }
    });
  };

  const handleStartGenericAssessment = async () => {
    console.log('Starting general assessment');
    
    try {
      // Fetch general questions from database
      const questions = await fetchGeneralQuestions(5);
      
      if (questions.length === 0) {
        alert('No questions found in database. Please check the database setup.');
        return;
      }

      console.log('Fetched general questions from database:', questions);
      
      // Transform database questions to match current format
      const transformedQuestions = questions.map((q: DatabaseQuestion, index: number) => ({
        id: index + 1,
        question: q.question,
        scenario: q.scenario,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        hints: q.hints,
        role: q.role,
        cardTitle: q.cardTitle || 'General Assessment'
      }));

      // Set up for generic assessment using database questions
      setCurrentRiskCardQuestions(transformedQuestions);
      setSelectedRoles([]); // Empty array means generic assessment
      setRoleSelectionComplete(true);
      // Reset user selection popup state
      setShowUserSelection(false);
      setSelectedUser(null);
      setUserSelectionError('');
    } catch (error) {
      console.error('Error starting general assessment:', error);
      alert('Failed to load questions. Please check if the database server is running on port 3002.');
    }
  };

  const handleStartRoleBasedAssessment = async () => {
    console.log('Starting role-based assessment with roles:', selectedRoles);
    
    if (selectedRoles.length === 0) {
      alert('Please select at least one role');
      return;
    }

    try {
      // Fetch questions from database
      const questions = await fetchQuestionsByRoles(selectedRoles, 5);
      
      if (questions.length === 0) {
        alert('No questions found for selected roles. Please try different roles.');
        return;
      }

      console.log('Fetched questions from database:', questions);
      
      // Transform database questions to match current format
      const transformedQuestions = questions.map((q: DatabaseQuestion, index: number) => ({
        id: index + 1,
        question: q.question,
        scenario: q.scenario,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        hints: q.hints,
        role: q.role,
        cardTitle: q.cardTitle || 'Role-based Assessment'
      }));

      // Set up for role-based assessment using database questions
      setCurrentRiskCardQuestions(transformedQuestions);
      
      // **NEW: Direct role-to-user mapping**
      const roleToUserMapping = {
        'CFO': { id: 9, email: 'us1@gmail.com', firstName: 'Chief Financial', lastName: 'Officer', department: 'Finance', roleLevel: 'user' },
        'IT System': { id: 10, email: 'us2@gmail.com', firstName: 'IT', lastName: 'Administrator', department: 'Information Technology', roleLevel: 'user' },
        'Legal Division': { id: 11, email: 'us3@gmail.com', firstName: 'Legal', lastName: 'Counsel', department: 'Legal', roleLevel: 'user' },
        'Marketing': { id: 12, email: 'us4@gmail.com', firstName: 'Marketing', lastName: 'Director', department: 'Marketing', roleLevel: 'user' },
        'Vendor Manager': { id: 13, email: 'us5@gmail.com', firstName: 'Vendor', lastName: 'Coordinator', department: 'Procurement', roleLevel: 'user' },
        'Governance and Compliance': { id: 14, email: 'us6@gmail.com', firstName: 'Compliance', lastName: 'Officer', department: 'Compliance', roleLevel: 'user' },
        'Security Incident Manager': { id: 15, email: 'us7@gmail.com', firstName: 'Security', lastName: 'Manager', department: 'Security', roleLevel: 'user' }
      };

      // **NEW: Automatically set selected user based on role**
      const selectedRole = selectedRoles[0]; // Since we now allow only one role
      const mappedUser = roleToUserMapping[selectedRole];
      
      if (mappedUser) {
        setSelectedUser(mappedUser);
        setRoleSelectionComplete(true);
        console.log('Assessment starting for user:', mappedUser.firstName, mappedUser.lastName);
        console.log('Selected roles:', selectedRoles);
        
        // Register the selected user with socket for admin tracking
        socket?.emit('register', 'client', {
          userId: mappedUser.id,
          userName: `${mappedUser.firstName} ${mappedUser.lastName}`,
          userEmail: mappedUser.email
        });
      } else {
        alert('No user mapping found for selected role.');
      }
      
    } catch (error) {
      console.error('Error starting role-based assessment:', error);
      alert('Failed to load questions. Please check if the database server is running on port 3002.');
    }
  };

  // Add function to handle user selection and proceed to assessment
  const handleUserSelectionConfirm = () => {
    if (selectedUser) {
      setShowUserSelection(false);
      setRoleSelectionComplete(true);
      console.log('Assessment starting for user:', selectedUser.firstName, selectedUser.lastName);
      console.log('Selected roles:', selectedRoles);
      
      // Register the selected user with socket for admin tracking
      socket?.emit('register', 'client', {
        userId: selectedUser.id,
        userName: `${selectedUser.firstName} ${selectedUser.lastName}`,
        userEmail: selectedUser.email
      });
    }
  };

  // Add function to cancel user selection
  const handleUserSelectionCancel = () => {
    setShowUserSelection(false);
    setSelectedUser(null);
    setUserSelectionError('');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rolesParam = urlParams.get('roles');
    console.log('URL Parameters:', window.location.search);
    console.log('Roles Parameter:', rolesParam);
    if (rolesParam) {
      const roles = decodeURIComponent(rolesParam).split(',');
      console.log('Decoded Roles:', roles);
      setSelectedRoles(roles);
    }
  }, []);

  useEffect(() => {
    console.log('Selected Roles:', selectedRoles);
    setFilteredRiskCards(riskCards);
  }, [selectedRoles]);

  useEffect(() => {
    setAssessments(assessmentStore.getAssessments());
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setAssessments(assessmentStore.getAssessments());
    }
  }, [isAdmin]);

  useEffect(() => {
    // Create socket connection
    const newSocket = io('http://localhost:3001');
    console.log('Socket connection created:', newSocket.id);
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log('Socket connection closed:', newSocket.id);
      newSocket.close();
    };
  }, []);

  // Add socket listeners in useEffect
  useEffect(() => {
    if (isAdmin && socket) {
      console.log('Admin socket listeners setup for socket:', socket.id);
      
      // Listen for client messages
      socket.on('messageToAdmin', (message: SocketMessage) => {
        console.log('Received message in admin view:', message);
        
        switch (message.type) {
          case 'question_display':
            setMirroredQuestion(message.data);
            setMirroredAnswer(null);
            setMirroredHints([]);
            setMirroredResults(null);
            
            // Store question data for session results
            setSessionRiskCardResults(prev => {
              const existingIndex = prev.findIndex(result => result.cardId === message.data.cardId);
              if (existingIndex !== -1) {
                // Update existing result with question data
                const newResults = [...prev];
                if (!newResults[existingIndex].questions) {
                  newResults[existingIndex].questions = [];
                }
                
                // Add or update question data
                const questionIndex = message.data.questionIndex;
                newResults[existingIndex].questions![questionIndex] = {
                  question: message.data.question.question,
                  scenario: message.data.question.scenario,
                  options: message.data.question.options,
                  correctAnswer: message.data.question.correctAnswer,
                  explanation: message.data.question.explanation
                };
                
                return newResults;
              } else {
                // Create new result with question data
                const getCardTitle = (cardId: string) => {
                  const cardTitleMap: { [key: string]: string } = {
                    'operational': 'Operational Disruptions',
                    'ransom': 'Ransom Pay',
                    'crisis': 'Crisis Management',
                    'strategic': 'Strategic Planning',
                    'governance': 'Governance Issues',
                    'reputation': 'Reputation Management',
                    'legal': 'Legal Complications'
                  };
                  return cardTitleMap[cardId] || cardId.charAt(0).toUpperCase() + cardId.slice(1);
                };
                
                const newResult: SessionRiskCardResult = {
                  cardId: message.data.cardId,
                  cardTitle: getCardTitle(message.data.cardId),
                  totalScore: 0,
                  maxScore: 0,
                  answers: [],
                  timestamp: message.data.timestamp || new Date().toISOString(),
                  questions: [],
                  selectedAnswers: []
                };
                
                const questionIndex = message.data.questionIndex;
                newResult.questions![questionIndex] = {
                  question: message.data.question.question,
                  scenario: message.data.question.scenario,
                  options: message.data.question.options,
                  correctAnswer: message.data.question.correctAnswer,
                  explanation: message.data.question.explanation
                };
                
                return [...prev, newResult];
              }
            });
            break;
            
          case 'answer_selection':
            console.log('Received answer selection:', message.data);
            setMirroredAnswer({
              selectedAnswerIndex: message.data.selectedAnswerIndex,
              selectedAnswerText: message.data.selectedAnswerText,
              questionIndex: message.data.questionIndex
            });
            
            // Store answer data for session results
            setSessionRiskCardResults(prev => {
              const existingIndex = prev.findIndex(result => result.cardId === message.data.cardId);
              if (existingIndex !== -1) {
                const newResults = [...prev];
                if (!newResults[existingIndex].selectedAnswers) {
                  newResults[existingIndex].selectedAnswers = [];
                }
                
                // Store selected answer
                const questionIndex = message.data.questionIndex;
                newResults[existingIndex].selectedAnswers![questionIndex] = {
                  selectedAnswerIndex: message.data.selectedAnswerIndex,
                  selectedAnswerText: message.data.selectedAnswerText
                };
                
                return newResults;
              }
              return prev;
            });
            break;
            
          case 'hint_used':
            setMirroredHints(prev => {
              const newHints = [...prev];
              newHints[message.data.questionIndex] = message.data.hintNumber;
              return newHints;
            });
            break;
            
          case 'navigation':
            // Navigation is handled by question_display event
            break;
            
          case 'results_display':
            setMirroredResults(message.data);
            
            // Store the results in session storage
            const getCardTitle = (cardId: string) => {
              const cardTitleMap: { [key: string]: string } = {
                'operational': 'Operational Disruptions',
                'ransom': 'Ransom Pay',
                'crisis': 'Crisis Management',
                'strategic': 'Strategic Planning',
                'governance': 'Governance Issues',
                'reputation': 'Reputation Management',
                'legal': 'Legal Complications'
              };
              return cardTitleMap[cardId] || cardId.charAt(0).toUpperCase() + cardId.slice(1);
            };
            
            const resultData = {
              cardId: message.data.cardId,
              cardTitle: getCardTitle(message.data.cardId),
              totalScore: message.data.totalScore,
              maxScore: message.data.maxScore,
              answers: message.data.answers,
              timestamp: message.data.timestamp || new Date().toISOString()
            };
            

            
            setSessionRiskCardResults(prev => {
              // Check if this risk card result already exists
              const existingIndex = prev.findIndex(result => result.cardId === message.data.cardId);
              if (existingIndex !== -1) {
                // Update existing result while preserving questions and selectedAnswers
                const newResults = [...prev];
                const existingResult = newResults[existingIndex];
                newResults[existingIndex] = {
                  ...resultData,
                  questions: existingResult.questions || [],
                  selectedAnswers: existingResult.selectedAnswers || []
                };
                return newResults;
              } else {
                // Add new result
                return [...prev, resultData];
              }
            });
            break;
        }
      });

      // Listen for initial client list
      socket.on('clientList', (clients: [string, ClientInfo][]) => {
        console.log('Received initial client list:', clients);
        setConnectedClients(clients.map(([_, info]) => info));
      });

      // Listen for new client connections
      socket.on('clientConnected', (clientInfo: ClientInfo) => {
        console.log('New client connected:', clientInfo);
        setConnectedClients(prev => {
          // Check if client already exists
          if (prev.some(client => client.id === clientInfo.id)) {
            return prev;
          }
          return [...prev, clientInfo];
        });
        
        // Clear session results for new client
        setSessionRiskCardResults([]);
      });

      // Listen for client disconnections
      socket.on('clientDisconnected', (clientId: string) => {
        console.log('Client disconnected:', clientId);
        setConnectedClients(prev => prev.filter(client => client.id !== clientId));
        
        // If the disconnected client was being viewed, clear the view
        if (activeClient === clientId) {
          setActiveClient(null);
          setMirroredQuestion(null);
          setMirroredAnswer(null);
          setMirroredHints([]);
          setMirroredResults(null);
        }
      });

      return () => {
        console.log('Cleaning up admin socket listeners');
        socket.off('messageToAdmin');
        socket.off('clientList');
        socket.off('clientConnected');
        socket.off('clientDisconnected');
      };
    }
  }, [isAdmin, socket, activeClient]);

  const getFilteredQuestions = (card: RiskCard): Question[] => {
    console.log(`Getting questions for card: ${card.title}, selected roles: ${selectedRoles.join(', ')}`);
    
    if (selectedRoles.length === 0) {
        console.log("No roles selected, returning first 5 questions of the current card.");
        return card.questions.slice(0, 5).map(q => ({ ...q, cardTitle: card.title }));
    }

    // Get questions for THIS specific card that match the selected roles
    const cardMatchingQuestions: Question[] = [];
    card.questions.forEach(q => {
        if (selectedRoles.includes(q.role)) {
            cardMatchingQuestions.push({ ...q, cardTitle: card.title });
        }
    });

    console.log(`Found ${cardMatchingQuestions.length} questions for card "${card.title}" matching roles: ${selectedRoles.join(', ')}`);

    if (cardMatchingQuestions.length === 0) {
        console.log(`No questions found for selected roles in card "${card.title}". Falling back to first 5 of current card.`);
        return card.questions.slice(0, 5).map(q => ({ ...q, cardTitle: card.title }));
    }
    
    // Take exactly 5 questions for this card (shuffle if more than 5 available)
    if (cardMatchingQuestions.length <= 5) {
        console.log(`Using all ${cardMatchingQuestions.length} questions for card "${card.title}"`);
        return shuffleArray([...cardMatchingQuestions]);
    }

    console.log(`Selecting 5 questions out of ${cardMatchingQuestions.length} for card "${card.title}"`);
    const shuffledQuestions = shuffleArray([...cardMatchingQuestions]);
    return shuffledQuestions.slice(0, 5);
  };

  const handleCardClick = async (cardId: string) => {
    console.log('Card clicked:', cardId);
    setSelectedCard(cardId);
    
    try {
      // Map role names to role IDs
      const roleIdMap: { [key: string]: number } = {
        'CFO': 1,
        'IT System': 2,
        'Legal Division': 3,
        'Marketing': 4,
        'Vendor Manager': 5,
        'Governance and Compliance': 6,
        'Security Incident Manager': 7
      };
      
      let questions: Question[] = [];
      
      if (selectedRoles.length > 0) {
        // Get role ID for the first selected role (assuming single role selection for individual cards)
        const roleId = roleIdMap[selectedRoles[0]];
        
        if (roleId) {
          console.log(`Fetching questions for role: ${selectedRoles[0]} (ID: ${roleId}), card: ${cardId}`);
          
          // Fetch questions from database for this specific role and card
          const response = await fetch(`http://localhost:3002/api/questions/role/${roleId}/card/${cardId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Database questions:', data.questions);
            
            // Transform database questions to match current format
            questions = data.questions.map((q: any, index: number) => ({
              id: index + 1,
              question: q.question,
              scenario: q.scenario,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              hints: q.hints,
              role: selectedRoles[0],
              cardTitle: q.cardTitle || 'Assessment'
            }));
          } else {
            console.error('Failed to fetch questions from database');
          }
        }
      }
      
      // Fallback to hardcoded questions if database fetch fails or no role selected
      if (questions.length === 0) {
        console.log('Falling back to hardcoded questions');
        const card = riskCards.find(c => c.id === cardId);
        if (card) {
          questions = getFilteredQuestions(card);
        }
      }
      
      if (questions.length > 0) {
        setCurrentRiskCardQuestions(questions);
        setHintCounts(new Array(questions.length).fill(0));
        console.log('Questions set for this card:', questions.map(q => q.question));
        
        // Emit question display event
        socket?.emit('messageFromClient', {
          type: 'question_display',
          data: {
            cardId,
            questionIndex: 0,
            question: questions[0],
            timestamp: new Date().toISOString()
          }
        });
      }
      
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback to hardcoded questions on error
      const card = riskCards.find(c => c.id === cardId);
      if (card) {
        const questions = getFilteredQuestions(card);
        setCurrentRiskCardQuestions(questions);
        setHintCounts(new Array(questions.length).fill(0));
      }
    }
    
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setFinalAnswers([]);
    setShowHints(false);
    setShowResults(false);
    setAnsweredQuestions([]);
    setShowHint(false);
    setSkippedQuestionsCount(0); // Reset skipped questions count for new risk card
  };

  const getCurrentQuestion = (): Question | undefined => {
    return currentRiskCardQuestions[currentQuestionIndex];
  };

  const handleHintClick = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || !currentQuestion.hints || hintCounts[currentQuestionIndex] >= currentQuestion.hints.length) return;

    const newHintCounts = [...hintCounts];
    if (newHintCounts[currentQuestionIndex] === undefined) newHintCounts[currentQuestionIndex] = 0;
    
    if (newHintCounts[currentQuestionIndex] < 2) {
        newHintCounts[currentQuestionIndex]++;
        setHintCounts(newHintCounts);
        setShowHint(true);

        // Emit hint used event
        socket?.emit('messageFromClient', {
          type: 'hint_used',
          data: {
            cardId: selectedCard,
            questionIndex: currentQuestionIndex,
            hintNumber: newHintCounts[currentQuestionIndex],
            hintText: currentQuestion.hints[newHintCounts[currentQuestionIndex] - 1],
            timestamp: new Date().toISOString()
          }
        });
    }
  };

  const getQuestionScore = (questionIndex: number): number => {
    const hintCount = hintCounts[questionIndex] || 0;
    if (hintCount === 0) return 5;
    if (hintCount === 1) return 3;
    return 2;
  };

  const calculateTotalScore = (): number => {
    const currentAnswers = answeredQuestions.slice(0, currentRiskCardQuestions.length);
    return currentAnswers.reduce((total, isCorrect, index) => {
      return total + (isCorrect === true ? getQuestionScore(index) : 0);
    }, 0);
  };

  // Helper function to count answered questions (not skipped)
  const getAnsweredQuestionsCount = (): number => {
    return finalAnswers.filter(answer => answer !== -1 && answer !== undefined).length;
  };

  // Helper function to check if minimum questions are answered
  const hasMinimumAnswers = (): boolean => {
    return getAnsweredQuestionsCount() >= 3;
  };

  // Helper function to check if user can skip more questions
  const canSkipMoreQuestions = (): boolean => {
    return skippedQuestionsCount < 2;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('Answer selected:', answerIndex);
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answerIndex;
      return newAnswers;
    });
    
    // Also store in finalAnswers for results
    setFinalAnswers(prev => {
      const newAnswers = [...prev];
      while (newAnswers.length <= currentQuestionIndex) {
        newAnswers.push(-1); // Use -1 as "no answer"
      }
      newAnswers[currentQuestionIndex] = answerIndex;
      return newAnswers;
    });
    
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      const isCorrect = answerIndex === currentQuestion.correctAnswer;
      console.log('Is answer correct:', isCorrect);
      setAnsweredQuestions(prevAnswers => {
        const newAnswers = [...prevAnswers];
        while (newAnswers.length <= currentQuestionIndex) {
          newAnswers.push(false);
        }
        newAnswers[currentQuestionIndex] = isCorrect;
        return newAnswers;
      });

      // Emit answer selection event
      socket?.emit('messageFromClient', {
        type: 'answer_selection',
        data: {
          cardId: selectedCard,
          questionIndex: currentQuestionIndex,
          selectedAnswerIndex: answerIndex,
          selectedAnswerText: currentQuestion.options[answerIndex],
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  const handleSkipQuestion = () => {
    console.log('Skipping question');
    
    // Check if user has already skipped 2 questions
    if (!canSkipMoreQuestions()) {
      alert('You can only skip 2 questions maximum. You must answer at least 3 questions in each risk card.');
      return;
    }
    
    if (currentQuestionIndex < currentRiskCardQuestions.length - 1) {
      const fromIndex = currentQuestionIndex;
      const toIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(toIndex);
      setSelectedAnswers([]);
      setShowHint(false);

      // Increment skipped questions count
      setSkippedQuestionsCount(prev => prev + 1);

      // Mark the skipped question as unanswered (false)
      setAnsweredQuestions(prevAnswers => {
        const newAnswers = [...prevAnswers];
        while (newAnswers.length <= fromIndex) {
          newAnswers.push(false);
        }
        newAnswers[fromIndex] = false; // Mark as incorrect/unanswered
        return newAnswers;
      });

      // Store -1 as "skipped" in finalAnswers
      setFinalAnswers(prev => {
        const newAnswers = [...prev];
        while (newAnswers.length <= fromIndex) {
          newAnswers.push(-1);
        }
        newAnswers[fromIndex] = -1; // Mark as skipped
        return newAnswers;
      });

      // Emit navigation event
      socket?.emit('messageFromClient', {
        type: 'navigation',
        data: {
          cardId: selectedCard,
          fromQuestionIndex: fromIndex,
          toQuestionIndex: toIndex,
          action: 'skip',
          timestamp: new Date().toISOString()
        }
      });

      // Emit question display event for the new question
      const nextQuestion = currentRiskCardQuestions[toIndex];
      socket?.emit('messageFromClient', {
        type: 'question_display',
        data: {
          cardId: selectedCard,
          questionIndex: toIndex,
          question: nextQuestion,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      // This is the last question - check if minimum answers are provided
      if (!hasMinimumAnswers()) {
        alert('You must answer at least 3 questions before completing this risk card assessment.');
        return;
      }
      
      console.log('Showing results');
      setShowResults(true);
      
      // Store assessment data when completed
      const assessmentData: AssessmentData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        selectedRoles,
        scores: [{
          cardId: selectedCard!,
          cardTitle: riskCards.find(c => c.id === selectedCard)?.title || '',
          score: calculateTotalScore(),
          maxScore: 25,
          answeredQuestions,
          selectedAnswers: finalAnswers
        }],
        hintCounts: hintCounts
      };
      assessmentStore.addAssessment(assessmentData);
      
      // Also save to database if user is authenticated
      saveAssessmentToDatabase(assessmentData);

      // Emit results display event
      socket?.emit('messageFromClient', {
        type: 'results_display',
        data: {
          cardId: selectedCard,
          totalScore: calculateTotalScore(),
          maxScore: 25,
          answers: currentRiskCardQuestions.map((q, index) => ({
            questionIndex: index,
            isCorrect: answeredQuestions[index],
            selectedAnswer: finalAnswers[index] !== undefined && finalAnswers[index] !== -1 ? q.options[finalAnswers[index]] : 'Skipped',
            correctAnswer: q.options[q.correctAnswer],
            hintsUsed: hintCounts[index] || 0
          })),
          timestamp: new Date().toISOString()
        }
      });

      if (selectedCard && !completedRiskCards.includes(selectedCard)) {
        setCompletedRiskCards(prev => [...prev, selectedCard]);
      }

      setAssessments(assessmentStore.getAssessments());
    }
  };

  const handleNextQuestion = () => {
    console.log('Moving to next question');
    if (currentQuestionIndex < currentRiskCardQuestions.length - 1) {
      const fromIndex = currentQuestionIndex;
      const toIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(toIndex);
      setSelectedAnswers([]);
      setShowHint(false);

      // Emit navigation event
      socket?.emit('messageFromClient', {
        type: 'navigation',
        data: {
          cardId: selectedCard,
          fromQuestionIndex: fromIndex,
          toQuestionIndex: toIndex,
          action: 'next',
          timestamp: new Date().toISOString()
        }
      });

      // Emit question display event for the new question
      const nextQuestion = currentRiskCardQuestions[toIndex];
      socket?.emit('messageFromClient', {
        type: 'question_display',
        data: {
          cardId: selectedCard,
          questionIndex: toIndex,
          question: nextQuestion,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      // This is the last question - check if minimum answers are provided
      if (!hasMinimumAnswers()) {
        alert('You must answer at least 3 questions before completing this risk card assessment.');
        return;
      }
      
      console.log('Showing results');
      setShowResults(true);
      
      // Store assessment data when completed
      const assessmentData: AssessmentData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        selectedRoles,
        scores: [{
          cardId: selectedCard!,
          cardTitle: riskCards.find(c => c.id === selectedCard)?.title || '',
          score: calculateTotalScore(),
          maxScore: 25,
          answeredQuestions,
          selectedAnswers: finalAnswers
        }],
        hintCounts: hintCounts
      };
      assessmentStore.addAssessment(assessmentData);
      
      // Also save to database if user is authenticated
      saveAssessmentToDatabase(assessmentData);

      // Emit results display event
      socket?.emit('messageFromClient', {
        type: 'results_display',
        data: {
          cardId: selectedCard,
          totalScore: calculateTotalScore(),
          maxScore: 25,
          answers: currentRiskCardQuestions.map((q, index) => ({
            questionIndex: index,
            isCorrect: answeredQuestions[index],
            selectedAnswer: finalAnswers[index] !== undefined && finalAnswers[index] !== -1 ? q.options[finalAnswers[index]] : 'No answer selected',
            correctAnswer: q.options[q.correctAnswer],
            hintsUsed: hintCounts[index] || 0
          })),
          timestamp: new Date().toISOString()
        }
      });

      if (selectedCard && !completedRiskCards.includes(selectedCard)) {
        setCompletedRiskCards(prev => [...prev, selectedCard]);
      }

      setAssessments(assessmentStore.getAssessments());
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const fromIndex = currentQuestionIndex;
      const toIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(toIndex);
      setSelectedAnswers([]);
      setShowHint(false);

      // Emit navigation event
      socket?.emit('messageFromClient', {
        type: 'navigation',
        data: {
          cardId: selectedCard,
          fromQuestionIndex: fromIndex,
          toQuestionIndex: toIndex,
          action: 'previous',
          timestamp: new Date().toISOString()
        }
      });

      // Emit question display event for the previous question
      const prevQuestion = currentRiskCardQuestions[toIndex];
      socket?.emit('messageFromClient', {
        type: 'question_display',
        data: {
          cardId: selectedCard,
          questionIndex: toIndex,
          question: prevQuestion,
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  const handleBackToRoleSelection = () => {
    setRoleSelectionComplete(false);
    setSelectedCard(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowHints(false);
    setShowResults(false);
    setAnsweredQuestions([]);
    setHintCounts([]);
    setShowHint(false);
  };

  const navItems = [
    { name: "Home", link: "/", icon: <Shield className="h-4 w-4" /> },
    { name: "Assessments", link: "/assessments", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Resources", link: "/resources", icon: <Lock className="h-4 w-4" /> },
    { name: "Admin", link: "#", icon: <UserCog className="h-4 w-4" />, onClick: () => setShowAdminLogin(true) },
  ];

  const saveAssessmentToDatabase = async (assessmentData: AssessmentData) => {
    try {
      const token = localStorage.getItem('user_auth_token');
      if (!token) {
        console.log('No user token found, skipping database save');
        return;
      }

      const response = await fetch('http://localhost:3002/api/assessments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assessmentId: assessmentData.id,
          selectedRoles: assessmentData.selectedRoles,
          totalScore: assessmentData.scores.reduce((sum, score) => sum + score.score, 0),
          maxPossibleScore: assessmentData.scores.reduce((sum, score) => sum + score.maxScore, 0),
          timeTaken: 0, // Could be calculated if needed
          riskCardResults: assessmentData.scores
        })
      });

      if (response.ok) {
        console.log('Assessment saved to database successfully');
      } else {
        console.error('Failed to save assessment to database');
      }
    } catch (error) {
      console.error('Error saving assessment to database:', error);
    }
  };



  const fetchAdminAssessments = async (token: string) => {
    try {
      console.log('Fetching admin assessments from database...');
      const response = await fetch('http://localhost:3002/api/admin/assessments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Admin assessments fetched:', data.assessments);
        
        // Transform database assessments to match AssessmentData format
        const transformedAssessments = data.assessments.map((dbAssessment: any) => ({
          id: dbAssessment.id.toString(),
          timestamp: dbAssessment.completedAt,
          selectedRoles: dbAssessment.selectedRoles,
          scores: [{
            cardId: 'database-assessment',
            cardTitle: 'Database Assessment',
            score: dbAssessment.totalScore,
            maxScore: dbAssessment.maxPossibleScore,
            answeredQuestions: [], // Will be populated if needed
            selectedAnswers: []
          }],
          hintCounts: []
        }));
        
        setAssessments(transformedAssessments);
      } else {
        console.error('Failed to fetch admin assessments');
        // Fallback to local assessments
        setAssessments(assessmentStore.getAssessments());
      }
    } catch (error) {
      console.error('Error fetching admin assessments:', error);
      // Fallback to local assessments
      setAssessments(assessmentStore.getAssessments());
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Attempting admin login with:', adminCredentials);
    
    // Try to authenticate with the API first
    fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: adminCredentials.email,
        password: adminCredentials.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token && (data.user.roleLevel === 'admin' || data.user.roleLevel === 'super_admin')) {
        console.log('Admin login successful via API');
        localStorage.setItem('admin_auth_token', data.token);
        setIsAdmin(true);
        setShowAdminLogin(false);
        
        // Fetch assessments from database API
        fetchAdminAssessments(data.token);
        
        // Initialize session results
        setSessionRiskCardResults([]);
        
        // Register socket as admin
        console.log('Registering socket as admin:', socket?.id);
        socket?.emit('register', 'admin');
      } else {
        throw new Error('Invalid credentials or insufficient permissions');
      }
    })
    .catch(error => {
      console.log('API login failed, trying hardcoded credentials:', error);
      // Fallback to hardcoded credentials
      if (adminCredentials.email === 'admin@gmail.com' && adminCredentials.password === '123') {
        console.log('Admin login successful via hardcoded credentials');
        setIsAdmin(true);
        setShowAdminLogin(false);
        
        // Try to fetch assessments even with hardcoded credentials (without token)
        try {
          fetchAdminAssessments('');
          setSessionRiskCardResults([]);
        } catch (error) {
          console.log('Could not fetch from database, using local assessments');
          setAssessments(assessmentStore.getAssessments());
        }
        
        // Register socket as admin
        console.log('Registering socket as admin:', socket?.id);
        socket?.emit('register', 'admin');
      } else {
        console.log('Admin login failed');
        alert('Invalid credentials');
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleAdminLogout = () => {
    console.log('Admin logging out');
    setIsAdmin(false);
    setShowAdminLogin(false);
    setAdminCredentials({ email: '', password: '' });
    setAssessments([]);
    setSessionRiskCardResults([]);
    setShowSessionResults(false);
    // Clean up socket registration
    socket?.emit('register', 'none');
  };

  // Add user logout handler
  const handleUserLogout = () => {
    console.log('User logging out');
    setIsUserAuthenticated(false);
    setUserCredentials({ email: '', password: '' });
    setUserLoginError('');
    // Clean up socket registration
    socket?.emit('register', 'none');
  };

  // Add this inside the App component, before the existing functions
  const createProgressChartData = () => {
    // Define all 7 risk cards with their colors
    const allRiskCards = [
      { id: 'operational', title: 'Operational', color: '#FF8C00' },
      { id: 'ransom', title: 'Ransom Pay', color: '#FF4444' },
      { id: 'financial', title: 'Financial', color: '#32CD32' },
      { id: 'regulatory', title: 'Regulatory', color: '#4169E1' },
      { id: 'employment', title: 'Employee', color: '#FF69B4' },
      { id: 'crisis', title: 'Crisis', color: '#8A2BE2' },
      { id: 'strategic', title: 'Strategic', color: '#FF6347' }
    ];

    return allRiskCards.map(card => {
      // Find if this risk card has been completed
      const completedResult = sessionRiskCardResults.find(result => result.cardId === card.id);
      
      if (completedResult) {
        // Count correct answers from the answers array
        const correctCount = completedResult.answers.filter(answer => answer.isCorrect).length;
        return {
          name: card.title,
          correct: correctCount,
          total: 5,
          color: card.color,
          completed: true
        };
      } else {
        // Risk card not completed yet
        return {
          name: card.title,
          correct: 0,
          total: 5,
          color: '#E5E7EB', // Gray for not completed
          completed: false
        };
      }
    });
  };

  if (showAdminLogin) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
          <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          
          <div className="pt-24 relative z-20">
            <div className="max-w-md mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-8">
                  <UserCog className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h2>
                </div>
                
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={adminCredentials.email}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowAdminLogin(false)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      disabled={isLoading}
                    >
                      Back to Home
                    </button>
                    <button
                      type="submit"
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
          <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          
          <div className="pt-24 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('admin_auth_token');
                      if (token) {
                        fetchAdminAssessments(token);
                        setSessionRiskCardResults([]);
                      } else {
                        setAssessments(assessmentStore.getAssessments());
                      }
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
                  >
                    Refresh Data
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Add connected clients section in admin dashboard */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Connected Clients</h2>
                <div className="grid gap-4">
                  {connectedClients.length === 0 ? (
                    <p className="text-slate-600 dark:text-slate-400">No clients connected</p>
                  ) : (
                    connectedClients.map((client) => (
                      <div
                        key={client.id}
                        className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              Client {client.id.slice(0, 8)}...
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Connected: {new Date(client.connectedAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Last Activity: {new Date(client.lastActivity).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveClient(client.id)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              activeClient === client.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            }`}
                          >
                            {activeClient === client.id ? 'Viewing' : 'View'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add mirrored client view */}
              {mirroredQuestion && (
                <div className="mb-12 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Active Client View</h2>
                  
                  {/* Question Display */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Question {mirroredQuestion.questionIndex + 1}
                    </h3>
                    
                    {/* Scenario */}
                    {mirroredQuestion.question.scenario && (
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                        <h5 className="text-[1.25em] font-bold text-blue-800 dark:text-blue-300 mb-1">Scenario:</h5>
                        <p className="text-sm text-blue-700 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: mirroredQuestion.question.scenario || '' }} />
                      </div>
                    )}
                    
                    {/* Question Text */}
                    <p className="text-slate-700 dark:text-gray-300 mb-4">
                      {mirroredQuestion.question.question}
                    </p>
                    
                    {/* Options */}
                    <div className="space-y-3">
                      {mirroredQuestion.question.options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            mirroredAnswer?.selectedAnswerIndex === index
                              ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                              : 'bg-white dark:bg-slate-700'
                          }`}
                        >
                          {option}
                          {mirroredAnswer?.selectedAnswerIndex === index && (
                            <span className="ml-2 text-blue-600 dark:text-blue-400">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hints Used */}
                  {mirroredHints[mirroredQuestion.questionIndex] > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Hints Used:</h4>
                      <div className="space-y-2">
                        {Array.from({ length: mirroredHints[mirroredQuestion.questionIndex] }).map((_, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                            <p className="text-blue-800 dark:text-blue-200">
                              Hint {index + 1}: {mirroredQuestion.question.hints[index]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results Display */}
                  {mirroredResults && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Assessment Results</h3>
                      <p className="text-green-700 dark:text-green-300">
                        Score: {mirroredResults.totalScore}/{mirroredResults.maxScore}
                      </p>
                      <div className="mt-4 space-y-4">
                        {mirroredResults.answers.map((answer: any, index: number) => (
                          <div key={index} className="bg-white dark:bg-slate-700 p-3 rounded-lg">
                            <p className="font-medium text-slate-900 dark:text-white">Question {index + 1}</p>
                            <p className={`text-sm ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {answer.isCorrect ? 'Correct' : 'Incorrect'}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Selected: {answer.selectedAnswer}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Correct: {answer.correctAnswer}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Hints Used: {answer.hintsUsed}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}



              <div className="flex gap-4 mt-8">
                <button
                  disabled={assessments.length === 0}
                  onClick={() => {
                    setSelectedCard('final-analytics');
                    setShowFinalAnalytics(true);
                  }}
                  className={`px-6 py-3 rounded-lg font-bold transition ${
                    assessments.length === 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Final Analytics
                </button>
                
                <button
                  disabled={sessionRiskCardResults.length === 0}
                  onClick={() => setShowSessionResults(!showSessionResults)}
                  className={`px-6 py-3 rounded-lg font-bold transition ${
                    sessionRiskCardResults.length === 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {showSessionResults ? 'Hide' : 'View'} Session Results ({sessionRiskCardResults.length})
                </button>
              </div>

              {/* Session Results Section */}
              {showSessionResults && (
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Session Results</h2>
                    <button
                      onClick={() => setSessionRiskCardResults([])}
                      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Progress Bar Chart */}
                  <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Risk Card Progress (Correct Answers)
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={createProgressChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            stroke="#6B7280"
                          />
                          <YAxis 
                            domain={[0, 5]} 
                            tick={{ fontSize: 12 }}
                            stroke="#6B7280"
                          />
                          <Tooltip 
                            formatter={(value, name) => [`${value}/5`, 'Correct Answers']}
                            labelFormatter={(label) => `${label} Risk Card`}
                          />
                          <Bar 
                            dataKey="correct" 
                            radius={[4, 4, 0, 0]}
                          >
                            {createProgressChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 text-center">
                      Shows correct answers out of 5 questions per risk card. Gray bars indicate incomplete risk cards.
                    </div>
                  </div>

                  {/* Existing detailed results */}
                  <div className="space-y-6">
                    {sessionRiskCardResults.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-slate-600 dark:text-slate-400">No risk cards completed yet in this session.</p>
                      </div>
                    ) : (
                      sessionRiskCardResults.map((result: any, index: number) => (
                        <div key={index} className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {result.cardTitle}
                              </h3>
                              <p className="text-slate-600 dark:text-slate-400">
                                Completed: {new Date(result.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                {Math.round((result.totalScore / result.maxScore) * 100)}%
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {result.totalScore}/{result.maxScore}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-lg font-medium text-slate-900 dark:text-white">Question Results:</h4>
                            {result.answers.map((answer: any, answerIndex: number) => {
                              const question = result.questions?.[answerIndex];
                              const selectedAnswer = result.selectedAnswers?.[answerIndex];
                              return (
                                <div key={answerIndex} className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Question {answerIndex + 1}: {question?.question || 'Question not available'}
                                      </p>
                                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                        Selected: {selectedAnswer?.selectedAnswerText || answer.selectedAnswer}
                                      </p>
                                      <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                                        Correct: {question?.options?.[1] || answer.correctAnswer}
                                      </p>
                                      {answer.hintsUsed > 0 && (
                                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                          Hints used: {answer.hintsUsed}
                                        </p>
                                      )}
                                    </div>
                                    <div className={`text-xs px-2 py-1 rounded-full ${
                                      answer.isCorrect ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                      {answer.isCorrect ? 'Correct' : 'Incorrect'}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}



              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Risk Cards1</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {riskCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
                    whileHover={{ y: -5 }}
                  >
                    <div>
                      <RiskCardIcon iconName={card.icon} className="h-12 w-12 text-red-500" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                      <p className="text-slate-700 dark:text-gray-300 mb-4">{card.description}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Questions:</h4>
                          <ul className="list-disc list-inside text-slate-700 dark:text-gray-300">
                            {card.questions.map((q, index) => (
                              <li key={index} className="text-sm">{q.question}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Relevant Roles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {Array.from(new Set(card.questions.map(q => q.role))).map((role) => (
                              <span
                                key={role}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                disabled={completedRiskCards.length < 7}
                onClick={() => {
                  setSelectedCard('final-analytics');
                  setShowFinalAnalytics(true);
                }}
                className={`mt-8 px-6 py-3 rounded-lg font-bold transition ${
                  completedRiskCards.length < 7
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Final Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!roleSelectionComplete) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
          <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

          <div className="pt-24 relative z-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* NEW: Scenario Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">The Digital Deception Crisis</h2>
                    <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
                  </div>
                  
                  {/* Scenario Background */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Scenario Background</h3>
                    <div className="bg-slate-200/50 dark:bg-slate-700/50 rounded-lg p-6">
                      <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                        <strong>GlobalTech Solutions</strong>, a publicly traded technology consulting firm, faces an unprecedented crisis when sophisticated deepfake videos featuring their CEO surface across multiple social media platforms during a critical $200 million acquisition period.
                      </p>
                      <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                        Professional deepfake videos show CEO Michael Richardson announcing immediate layoffs of 2,500 employees, canceling major vendor contracts, and suggesting potential bankruptcy proceedings. The videos use footage from recent investor calls, making them highly convincing.
                      </p>
                      <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
                        The incident occurs during finalizing a major acquisition and preparing for an important investor conference. The timing appears deliberate, designed to maximize damage to the company's reputation, market position, and strategic initiatives.
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Event Timeline - Monday, July 21, 2025</h3>
                    <div className="space-y-4">
                      
                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-500">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">09:15 AM</span>
                          <p className="text-slate-700 dark:text-gray-300">Deepfake video surfaces on LinkedIn showing CEO announcing 2,500 layoffs. Video receives 1,000+ views within first hour.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-orange-500">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">10:00 AM</span>
                          <p className="text-slate-700 dark:text-gray-300">CFO receives urgent calls from investors and board members. Three major institutional investors threaten immediate divestment.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-yellow-500">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">10:45 AM</span>
                          <p className="text-slate-700 dark:text-gray-300">IT Security confirms deepfake characteristics. CEO verified to be in meetings with no planned announcements.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-600">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">11:30 AM</span>
                          <p className="text-slate-700 dark:text-gray-300">Additional deepfake videos surface on Twitter and YouTube about $50M vendor contract cancellations.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-600">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">12:15 PM</span>
                          <p className="text-slate-700 dark:text-gray-300">Major vendors demand clarification. HR overwhelmed with 40+ employee calls. Teams in panic mode.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-700">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">01:00 PM</span>
                          <p className="text-slate-700 dark:text-gray-300">Stock price drops 12%. Market cap loses $150 million. Panic selling begins.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-700">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">01:45 PM</span>
                          <p className="text-slate-700 dark:text-gray-300">SEC sends formal inquiry about material disclosures. Regulatory investigations may follow.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-800">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">02:30 PM</span>
                          <p className="text-slate-700 dark:text-gray-300">Major client threatens contract review. Three business news outlets request immediate comment.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-900">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">03:15 PM</span>
                          <p className="text-slate-700 dark:text-gray-300">Employee resignations begin. $200 million acquisition target threatens deal termination.</p>
                        </div>
                      </div>

                      <div className="bg-white/60 dark:bg-slate-700/60 rounded-lg p-4 border-l-4 border-red-900">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">04:00 PM</span>
                          <p className="text-slate-700 dark:text-gray-300">Multiple regulatory authorities request information. FBI cybercrime unit contacts company. Criminal charges possible.</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 text-center">
                    <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-6 border border-red-200 dark:border-red-700">
                      <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Crisis Response Required</h4>
                      <p className="text-red-700 dark:text-red-300">
                        Your organization needs immediate action across all departments. Select your role below to begin the incident response assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Existing "Select your Roles" section continues here */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <Shield className="h-20 w-20 text-blue-500 dark:text-blue-600 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Select your Roles</h1>
                <p className="text-xl text-slate-700 dark:text-gray-300">Choose one or more roles to begin your specialized assessment</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="h-8 w-8 text-blue-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">General Assessment</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-gray-300">
                      A comprehensive tabletop exercise designed to test your organization's incident response capabilities across all domains.
                    </p>
                    <div className="bg-slate-200/50 dark:bg-slate-700/50 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What to Expect:</h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300">
                        <li>Cross-functional scenario-based challenges</li>
                        <li>Real-world incident response simulations</li>
                        <li>Decision-making under pressure</li>
                        <li>Team coordination exercises</li>
                        <li>Risk assessment across multiple domains</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Benefits:</h3>
                      <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
                        <li>Identify gaps in incident response procedures</li>
                        <li>Improve cross-team communication</li>
                        <li>Test and validate response playbooks</li>
                        <li>Enhance overall security posture</li>
                      </ul>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex justify-center mt-6"
                    >
                      <button
                        onClick={handleStartGenericAssessment}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Start General Assessment
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="h-8 w-8 text-blue-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Role-Based Assessment</h2>
                  </div>
                  <p className="text-slate-700 dark:text-gray-300 mb-6">Select one or more roles to take a specialized assessment.</p>
                  
                  <div className="bg-slate-200/50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What to Expect:</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300">
                      <li>Role-specific scenarios and challenges</li>
                      <li>Tailored questions for your expertise</li>
                      <li>Focused assessment on your responsibilities</li>
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="max-h-[300px] overflow-y-auto pr-4 role-scrollbar">
                      <div className="grid grid-cols-1 gap-3">
                        {roles.map((role, index) => (
                          <motion.div
                            key={role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            onClick={() => handleRoleSelect(role)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                              selectedRoles.includes(role)
                                ? 'bg-blue-600/90 border-2 border-blue-400 shadow-lg scale-105'
                                : 'bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-600/80'
                            }`}
                          >
                            <h3 className={`font-medium text-lg ${
                              selectedRoles.includes(role)
                                ? 'text-white'
                                : 'text-slate-900 dark:text-white'
                            }`}>{role}</h3>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-100/80 dark:from-slate-800/80 to-transparent pointer-events-none rounded-b-xl"></div>
                  </div>

                  {selectedRoles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex justify-center mt-6"
                    >
                      <button
                        onClick={handleStartRoleBasedAssessment}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Start Assessment
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400">
                <ShieldIcon className="h-6 w-6" />
                <span>© 2025 Deepfake Protection. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>

        {/* User Selection Popup - MOVED INSIDE ROLE SELECTION PAGE */}
        <AnimatePresence>
          {showUserSelection && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm"
              style={{ zIndex: 99999 }}
              data-testid="user-selection-popup"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
                style={{ zIndex: 100000 }}
              >
                {/* Fixed Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-600 flex-shrink-0">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
                    Select User for Assessment
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center mt-2">
                    Choose which user will take the assessment for selected roles
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    {/* Selected Roles Display */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Selected Roles:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoles.map((role) => (
                          <span
                            key={role}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Loading State */}
                    {isLoadingUsers && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">Loading users...</p>
                      </div>
                    )}

                    {/* Error State */}
                    {userSelectionError && (
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
                        <p className="text-red-700 dark:text-red-300">{userSelectionError}</p>
                        <button
                          onClick={fetchAvailableUsers}
                          className="mt-2 text-red-600 dark:text-red-400 hover:underline text-sm"
                        >
                          Try again
                        </button>
                      </div>
                    )}

                    {/* Users List */}
                    {!isLoadingUsers && !userSelectionError && (
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Available Users:</h4>
                        {availableUsers.length === 0 ? (
                          <div className="text-center py-8">
                            <Users className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-600 dark:text-slate-400">No users found</p>
                          </div>
                        ) : (
                          <div className="grid gap-3">
                            {availableUsers.map((user) => (
                              <motion.div
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                  selectedUser?.id === user.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-white font-semibold text-sm">
                                        {user.firstName[0]}{user.lastName[0]}
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h5 className="font-semibold text-slate-900 dark:text-white truncate">
                                        {user.firstName} {user.lastName}
                                      </h5>
                                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                                        {user.email}
                                      </p>
                                      {user.department && (
                                        <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
                                          {user.department}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0 ml-3">
                                    {selectedUser?.id === user.id && (
                                      <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fixed Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-600 flex justify-end space-x-3 flex-shrink-0">
                  <button
                    onClick={handleUserSelectionCancel}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUserSelectionConfirm}
                    disabled={!selectedUser}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedUser
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Start Assessment
                  </button>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (!isUserAuthenticated && roleSelectionComplete && selectedRoles.length > 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50 flex items-center justify-center">
          <form
            onSubmit={e => {
              e.preventDefault();
              setIsUserLoading(true);
              
              // Authenticate against the API
              fetch('http://localhost:3002/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: userCredentials.email,
                  password: userCredentials.password
                })
              })
              .then(response => response.json())
              .then(data => {
                if (data.token) {
                  // Check if the logged-in user matches the selected user
                  if (selectedUser && data.user.email !== selectedUser.email) {
                    throw new Error(`These credentials don't match the selected user (${selectedUser.firstName} ${selectedUser.lastName}). Please use the correct credentials for this user.`);
                  }
                  
                  console.log('User login successful via API');
                  localStorage.setItem('user_auth_token', data.token);
                  setIsUserAuthenticated(true);
                  setUserLoginError('');
                } else {
                  throw new Error(data.error || 'Login failed');
                }
              })
              .catch(error => {
                console.log('User login failed:', error);
                setUserLoginError(error.message || 'Invalid credentials');
              })
              .finally(() => {
                setIsUserLoading(false);
              });
            }}
            className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              {selectedUser ? 
                `Login as ${selectedUser.firstName} ${selectedUser.lastName}` : 
                "User Login"
              }
            </h2>
            
            {userLoginError && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">{userLoginError}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={userCredentials.email}
                onChange={e => setUserCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
                disabled={isUserLoading}
                placeholder={selectedUser ? `Enter ${selectedUser.email}` : "Enter your email"}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={userCredentials.password}
                onChange={e => setUserCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
                disabled={isUserLoading}
                placeholder="Enter password (123)"
              />
            </div>
            <button
              type="submit"
              disabled={isUserLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isUserLoading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedUser ? 
                  `Use credentials for: ${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.email})` :
                  "Select a user first to see required credentials"
                }
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <GridBackgroundDemo />
      <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
        <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

        <div className="pt-24 relative z-20">
          <header className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={handleBackToRoleSelection}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Role Selection
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Selected Roles:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Shield className="h-20 w-20 text-blue-500 dark:text-blue-600 mx-auto mb-8" />
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Deepfake Attack Scenario
                </h1>
                <p className="text-xl text-slate-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  The Security Operations Center (SOC) has detected a sophisticated deepfake attack targeting company executives and critical communications. 
                  Multiple fake videos and audio recordings are being circulated, potentially causing reputational damage and financial fraud. 
                  As the IT Security Lead, you must coordinate the incident response while ensuring business continuity and protecting the company's reputation.
                </p>
              </div>
            </div>
          </header>

          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Risk Cards</h2>
             
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRiskCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                      selectedCard === card.id ? 'ring-2 ring-blue-500' : ''
                    } ${
                      completedRiskCards.includes(card.id) ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      {completedRiskCards.includes(card.id) && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <RiskCardIcon iconName={card.icon} className="h-12 w-12 text-red-500" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                      <p className="text-slate-700 dark:text-gray-300">{card.description}</p>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Relevant Roles:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedRoles.map((role) => (
                            <span 
                              key={role}
                              className={`px-2 py-1 rounded-full text-xs ${
                                selectedRoles.includes(role)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-gray-300'
                              }`}
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      {completedRiskCards.includes(card.id) && (
                        <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                disabled={completedRiskCards.length < 7}
                onClick={() => {
                  setSelectedCard('final-analytics');
                  setShowFinalAnalytics(true);
                }}
                className={`mt-8 px-6 py-3 rounded-lg font-bold transition ${
                  completedRiskCards.length < 7
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Final Analytics
              </button>
            </div>
          </section>

          <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400">
                <ShieldIcon className="h-6 w-6" />
                <span>© 2025 Deepfake Protection. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>

        <AnimatePresence>
          {selectedCard && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedCard(null);
                }
              }}
            >
              <div 
                className={`bg-white dark:bg-slate-800 rounded-xl overflow-y-auto shadow-2xl ${
                  showAnalytics || showFinalAnalytics ? 'w-[90%] h-[90%]' : 'w-[95%] h-[95%]'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8 h-full flex flex-col">
                  <button 
                    onClick={() => {
                      setSelectedCard(null);
                      setShowAnalytics(false);
                      setShowFinalAnalytics(false);
                    }}
                    className="mb-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Risk Cards
                  </button>
                  
                  <h3 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white flex-shrink-0">
                    {showFinalAnalytics ? 'Final Analytics Dashboard' : showAnalytics ? 'Analytics Dashboard' : riskCards.find(c => c.id === selectedCard)?.title + ' Assessment'}
                  </h3>
                 
                  <div className="flex-grow overflow-y-auto">
                    {showFinalAnalytics ? (
                      <div className="p-4">
                        <div className="mb-8">
                          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Risk Card Summary</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {assessments.map((assessment) => (
                              assessment.scores.map((score) => (
                                <div key={score.cardId} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2">{score.cardTitle}</h5>
                                  <div className="space-y-2">
                                    <p className="text-slate-700 dark:text-gray-300">
                                      Correct Answers: {score.answeredQuestions.filter(Boolean).length}/{score.answeredQuestions.length}
                                    </p>
                                    <p className="text-slate-700 dark:text-gray-300">
                                      Success Rate: {Math.round((score.score / score.maxScore) * 100)}%
                                    </p>
                                  </div>
                                </div>
                              ))
                            ))}
                          </div>
                        </div>
                        <Analytics
                          answeredQuestions={assessments.flatMap(a => a.scores.flatMap(s => s.answeredQuestions))}
                          hintCounts={assessments.flatMap(a => a.hintCounts || [])}
                          currentRiskCardQuestions={
                            assessments.flatMap(a =>
                              a.scores.flatMap(s => {
                                const card = riskCards.find(c => c.id === s.cardId);
                                // Only include the questions that were actually answered (should be 5 per card)
                                return card ? card.questions.slice(0, s.answeredQuestions.length) : [];
                              })
                            )
                          }
                          selectedRoles={
                            // Aggregate all roles the user selected across all assessments
                            Array.from(new Set(assessments.flatMap(a => a.selectedRoles)))
                          }
                          totalScore={assessments.reduce((total, a) => total + a.scores.reduce((sum, s) => sum + s.score, 0), 0)}
                        />
                      </div>
                    ) : !showAnalytics ? (
                      !getCurrentQuestion() ? (
                        <div className="p-6 text-center text-slate-700 dark:text-gray-300">
                          Loading question...
                        </div>
                      ) : showResults ? (
                        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Assessment Complete</h4>
                          <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="text-center">
                              <p className="text-lg text-slate-700 dark:text-gray-300 mb-4">
                                You have completed the {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management assessment.
                              </p>
                              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                                Score: {answeredQuestions.filter(Boolean).length}/{currentRiskCardQuestions.length}
                              </div>
                              <div className="text-slate-700 dark:text-gray-300 mb-6">
                                {answeredQuestions.filter(Boolean).length >= 4 ? (
                                  <p>Excellent performance! You demonstrated strong understanding of {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management.</p>
                                ) : answeredQuestions.filter(Boolean).length >= 3 ? (
                                  <p>Good job! You showed solid knowledge of {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management.</p>
                                ) : (
                                  <p>Keep practicing! Review the {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management concepts to improve your understanding.</p>
                                )}
                              </div>
                              {completedRiskCards.length === riskCards.length && (
                                <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                  <p className="text-indigo-700 dark:text-indigo-300">
                                    Congratulations! You have completed all risk card assessments. You can now view your final analytics.
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-center space-x-4">
                              <button
                                onClick={() => {
                                  if (completedRiskCards.length === riskCards.length) {
                                    setShowFinalAnalytics(true);
                                  } else {
                                    setSelectedCard(null);
                                    setShowResults(false);
                                  }
                                }}
                                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                              >
                                {completedRiskCards.length === riskCards.length ? 'View Final Analytics' : 'Move to Next Risk Card'}
                              </button>
                              <button
                                onClick={handleBackToRoleSelection}
                                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                Return to Home Screen
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {(() => {
                            const currentQ = getCurrentQuestion();
                            console.log('Current Question Object:', currentQ);
                            console.log('Scenario for Current Question:', currentQ?.scenario);
                            return null;
                          })()}

                          {getCurrentQuestion()?.scenario && (
                             <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                               <h5 className="text-[1.25em] font-bold text-blue-800 dark:text-blue-300 mb-1">Scenario:</h5>
                               <p className="text-sm text-blue-700 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: getCurrentQuestion()?.scenario || '' }} />
                             </div>
                           )}

                        <div className="mb-8">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h4 className="text-xl text-slate-900 dark:text-white">
                                Question {currentQuestionIndex + 1} of {currentRiskCardQuestions.length}
                              </h4>
                              <div className="flex items-center gap-4 mt-2">
                                <span className={`text-sm px-3 py-1 rounded-full ${
                                  hasMinimumAnswers() 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                }`}>
                                  Answered: {getAnsweredQuestionsCount()}/3 (minimum)
                                </span>
                                <span className={`text-sm px-3 py-1 rounded-full ${
                                  skippedQuestionsCount < 2
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                  Skipped: {skippedQuestionsCount}/2 (maximum)
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={handleHintClick}
                              disabled={hintCounts[currentQuestionIndex] >= (getCurrentQuestion()?.hints?.length || 0) || selectedAnswers.length > 0}
                              className={`flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 ${selectedAnswers.length > 0 ? 'cursor-not-allowed' : ''}`}
                            >
                              <span>💡</span>
                              <span>Hint ({(getCurrentQuestion()?.hints?.length || 0) - (hintCounts[currentQuestionIndex] || 0)} left)</span>
                            </button>
                          </div>

                           {showHint && getCurrentQuestion()?.hints && getCurrentQuestion()!.hints!.length >= hintCounts[currentQuestionIndex] && hintCounts[currentQuestionIndex] > 0 && (
                             <div className="bg-blue-100/50 dark:bg-blue-900/50 p-4 rounded-lg mb-4 animate-fade-in">
                               <p className="text-blue-900 dark:text-blue-200 font-semibold">Hint {hintCounts[currentQuestionIndex]}:</p>
                               <p className="text-blue-900 dark:text-blue-200">
                                 {getCurrentQuestion()!.hints?.[hintCounts[currentQuestionIndex] - 1]}
                               </p>
                             </div>
                           )}

                          <p className="text-lg text-slate-900 dark:text-gray-200 min-h-[60px]">
                            {getCurrentQuestion()?.question}
                          </p>
                        </div>

                        <div className="space-y-4 mb-8">
                          {getCurrentQuestion()?.options.map((option: string, index: number) => (
                            <button
                              key={index}
                              className={`w-full text-left p-4 rounded-lg transition-colors flex justify-between items-center border-2 ${
                                selectedAnswers.length > 0 
                                  ? 'cursor-not-allowed' 
                                  : 'hover:border-blue-500 dark:hover:border-blue-400'
                              } ${
                                selectedAnswers.includes(index)
                                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 dark:border-blue-400 text-blue-800 dark:text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-gray-200'
                              }`}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={selectedAnswers.length > 0}
                            >
                              <span>{option}</span>
                              {selectedAnswers.includes(index) && (
                                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              )}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-6 py-2 rounded-full transition-colors ${
                              currentQuestionIndex === 0
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-500 dark:text-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            Previous
                          </button>
                          
                          <button
                            onClick={handleSkipQuestion}
                            disabled={!canSkipMoreQuestions()}
                            className={`px-6 py-2 rounded-full transition-colors font-medium ${
                              canSkipMoreQuestions()
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-500 dark:text-gray-400'
                            }`}
                          >
                            Skip ({2 - skippedQuestionsCount} left)
                          </button>
                          
                          <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswers.length === 0}
                            className={`px-6 py-2 rounded-full transition-colors ${
                              selectedAnswers.length === 0
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-500 dark:text-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="p-4">
                      <div className="mb-6">
                        <button
                          onClick={() => setShowAnalytics(false)}
                          className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          ← Back to Results
                        </button>
                      </div>
                      <Analytics
                        answeredQuestions={assessments.flatMap(a => a.scores.flatMap(s => s.answeredQuestions))}
                        hintCounts={assessments.flatMap(a => a.hintCounts || [])}
                        currentRiskCardQuestions={
                          assessments.flatMap(a =>
                            a.scores.flatMap(s => {
                              const card = riskCards.find(c => c.id === s.cardId);
                              // Only include the questions that were actually answered (should be 5 per card)
                              return card ? card.questions.slice(0, s.answeredQuestions.length) : [];
                            })
                          )
                        }
                        selectedRoles={
                          // Aggregate all roles the user selected across all assessments
                          Array.from(new Set(assessments.flatMap(a => a.selectedRoles)))
                        }
                        totalScore={assessments.reduce((total, a) => total + a.scores.reduce((sum, s) => sum + s.score, 0), 0)}
                      />
                    </div>
                  )}
                </div>
              </div> 
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

export default App;