import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  organization?: string;
  department?: string;
  roleLevel: 'user' | 'admin' | 'super_admin';
  createdAt?: string;
  lastLogin?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Context
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization?: string;
  department?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Base URL
const API_BASE_URL = 'http://localhost:3002/api';

// Auth Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch (error) {
        // Invalid data, clear localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  // Helper function for API calls
  const apiCall = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(state.token && { Authorization: `Bearer ${state.token}` }),
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  };

  // Login function
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Store token and user data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token: data.token } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Register function
  const register = async (userData: RegisterData) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      // Store token and user data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));

      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token: data.token } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    dispatch({ type: 'LOGOUT' });
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await apiCall('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData),
      });

      const updatedUser = { ...state.user!, ...userData };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await apiCall('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password change failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export type { User, AuthState, RegisterData };