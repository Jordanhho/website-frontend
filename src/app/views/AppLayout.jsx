import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import staticRoutes from "../routes/static_routes";

import Copyright from "../components/Copyright";

import MainLayout from "./main/MainLayout";
import AuthLayout from "./admin/AuthLayout";
import NotFound from "./NotFound";

function AppLayout() {
    return (
        <div>
            <Routes>
                <Route
                    path={staticRoutes.admin.home}
                    element={<AuthLayout />}
                />
                <Route
                    path={staticRoutes.main.home}
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