import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import staticRoutes from "../routes/static_routes";

import Copyright from "../components/Copyright";

import MainLayout from "./main/MainLayout";
import AuthLayout from "./admin/AuthLayout";
import NotFound from "./NotFound";

function AppLayout() {
    return (
        <div>
            <Switch>
                <Route
                    path={staticRoutes.admin.home}
                    component={AuthLayout}
                />
                <Route
                    path={staticRoutes.main.home}
                    component={MainLayout}
                />
                <Route component={NotFound} />
            </Switch>

            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppLayout;