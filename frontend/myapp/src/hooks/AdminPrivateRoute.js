
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, isAdmin } from '../services/auth'; 


const AdminPrivateRoute = ({ component: Component }) => {
    const accessToken = getAccessToken();
    const adminCheck = isAdmin();
  
    console.log('AccessToken:', accessToken);
    console.log('IsAdmin:', adminCheck);
  
    return accessToken && adminCheck ? <Component /> : <Navigate to="/admin/login" />;
  };
  export default AdminPrivateRoute;