import React, { useEffect } from 'react';

import { Routes, Navigate } from 'react-router-dom';
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

    // verify accessToken on app load
    useEffect(() => {
        dispatch(verifyLoginSessionAsync());
    }, [dispatch]);

    //checking authentication
    if (authLoading) {
        return <div className="content">Checking Authentication...</div>
    }
    
    return (
        <div>
            <Routes>
                <PublicRoute 
                    path={staticRoutes.admin.login}
                    element={<LoginLayout />}
                    isAuthenticated={isAuthenticated} 
                />
                <PrivateRoute 
                    path={staticRoutes.admin.home}
                    element={<AdminLayout />}
                    isAuthenticated={isAuthenticated} 
                /> 
                <Navigate to={isAuthenticated 
                    ? staticRoutes.admin.home 
                    : staticRoutes.admin.login
                }/> 
            </Routes>
        </div>
    )
}

export default AuthLayout;