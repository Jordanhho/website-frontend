import React from 'react';
import { useLocation, Route, Switch, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonalLogo from "../../assets/img/personal_logo.png";

import staticRoutes from "../../routes/static_routes";

import useStyles from "./styles";
import StyledTab from "../../components/StyledTab";

import AboutMe from "./AboutMe";
import Apps from "./Apps";
import Home from "./Home";
import ResumeDisplay from "./ResumeDisplay";
import AboutWebsite from "./AboutWebsite";
import ContactMe from "./ContactMe";

function MainLayout() {
    const location = useLocation();
    const classes = useStyles();

    return (
        <div className={classes.root}>   
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Link to={staticRoutes.personal_website} className={classes.personlLogoBtn}>
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
                            to={staticRoutes.main.home}
                            value={staticRoutes.main.home}
                            component={Link}
                            label="Home"
                        />
                        <StyledTab
                            to={staticRoutes.main.apps}
                            value={staticRoutes.main.apps}
                            component={Link}
                            label="My Projects"
                        />
                        <StyledTab
                        to={staticRoutes.main.resumeDisplay}
                            value={staticRoutes.main.resumeDisplay}
                            component={Link}
                            label="Resume"
                        />
                        <StyledTab
                            to={staticRoutes.main.aboutMe}
                            value={staticRoutes.main.aboutMe}
                            component={Link}
                            label="About Me"
                        />
                        <StyledTab
                            to={staticRoutes.main.contactMe}
                            value={staticRoutes.main.contactMe}
                            component={Link}
                            label="Contact Me"
                        />
                        <StyledTab
                        to={staticRoutes.main.aboutWebsite}
                            value={staticRoutes.main.aboutWebsite}
                            component={Link}
                            label="About Website"
                        />
                    </Tabs>
                    <Link to={staticRoutes.admin.home} className={classes.settingsBtn}>
                        <IconButton
                            aria-label="Admin Settings"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="primary"
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>

            <Switch>
                <Route
                    exact path={staticRoutes.main.home}
                    component={Home}
                />
                <Route
                    path={staticRoutes.main.apps}
                    component={Apps}
                />
                <Route
                    path={staticRoutes.main.resumeDisplay}
                    component={ResumeDisplay}
                />
                <Route
                    path={staticRoutes.main.aboutMe}
                    component={AboutMe}
                />
                <Route
                    path={staticRoutes.main.contactMe}
                    component={ContactMe}
                />
                <Route
                    path={staticRoutes.main.aboutWebsite}
                    component={AboutWebsite}
                />
            </Switch>
        </div>
    )
}
export default MainLayout;