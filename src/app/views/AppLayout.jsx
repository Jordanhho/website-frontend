import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import staticRoutes from "Routes/static_routes";

import Copyright from "Components/Copyright";

import MainLayout from "Main_view/MainLayout";
import AuthLayout from "Admin_view/AuthLayout";
import NotFound from "Views/NotFound";

function AppLayout() {
    return (
        <div>
            <Routes>     
                <Route
                    path={staticRoutes.admin.layoutLink}
                    element={<AuthLayout />}
                />
                <Route
                    path={staticRoutes.main.layoutLink}
                    element={<MainLayout />}
                />
                <Route element={<NotFound />} />
            </Routes>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppLayout;