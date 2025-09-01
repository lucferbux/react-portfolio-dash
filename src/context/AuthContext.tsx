import React, { createContext, useContext, useEffect, useState } from 'react';
import { authUtils } from '../utils/auth';
import type { User } from '../model/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const checkAuth = () => {
      if (authUtils.isAuthenticated()) {
        const currentUser = authUtils.getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();

    // Set up token expiry monitoring
    const interval = setInterval(() => {
      if (!authUtils.isAuthenticated()) {
        setUser(prevUser => prevUser ? null : prevUser);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []); // Remove user dependency to prevent infinite re-renders

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const token = await authUtils.mockLogin(username, password);
      authUtils.setToken(token);
      const currentUser = authUtils.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authUtils.removeToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user && authUtils.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}