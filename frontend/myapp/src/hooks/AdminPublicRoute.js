
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, isAdmin } from '../services/auth';

const AdminPublicRoute = ({ component: Component, restricted, ...rest }) => {
    const isAuthenticated = getAccessToken();
    const userIsAdmin = isAdmin();

    if (isAuthenticated && userIsAdmin && restricted) {
        return <Navigate to="/admin-dashboard" replace />;
    }

    return <Component {...rest} />;
};

export default AdminPublicRoute;