import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';

import moment from 'moment';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import AdminApps from "Admin_view/AdminApps";
import AdminAboutMe from "Admin_view/AdminAboutMe";
import AdminHome from "Admin_view/AdminHome";
import JordanHo from "Admin_view/JordanHo";
import AdminResumeDisplay from "Admin_view/AdminResumeDisplay";

import staticRoutes from "Routes/static_routes";

import Loader from "Components/Loader";
import NavBar from "Components/NavBar";

import { 
    verifyLoginSessionAsync, 
    userLogoutAsync 
} from "Redux/asyncActions/authAsyncActions";

import { setAccessTokenApi } from 'Services/auth_api';

import useStyles from "./styles";

function AdminLayout(props) {
    const location = useLocation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const authObj = useSelector(state => state.auth);

    const { accessToken, expiredAt } = authObj;

    // handle click event of the logout button
    const handleLogout = () => {
        dispatch(userLogoutAsync());
    }

    const currPaths = staticRoutes.admin;
    const navList = [
        {
            to: currPaths.abs,
            path: currPaths.relLink,
            name: currPaths.name,
            element: (
                <AdminHome />
            )
        },
        {
            to: currPaths.apps.abs,
            path: currPaths.apps.relLink,
            name: currPaths.apps.name,
            element: (
                <AdminApps />
            )
        },
        {
            to: currPaths.resumeDisplay.abs,
            path: currPaths.resumeDisplay.relLink,
            name: currPaths.resumeDisplay.name,
            element: (
                <AdminResumeDisplay />
            )
        },
        {
            to: currPaths.aboutMe.abs,
            path: currPaths.aboutMe.relLink,
            name: currPaths.aboutMe.name,
            element: (
                <AdminAboutMe />
            )
        },
        {
            to: currPaths.jordanHo.abs,
            path: currPaths.jordanHo.relLink,
            name: currPaths.jordanHo.name,
            element: (
                <JordanHo />
            )
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

    if (!props.isAuthenticated) {
        return <Navigate to={props.redirectTo} />;
    }

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
                personal_website={staticRoutes.main.abs}
                location={location.pathname}
                handleLogout={handleLogout}
            />
            <Routes>
                {navList.map((nav, index) => {
                    return (
                        <Route
                            key={`admin-route-${index}`}
                            path={nav.path}
                            element={nav.element}
                        />
                    )
                })}
            </Routes>
        </div>
    )
}
export default AdminLayout;