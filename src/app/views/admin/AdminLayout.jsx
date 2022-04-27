import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Route, Routes } from 'react-router-dom';

import moment from 'moment';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import AdminApps from "./AdminApps";
import AdminAboutMe from "./AdminAboutMe";
import AdminHome from "./AdminHome";
import JordanHo from "./JordanHo";
import AdminResumeDisplay from "./AdminResumeDisplay";

import staticRoutes from "../../routes/static_routes";

import Loader from "../../components/Loader";

import NavBar from "../../components/NavBar";

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

    const navList = [
        {
            to: staticRoutes.admin.home,
            name: "Settings"
        },
        {
            to: staticRoutes.admin.apps,
            name: "Manage Projects"
        },
        {
            to: staticRoutes.admin.resumeDisplay,
            name: "Manage Resume"
        },
        {
            to: staticRoutes.admin.aboutMe,
            name: "Manage About Me"
        },
        {
            to: staticRoutes.admin.jordanHo,
            name: "Manage Jordan Ho"
        },
    ];

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
            <NavBar
                navList={navList}
                personal_website={staticRoutes.main.home}
                location={location.pathname}
                handleLogout={handleLogout}
            />
            <Routes>
                <Route
                    exact
                    path={staticRoutes.admin.home}
                    element={<AdminHome />}
                />
                <Route
                    path={staticRoutes.admin.apps}
                    element={<AdminApps />}
                />
                <Route
                    path={staticRoutes.admin.resumeDisplay}
                    element={<AdminResumeDisplay />}
                />
                <Route
                    path={staticRoutes.admin.aboutMe}
                    element={<AdminAboutMe />}
                />
                <Route
                    path={staticRoutes.admin.jordanHo}
                    element={<JordanHo />}
                />
            </Routes> 
        </div>
    )
}
export default AdminLayout;