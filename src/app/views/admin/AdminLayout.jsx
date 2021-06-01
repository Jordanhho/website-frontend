import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Route, Switch, Link  } from 'react-router-dom';

import moment from 'moment';


import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import Apps from "./Apps";
import AboutMe from "./AboutMe";
import Home from "../main/Home";

import staticRoutes from "../../routes/static_routes";

import { 
    verifyLoginSessionAsync, 
    userLogoutAsync 
} from "../../redux/asyncActions/authAsyncActions";

import { setAuthTokenApi } from '../../services/auth_api';

import useStyles from "./styles";

function AdminLayout() {
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const authObj = useSelector(state => state.auth);

    const { token, expiredAt } = authObj;

    // handle click event of the logout button
    const handleLogout = () => {
        dispatch(userLogoutAsync());
    }

    // set timer to renew token 
    useEffect(() => {
        setAuthTokenApi(token);
        const verifyLoginSessionTimeOutTimer = setTimeout(() => {
            dispatch(verifyLoginSessionAsync(true));
        }, moment(expiredAt).diff() - 10 * 200);
        return () => {
            clearTimeout(verifyLoginSessionTimeOutTimer);
        }
    }, [expiredAt, token, dispatch])

    return (
        <div> 
            <AppBar position="static">
                <Tabs
                    value={location.pathname}
                    indicatorColor="secondary"
                    textColor="inherit"
                    aria-label=""
                    centered
                >
                    <Tab
                        to={staticRoutes.admin.home}
                        value={staticRoutes.admin.home}
                        component={Link}
                        label="Admin Home"
                    />
                    <Tab
                        to={staticRoutes.admin.aboutMe}
                        value={staticRoutes.admin.aboutMe}
                        component={Link}
                        label="Admin About Me"
                    />
                    <Tab
                        to={staticRoutes.admin.apps}
                        value={staticRoutes.admin.apps}
                        component={Link}
                        label="Admin Apps"
                    />
                    <Tab
                        to={staticRoutes.main.home}
                        value={staticRoutes.main.home}
                        component={Link}
                        label="BACK"
                    />
                </Tabs>
            </AppBar>
            <Button
                color="primary"
                disableElevation
                startIcon={<ArrowBackIosIcon />}
                className={classes.button}
                onClick={handleLogout}
            >
                Logout
            </Button>
            <Switch>
                <Route
                    path={staticRoutes.main.home}
                    component={Home}
                />
                <Route
                    path={staticRoutes.admin.aboutMe}
                    component={AboutMe}
                />

                <Route
                    path={staticRoutes.admin.apps}
                    component={Apps}
                />
            </Switch> 
        </div>
    )
}
export default AdminLayout;