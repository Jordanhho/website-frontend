import React, { useState, useEffect, useCallback } from 'react';

import GitHubIcon from '@material-ui/icons/GitHub';

import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Loader from "../../components/Loader";

import useStyles from "./styles";

import {
    getApps
} from "../../services/public_api";

function Apps() {
    const pageTitle = "My Projects";

    const classes = useStyles();

    const [apps, setData] = useState([]);

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
        const result = await getApps();
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
            <Box p={5}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={6}>
                        {apps.map((appDetails, index) => (
                            <Paper className={classes.paper} key={index}>
                                <Box p={5}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        {appDetails.app_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary">
                                        {getAppType(appDetails.app_type)}
                                    </Typography>
                                </Grid>

                                <br/>
                                <br/>

                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        {appDetails.app_description}
                                    </Typography>
                                </Grid>

                                <br/>
                                <br/>
                        
                                <Grid item xs={12}>
                                        <Typography variant="h5" color="primary">
                                        Status:
                                    </Typography>
                                </Grid>
                                
                                {(appDetails.is_wip) ?
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Coming soon! Work in progress!
                                    </Typography>
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        App Details:
                                    </Typography>
                                    <Typography variant="h6">
                                        <Link
                                            href="#"
                                            color="inherit"
                                            onClick={() => window.open(appDetails.app_url)}
                                        >
                                            {appDetails.app_url}
                                        </Link>
                                    </Typography>
                                </Grid>}

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
                                                GitHub
                                            </Link>
                                        </Typography>
                                    </div>
                                </Grid>
                                </Box>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Container>     
    );
}
export default Apps;