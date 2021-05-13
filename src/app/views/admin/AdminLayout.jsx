import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useLocation, Route, Switch, Link  } from 'react-router-dom';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import Apps from "./Apps";
import AboutMe from "./AboutMe";
import Home from "../main/Home";

import staticRoutes from "../../routes/static_routes";

import moment from 'moment';

import { verifyTokenAsync, userLogoutAsync } from "../../redux/asyncActions/authAsyncActions";

import { setAuthTokenApi } from '../../services/auth_api';
// import { getUserListService } from '../../services/users_api';

import useStyles from "./styles";

// import {
//     isAuthenticated
// } from "../../api/admin-login-api";


function AdminLayout() {

    const dispatch = useDispatch();
    const authObj = useSelector(state => state.auth);

    const {token, expiredAt } = authObj;
    // const [userList, setUserList] = useState([]);

    // handle click event of the logout button
    const handleLogout = () => {
        dispatch(userLogoutAsync());
    }


    const location = useLocation();
    // const history = useHistory();

    //useSelector(state => state.loggedIn)

    const classes = useStyles();

    // set timer to renew token TODO figure this out
    useEffect(() => {
        console.log("set auth token!");
        setAuthTokenApi(token);
        const verifyTokenTimer = setTimeout(() => {
            dispatch(verifyTokenAsync(true));
        }, moment(expiredAt).diff() - 10 * 1000);
        return () => {
            clearTimeout(verifyTokenTimer);
        }
    }, [expiredAt, token, dispatch])

    
    

    // // get user list on page load
    // useEffect(() => {
    //     getUserList();
    // }, [getUserList]);



    // get user list
    // const getUserList = async () => {
    //     const result = await getUserListService();
    //     if (result.error) {
    //         dispatch(verifyTokenEnd());
    //         if (result.response && [401, 403].includes(result.response.status))
    //             dispatch(userLogout());
    //         return;
    //     }
    //     setUserList(result.data);
    // }

    // async function onLoad() {
    //     // try {
    //     //     await isAuthenticated();
    //     // } catch (e) {
    //     //     //redirect to 
    //     // }
    // }

    console.log(staticRoutes);

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
            {/* <b>User List:</b> */}
            {/* <pre>{JSON.stringify(userList, null, 2)}</pre> */}

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