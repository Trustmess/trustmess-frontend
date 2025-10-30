import { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null -> if user not ligined
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const saveUser = localStorage.getItem('user');
    if (saveUser) {
      setUser(JSON.parse(saveUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout, loading }),
    [user, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
