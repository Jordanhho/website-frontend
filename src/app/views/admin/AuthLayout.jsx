import React, { useEffect } from 'react';

import { 
    Routes, 
    Route,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import staticRoutes from "Routes/static_routes";

import AdminLayout from "Admin_view/AdminLayout";
import LoginLayout from "Auth_view//LoginLayout";

import { 
    verifyLoginSessionAsync
} from 'Redux/asyncActions/authAsyncActions';

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

    const currPaths = staticRoutes.admin;

    return (
        <div>
            <Routes>
                <Route
                    path={currPaths.login.layoutLink}
                    element={
                        <LoginLayout 
                            isAuthenticated={isAuthenticated} 
                            redirectTo={staticRoutes.admin.abs}
                        />
                    }
                />
                <Route
                    path={'/*'}
                    element={
                        <AdminLayout
                            isAuthenticated={isAuthenticated}
                            redirectTo={staticRoutes.admin.login.abs}
                        />
                    }
                />
            </Routes>
        </div>
    )
}

export default AuthLayout;