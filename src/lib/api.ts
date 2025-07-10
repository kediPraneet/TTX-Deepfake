// API utility functions for fetching questions from database

const API_BASE_URL = 'http://localhost:3002/api';

// Fetch questions for role-based assessment
export const fetchQuestionsByRoles = async (roles: string[], limit: number = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roles, limit }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching questions by roles:', error);
    throw error;
  }
};

// Fetch questions for general assessment
export const fetchGeneralQuestions = async (limit: number = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/general?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching general questions:', error);
    throw error;
  }
};

// Fetch questions by specific role and risk card
export const fetchQuestionsByRoleAndCard = async (roleId: number, cardId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/role/${roleId}/card/${cardId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching questions by role and card:', error);
    throw error;
  }
};

// Fetch all available roles
export const fetchRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.roles;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// Fetch all risk cards
export const fetchRiskCards = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/risk-cards`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.riskCards;
  } catch (error) {
    console.error('Error fetching risk cards:', error);
    throw error;
  }
};

// Fetch question count by role
export const fetchQuestionCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/count`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching question count:', error);
    throw error;
  }
};

// Types for API responses
export interface Question {
  id: number;
  question: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints: string[];
  role: string;
  cardTitle?: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface RiskCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
}

export interface QuestionCount {
  roleCount: { role: string; count: number }[];
  totalQuestions: number;
} 