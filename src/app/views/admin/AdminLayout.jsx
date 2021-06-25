import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Route, Switch, Link  } from 'react-router-dom';

import moment from 'moment';
import PersonalLogo from "../../assets/img/personal_logo.png";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import AdminApps from "./AdminApps";
import AdminAboutMe from "./AdminAboutMe";
import AdminHome from "./AdminHome";
import JordanHo from "./JordanHo";
import AdminResumeDisplay from "./AdminResumeDisplay";

import staticRoutes from "../../routes/static_routes";

import Loader from "../../components/Loader";

import { 
    verifyLoginSessionAsync, 
    userLogoutAsync 
} from "../../redux/asyncActions/authAsyncActions";

import { setAccessTokenApi } from '../../services/auth_api';

import useStyles from "./styles";
import StyledTab from "../../components/StyledTab";

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
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Link to={staticRoutes.main.home} className={classes.personlLogoBtn}>
                        <IconButton
                            aria-label="Home"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                        >
                            <img
                                className={(classes.homeIcon)}
                                src={PersonalLogo}
                                alt="Jordan Logo"
                            />
                        </IconButton>
                    </Link>
                    <Tabs
                        className={classes.tab}
                        value={location.pathname}
                        indicatorColor="secondary"
                        textColor="primary"
                        aria-label=""
                        centered
                    >
                        <StyledTab
                            to={staticRoutes.admin.home}
                            value={staticRoutes.admin.home}
                            component={Link}
                            label="Manage Settings"
                        />
                        <StyledTab
                            to={staticRoutes.admin.apps}
                            value={staticRoutes.admin.apps}
                            component={Link}
                            label="Manage My Projects"
                        />
                        <StyledTab
                            to={staticRoutes.admin.resumeDisplay}
                            value={staticRoutes.admin.resumeDisplay}
                            component={Link}
                            label="Manage Resume"
                        />
                        <StyledTab
                            to={staticRoutes.admin.aboutMe}
                            value={staticRoutes.admin.aboutMe}
                            component={Link}
                            label="Manage About Me"
                        />
                        <StyledTab
                            to={staticRoutes.admin.jordanHo}
                            value={staticRoutes.admin.jordanHo}
                            component={Link}
                            label="Manage Jordan Ho"
                        />  
                    </Tabs>
                    <div className={classes.logoutBtn}>
                        <IconButton
                            aria-label="Admin Settings"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route
                    exact path={staticRoutes.admin.home}
                    component={AdminHome}
                />
                <Route
                    path={staticRoutes.admin.apps}
                    component={AdminApps}
                />
                <Route
                    path={staticRoutes.admin.resumeDisplay}
                    component={AdminResumeDisplay}
                />
                <Route
                    path={staticRoutes.admin.aboutMe}
                    component={AdminAboutMe}
                />
                <Route
                    path={staticRoutes.admin.jordanHo}
                    component={JordanHo}
                />
            </Switch> 
        </div>
    )
}
export default AdminLayout;