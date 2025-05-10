import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the UserContext
const UserContext = createContext({
  user: null,
  setUser: () => {
    throw new Error('setUser must be used within a UserProvider');
  },
  logout: () => {
    throw new Error('logout must be used within a UserProvider');
  },
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider to wrap the application and provide the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the current logged-in user
  const navigate = useNavigate();

  // Logout function to clear the user state and navigate to the login page
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the authentication token
    setUser(null); // Clear the user state
    navigate('/login'); // Redirect to the login page
  };
  

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
