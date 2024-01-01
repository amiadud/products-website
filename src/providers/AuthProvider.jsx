// authContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = async (username, password) => {
    setLoading(true);
    const apiUrl = 'https://dummyjson.com/auth/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;
        setUser({ username, authToken });
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('username', username);
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }finally {
      setLoading(false);
      localStorage.setItem('loading', 'false'); 
    }
  };

  const logout = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.setItem('loading', 'false'); 
  };

  useEffect(() => {
    // Load user data from local storage on application startup
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setUser({ authToken: storedToken, username: storedUsername });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={
      { 
        user, 
        login,
        loading, 
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
