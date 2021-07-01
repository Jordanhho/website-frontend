import React from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';

import staticRoutes from "../../routes/static_routes";

import useStyles from "./styles";

import AboutMe from "./AboutMe";
import Apps from "./Apps";
import Home from "./Home";
import ResumeDisplay from "./ResumeDisplay";
import AboutWebsite from "./AboutWebsite";
import ContactMe from "./ContactMe";

import NavBar from"../../components/NavBar";

function MainLayout() {
    const location = useLocation();
    const classes = useStyles();

    const navList = [
        {
            to: staticRoutes.main.home,
            name: "Home"
        },
        {
            to: staticRoutes.main.apps,
            name: "My Projects"
        },
        {
            to: staticRoutes.main.resumeDisplay,
            name: "Resume"
        },
        {
            to: staticRoutes.main.aboutMe,
            name: "About Me"
        },
        {
            to: staticRoutes.main.contactMe,
            name: "Contact Me"
        },
        {
            to: staticRoutes.main.aboutWebsite,
            name: "About Website"
        },
    ];

    return (
        <div className={classes.root}>   
            <NavBar
                navList={navList}
                personal_website={staticRoutes.main.home}
                login={staticRoutes.admin.home}
                location={location.pathname}
        
            />
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