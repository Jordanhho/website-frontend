import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import staticRoutes from "./static_routes";

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => rest.isAuthenticated 
                ? <Component {...props} /> 
                : <Navigate to={{ pathname: staticRoutes.admin.login, state: { from: props.location } }} />
            }
        /> 
    )
}

export default PrivateRoute;