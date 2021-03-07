import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import firebase, { auth } from "./firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (!user) return <Redirect to="/" />;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
