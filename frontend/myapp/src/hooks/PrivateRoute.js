import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../services/auth'; 

const PrivateRoute = ({ component: Component }) => {
    return getAccessToken() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
