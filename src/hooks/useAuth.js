import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5050/api';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('careerpath_user');
    return saved ? JSON.parse(saved) : null;
  });

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Registration failed');

      const loggedUser = { username, email };
      setUser(loggedUser);
      localStorage.setItem('careerpath_user', JSON.stringify(loggedUser));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Login failed');

      const loggedUser = result.user;
      setUser(loggedUser);
      localStorage.setItem('careerpath_user', JSON.stringify(loggedUser));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careerpath_user');
  };

  return { user, register, login, logout, loading, error };
}
