import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5050/api';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('careerpath_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isLocal = window.location.hostname === 'localhost';

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      let loggedUser;
      
      if (!isLocal) {
        // --- MOCK BACKEND FOR NETLIFY (localStorage) ---
        await new Promise(r => setTimeout(r, 600)); // Simulate network
        const users = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
        if (users.find(u => u.username === username)) throw new Error('Username already exists');
        users.push({ username, email, password });
        localStorage.setItem('mock_db_users', JSON.stringify(users));
        loggedUser = { username, email };
      } else {
        // --- REAL BACKEND (Localhost) ---
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Registration failed');
        loggedUser = { username, email };
      }

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
      let loggedUser;

      if (!isLocal) {
        // --- MOCK BACKEND FOR NETLIFY (localStorage) ---
        await new Promise(r => setTimeout(r, 600));
        const users = JSON.parse(localStorage.getItem('mock_db_users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        loggedUser = { username: user.username, email: user.email };
      } else {
        // --- REAL BACKEND (Localhost) ---
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Login failed');
        loggedUser = result.user;
      }

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
