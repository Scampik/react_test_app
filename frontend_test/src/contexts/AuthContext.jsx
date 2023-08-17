/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [userName, setUserName] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (name) => setUserName(name);
  const logOut = () => {
    localStorage.removeItem('userId');
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ userName, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
