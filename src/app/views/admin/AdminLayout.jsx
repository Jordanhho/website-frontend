import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Route, Switch, Link  } from 'react-router-dom';

import moment from 'moment';

import AccountBoxSharpIcon from '@material-ui/icons/AccountBoxSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Apps from "./Apps";
import AboutMe from "./AboutMe";
import AdminHome from "./AdminHome";

import staticRoutes from "../../routes/static_routes";

import Loader from "../../components/Loader";

import { 
    verifyLoginSessionAsync, 
    userLogoutAsync 
} from "../../redux/asyncActions/authAsyncActions";

import { setAccessTokenApi } from '../../services/auth_api';

import useStyles from "./styles";

function AdminLayout() {
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const authObj = useSelector(state => state.auth);

    const { accessToken, expiredAt } = authObj;

    // handle click event of the logout button
    const handleLogout = () => {
        dispatch(userLogoutAsync());
    }

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        await setAccessTokenApi(accessToken);
        setLoaded(true);
    }, [accessToken]);

    const sessionTimeoutTimer = useCallback(async () => {
        const verifyLoginSessionTimeOutTimer = setTimeout(() => {
            dispatch(verifyLoginSessionAsync(true));
        }, moment(expiredAt).diff() - 10 * 200);
        return () => {
            clearTimeout(verifyLoginSessionTimeOutTimer);
        }
    }, [dispatch, expiredAt]);

    useEffect(() => {
        fetchData();
        sessionTimeoutTimer();
    }, [fetchData, sessionTimeoutTimer]);

    if (loaded === null) {
        return (
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.loader}
                >
                    <Grid item xs={3}>
                        <Loader />
                    </Grid>

                </Grid>
            </Container>
        );
    }

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
                        icon={<ArrowBackSharpIcon />}
                        label="Back"
                    />
                    <Tab
                        to={staticRoutes.admin.home}
                        value={staticRoutes.admin.home}
                        component={Link}
                        icon={<HomeSharpIcon />}
                        label="Admin Home"
                    />
                    <Tab
                        to={staticRoutes.admin.aboutMe}
                        value={staticRoutes.admin.aboutMe}
                        component={Link}
                        icon={<AccountBoxSharpIcon/>}
                        label="Admin About Me"
                    />
                    <Tab
                        to={staticRoutes.admin.apps}
                        value={staticRoutes.admin.apps}
                        component={Link}
                        icon={<AppsSharpIcon />}
                        label="Admin Apps"
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
                    path={staticRoutes.admin.aboutMe}
                    component={AboutMe}
                />
                <Route
                    path={staticRoutes.admin.apps}
                    component={Apps}
                />
                <Route
                    path={staticRoutes.admin.home}
                    component={AdminHome}
                />
            </Switch> 
        </div>
    )
}
export default AdminLayout;