import React, { useState, useEffect, useCallback } from 'react';

import ReactHtmlParser from 'react-html-parser';
import GitHubIcon from '@material-ui/icons/GitHub';

import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Loader from "../../components/Loader";
import TitleBanner from "../../components/TitleBanner";

import useStyles from "./styles";

import {
    getAppsApi
} from "../../services/public_api";

function Apps() {
    const pageTitle = "My Projects";

    const classes = useStyles();

    const [appsData, setData] = useState([]);

    const [loaded, setLoaded] = useState(null);


    function getAppType(app_type) {
        switch(app_type) {
            case "web_app":
                return "Web application";
            case "android_app":
                return "Android Application";
            case "windows_app":
                return "Windows Application";
            default:
                return "An app";
        }
    }

    const fetchData = useCallback(async () => {
        const result = await getAppsApi();
        if (result.data) {
            setData(result.data);
            setLoaded(true);
        } 
        else {
            setLoaded(false);
        }
    }, []);

    useEffect(() => {
        document.title = pageTitle;
        fetchData();
    }, [fetchData]);

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
    if (loaded === false) {
        return (
            <div>
                Error, something went wrong.
            </div>
        );
    }

    return (
        <Container>
            <TitleBanner title={pageTitle} />
            <Box p={5}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        My Github
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>

                                    <div className={classes.iconInlineAlign}>
                                        <span className={classes.iconPadding}>
                                            <IconButton
                                                color="primary"
                                                aria-label="Github"
                                                onClick={() => window.open(appsData.github_url)}
                                                className={classes.iconInline}
                                            >
                                                <GitHubIcon
                                                    fontSize="large"
                                                    color="primary"
                                                    className={classes.iconInline}
                                                />
                                            </IconButton>
                                        </span>

                                        <Typography variant="h6">
                                            <Link
                                                href="#"
                                                color="inherit"
                                                onClick={() => window.open(appsData.github_url)}
                                            >
                                                GitHub
                                            </Link>
                                        </Typography>
                                    </div>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={6}>
                        <Grid item xs={12} align="left">
                        {appsData.apps.map((appDetails, index) => (
                            <Paper className={classes.paper} key={index}>
                                <Box p={5}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                {appDetails.app_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">
                                                {getAppType(appDetails.app_type)}
                                            </Typography>
                                        </Grid>

                                        <br />

                                        <Grid item xs={12} align="left">
                                            <Typography variant="body1">
                                                {ReactHtmlParser(appDetails.app_description)}
                                            </Typography>
                                        </Grid>
                                        <br />
                                        <Grid item xs={12}>
                                            <Typography variant="h5" color="primary">
                                                Status:
                                            </Typography>
                                        </Grid>

                                        {(appDetails.is_wip) ?
                                        <Grid item xs={12}>
                                            <Typography variant="body1">
                                                Coming soon! Work in progress!
                                            </Typography>
                                        </Grid>
                                        :
                                        <Grid item xs={12}>
                                            <Typography variant="h6">
                                                App Details:
                                            </Typography>
                                            <Typography variant="body1">
                                                <Link
                                                    href="#"
                                                    color="inherit"
                                                    onClick={() => window.open(appDetails.app_url)}
                                                >
                                                    {appDetails.app_url}
                                                </Link>
                                            </Typography>
                                        </Grid>}
                                        <br/>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="primary">
                                                Github:
                                            </Typography>
                                        </Grid>
                                            
                                        {(appDetails.is_github_private) ?
                                            <Grid item xs={12}>
                                                <Typography variant="h6" color="secondary">
                                                    Private
                                                </Typography>
                                            </Grid>
                                        :
                                        <Grid item xs={12}>
                                            <div className={classes.iconInlineAlign}>
                                                <span className={classes.iconPadding}>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Github"
                                                        onClick={() => window.open(appDetails.github_url)}
                                                        className={classes.iconInline}
                                                    >
                                                        <GitHubIcon
                                                            fontSize="large"
                                                            color="primary"
                                                            className={classes.iconInline}
                                                        />
                                                    </IconButton>
                                                </span>

                                                <Typography variant="h6">
                                                    <Link
                                                        href="#"
                                                        color="inherit"
                                                        onClick={() => window.open(appDetails.github_url)}
                                                    >
                                                        {appDetails.app_name}
                                                    </Link>
                                                </Typography>
                                            </div>
                                        </Grid>}
                                    </Grid>
                                </Box>
                            </Paper>
                        ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>     
    );
}
export default Apps;