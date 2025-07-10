import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onClose?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onClose }) => {
  const { state, login, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (state.error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      await login(formData.email, formData.password);
      onClose?.();
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-slate-600 dark:text-slate-400">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
                disabled={state.isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
                disabled={state.isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={state.isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {state.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{state.error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={state.isLoading || !formData.email || !formData.password}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              state.isLoading || !formData.email || !formData.password
                ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {state.isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              disabled={state.isLoading}
            >
              Create one now
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 