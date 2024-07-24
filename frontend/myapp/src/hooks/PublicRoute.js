import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../services/auth';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = getAccessToken();
  console.log('isAuthenticated:', isAuthenticated);
  console.log('restricted:', restricted);

  if (isAuthenticated && restricted) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default PublicRoute;
