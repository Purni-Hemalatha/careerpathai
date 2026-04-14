import { useState } from 'react';

// All users stored as JSON array in localStorage
const USERS_KEY = 'careerpath_users';

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
};

const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

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
      if (!username || !email || !password)
        throw new Error('All fields are required');

      const users = getUsers();
      if (users.find(u => u.username === username))
        throw new Error('Username already exists');

      const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        created_at: new Date().toISOString()
      };
      saveUsers([...users, newUser]);

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
      const users = getUsers();
      const found = users.find(
        u => u.username === username && u.password === password
      );
      if (!found) throw new Error('Invalid credentials');

      const loggedUser = { username: found.username, email: found.email };
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
