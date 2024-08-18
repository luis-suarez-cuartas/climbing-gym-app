
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, isAdmin } from '../services/auth'; 

const AdminPrivateRoute = ({ component: Component }) => {
    const isAuthenticated = getAccessToken();
    const userIsAdmin = isAdmin();

    return isAuthenticated && userIsAdmin ? <Component /> : <Navigate to="/admin-login" />;
};

export default AdminPrivateRoute;