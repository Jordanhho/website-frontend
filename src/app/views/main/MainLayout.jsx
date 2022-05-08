import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';

import staticRoutes from "Routes/static_routes";

import useStyles from "./styles";

import AboutMe from "Main_view/AboutMe";
import Apps from "Main_view/Apps";
import Home from "Main_view/Home";
import ResumeDisplay from "Main_view/ResumeDisplay";
import AboutWebsite from "Main_view/AboutWebsite";
import ContactMe from "Main_view/ContactMe";

import NavBar from "Components/NavBar";

function MainLayout() {
    const location = useLocation();
    const classes = useStyles();

    const currPaths = staticRoutes.main;
    const navList = [
        {
            to: currPaths.abs,
            path: currPaths.relLink,
            name: currPaths.name,
            element: (
                <Home />
            )
        },
        {
            to: currPaths.apps.abs,
            path: currPaths.apps.relLink,
            name: currPaths.apps.name,
            element: (
                 <Apps />
            )
        },
        {
            to: currPaths.resumeDisplay.abs,
            path: currPaths.resumeDisplay.relLink,
            name: currPaths.resumeDisplay.name,
            element: (
                <ResumeDisplay />
            )
        },
        {
            to: currPaths.aboutMe.abs,
            path: currPaths.aboutMe.relLink,
            name: currPaths.aboutMe.name,
            element: (
                <AboutMe />
            )
        },
        {
            to: currPaths.contactMe.abs,
            path: currPaths.contactMe.relLink,
            name: currPaths.contactMe.name,
            element: (
                <ContactMe />
            )
        },
        {
            to: currPaths.aboutWebsite.abs,
            path: currPaths.aboutWebsite.relLink,
            name: currPaths.aboutWebsite.name,
            element: (
                <AboutWebsite />
            )
        },
    ];

    return (
        <div className={classes.root}>   
            <NavBar
                navList={navList}
                personal_website={currPaths.abs}
                login={staticRoutes.admin.login.abs}
                location={location.pathname}
            />
            <Routes>
                {navList.map((nav, index) => {
                    return (
                        <Route
                            key={`main-route-${index}`}
                            path={nav.path}
                            element={nav.element}
                        />
                    )
                })}
            </Routes>
        </div>
    )
}
export default MainLayout;