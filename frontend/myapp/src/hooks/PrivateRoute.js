import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../services/auth'; 

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        {...rest} 
        render={props => 
            getAccessToken() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        } 
    />
);

export default PrivateRoute;
