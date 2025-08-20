import { useState, useEffect } from 'react';
import { getTokens, getValidAccessToken, clearTokens, initiateLogin, authLogout, exchangeCodeForTokens } from '../services/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedTokens = getTokens();
        if (storedTokens) {
          const validToken = await getValidAccessToken();
          if (validToken) {
            setTokens(storedTokens);
            setIsAuthenticated(true);
          } else {
            clearTokens();
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearTokens();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    initiateLogin();
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
    setTokens(null);
  };

  const handleAuthCallback = async (code) => {
    try {
      setLoading(true);
      const newTokens = await exchangeCodeForTokens(code);
      setTokens(newTokens);
      setIsAuthenticated(true);
      window.history.replaceState({}, document.title, '/');
    } catch (error) {
      console.error('Auth callback failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated,
    tokens,
    loading,
    login,
    logout,
    handleAuthCallback,
  };
}