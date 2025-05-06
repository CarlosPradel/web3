import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../auth/authUtils';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" />; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
