import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import staticRoutes from "./static_routes";

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => !rest.isAuthenticated 
                ? <Component {...props} /> 
                : <Navigate to={{ pathname: staticRoutes.admin.home }} />
            }
        />
    )
}

export default PublicRoute;