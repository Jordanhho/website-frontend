import React, { useEffect } from 'react';

import { Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PrivateRoute from "../../routes/PrivateRoute";
import PublicRoute from "../../routes/PublicRoute";

import AdminLayout from "./AdminLayout";
import LoginLayout from "../auth/LoginLayout";

import staticRoutes from "../../routes/static_routes";

import { 
    verifyLoginSessionAsync
} from '../../redux/asyncActions/authAsyncActions';

function AuthLayout() {

    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { authLoading, isAuthenticated } = authObj;

    // verify token on app load
    useEffect(() => {
        dispatch(verifyLoginSessionAsync());
    }, [dispatch]);

    // checking authentication
    if (authLoading) {
        return <div className="content">Checking Authentication...</div>
    }
    
    return (
        <div>
            <Switch>
                <PublicRoute 
                    path={staticRoutes.admin.login}
                    component={LoginLayout}
                    isAuthenticated={isAuthenticated} 
                />
                <PrivateRoute 
                    path={staticRoutes.admin.home}
                    component={AdminLayout}
                    isAuthenticated={isAuthenticated} 
                /> 
                <Redirect to={isAuthenticated 
                    ? staticRoutes.admin.home 
                    : staticRoutes.admin.login
                }/> 
            </Switch>
        </div>
    )
}

export default AuthLayout;