import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  if (!isAuthenticated() || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
