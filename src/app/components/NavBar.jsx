import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PersonalLogo from "../assets/img/personal_logo.png";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import StyledTab from "./StyledTab";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        personlLogoBtn: {
            cursor: "pointer",
            position: "absolute",
            padding: "6px",
            top: "0px",
            left: "0px",
            zIndex: "999"
        },
    },
    noLink: {
        textDecoration: "None",
    },
    fullList: {
        width: 'auto',
    },
    listNavItem: {
        color: "white"
    },
    selectedListNavItem: {
        color: theme.palette.primary.main,
        border: "1px solid " + theme.palette.primary.main,
    },
    settingsBtn: {
        position: "absolute",
        padding: "5px",
        top: "0px",
        right: "0px",
        zIndex: "999"
    },
    appbar: {
        borderBottom: "1px solid " + theme.palette.primary.main,
        backgroundColor: "#303030 !important"
    },
    locationLabel: {
        marginLeft: "10px",
        [theme.breakpoints.up('md')]: { //hide location label if screen is above xs
            display: 'none',
        },
        color: "white"
    },
    menuButton: {
        left: "5px",
        [theme.breakpoints.up('md')]: { //hide menu icon if screen is above xs
            display: 'none',
        },
    },
    tabs: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: { //hide tabs if below md
            display: 'none',
        },
    },
    homeIcon: {
        maxWidth: "25px",
        maxheight: "35px"
    },
    logoutBtn: {
        position: "absolute",
        padding: "6px",
        top: "0px",
        right: "0px",
    },
}));

function NavBar(props) {

    const classes = useStyles();
    const [toggleNav, setToggleNav] = useState(false)
    
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setToggleNav(open);
    };

    function getSelectedClass(currVal) {
        if (props.location === currVal) {
            return classes.selectedListNavItem
        }
        else {
            return classes.listNavItem
        }
    }

    function getCurrentPageName() {
        let currPageName = ""
        for(let item of props.navList) {
            if(item.to === props.location) {
                currPageName = item.name
            }
        }
        return currPageName
    }

    const list = (anchor) => (
        <div
            className={classes.fullList}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {props.navList.map((navItem, index) => (
                <Link to={navItem.to} key={index} className={classes.noLink}>
                    <ListItem button className={getSelectedClass(navItem.to)}>
                        <ListItemText primary={navItem.name} />
                    </ListItem>
                </Link>
            ))}
        </div>
    );

    return (
        <React.Fragment>
            <AppBar position="sticky" className={classes.appbar}>
                <Toolbar>
                    <Link to={props.personal_website} className={classes.personlLogoBtn}>
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
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon color="primary"/>
                    </IconButton>
                    <Typography variant="h5" className={classes.locationLabel}>
                        {getCurrentPageName()}
                    </Typography>

                    <Tabs
                        className={classes.tabs}
                        value={props.location || false}
                        indicatorColor="secondary"
                        textColor="primary"
                        aria-label=""
                        centered
                    >
                        {(props.navList.map((navItem, index) => (
                            <StyledTab
                                key={index}
                                to={navItem.to}
                                value={navItem.to}
                                component={Link}
                                label={navItem.name}
                            />
                        )))}
                    </Tabs>

                    {props.handleLogout && (
                        <div className={classes.logoutBtn}>
                            <IconButton
                                aria-label="Admin Settings"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="primary"
                                onClick={props.handleLogout}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </div>
                    )}

                    {props.login && (
                        <Link to={props.login} className={classes.settingsBtn}>
                            <IconButton
                                aria-label="Admin Settings"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="primary"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor={"top"}
                open={toggleNav}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list("top")}
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default NavBar;