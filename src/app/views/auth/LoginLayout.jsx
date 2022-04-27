import React from "react";
import { Route, Routes } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Login from "./Login";
import SignUp from "./SignUp";
import ActivateAccount from "./ActivateAccount";

import ChangePassword from "./ChangePassword";

import staticRoutes from "../../routes/static_routes";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: 0
    },
}));

function LoginLayout() {
    const classes = useStyles();
    return (
        <div>
            <Button 
                href={staticRoutes.main.home}
                color="primary"
                disableElevation
                startIcon={<ArrowBackIosIcon />}
                className={classes.button}
            >
                Back Home
            </Button>
            <Routes>
                <Route
                    path={staticRoutes.admin.activateAccount}
                    element={<ActivateAccount />}
                />
                <Route
                    path={staticRoutes.admin.signUp}
                    element={<SignUp />}
                />
                <Route
                    path={staticRoutes.admin.forgotPassword}
                    element={<ChangePassword />}
                />
                <Route
                    path={staticRoutes.admin.login}
                    element={<Login />}
                />
            </Routes>
        </div>
    );
}

export default LoginLayout;