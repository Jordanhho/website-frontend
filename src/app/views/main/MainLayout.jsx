import React from 'react';
import { useLocation, Route, Switch, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import SecurityOutlinedIcon from '@material-ui/icons/SecurityOutlined';

import staticRoutes from "../../routes/static_routes";

import AboutMe from "./AboutMe";
import Apps from "./Apps";
import Home from "./Home";

function MainLayout() {
    const location = useLocation();

    return (
        <div>   
            <AppBar position="sticky">
                <Tabs
                    value={location.pathname}
                    indicatorColor="secondary"
                    textColor="inherit"
                    aria-label=""
                    centered
                >
                    <Tab
                        to={staticRoutes.main.home}
                        value={staticRoutes.main.home}
                        component={Link}
                        icon={<HomeOutlinedIcon />}
                        label="Home"
                    />
                    <Tab
                        to={staticRoutes.main.aboutMe}
                        value={staticRoutes.main.aboutMe}
                        component={Link}
                        icon={<AccountCircleOutlinedIcon />}
                        label="About Me"
                    />
                    <Tab
                        to={staticRoutes.main.apps}
                        value={staticRoutes.main.apps}
                        component={Link}
                        icon={<AppsOutlinedIcon />}
                        label="Apps"
                    />
                    <Tab
                        to={staticRoutes.admin.home}
                        value={staticRoutes.admin.home}
                        component={Link}
                        icon={<SecurityOutlinedIcon />}
                        label="Admin"
                    />
                </Tabs>
            </AppBar>

            <Switch>
                <Route
                    exact path={staticRoutes.main.home}
                    component={Home}
                />
                <Route
                    path={staticRoutes.main.aboutMe}
                    component={AboutMe}
                />
                <Route
                    path={staticRoutes.main.apps}
                    component={Apps}
                />
            </Switch>
        </div>
    )
}
export default MainLayout;