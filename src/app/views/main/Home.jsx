import React, { useState, useEffect, useCallback } from 'react';

import moment from "moment";

import GitHubIcon from '@material-ui/icons/GitHub';

import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Clock from "../../components/Clock";
import Loader from "../../components/Loader";

import {
    getHome
} from "../../services/public_api";

import useStyles from "./styles";

function Home() {

    const classes = useStyles();

    const [homeData, setData] = useState([]);

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getHome();
        if (result.data) {
            setData(result.data);
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if(loaded === null) {
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

                <Box pd={10}>
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
                                        <Typography variant="h3" color="primary">
                                            Welcome!
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <Grid item xs={12}>
                                        <Typography variant="body1" gutterBottom>
                                            This my personal website to showcase my skills.
                                            <br/>
                                            The website is built with many mainstream technologies.
                                        </Typography>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box pd={10}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Box p={5} className={classes.center}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        spacing={3}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant="h3" color="primary">
                                                <Clock />
                                            </Typography>
                                            <Typography variant="body1">
                                                {moment().format("dddd, MMMM Do YYYY")}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="h4">
                                                {homeData.city}, {homeData.country}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} align="right">
                                            <img
                                                className={(classes.weatherIcon)}
                                                src={homeData.icon_url}
                                                alt="Weather Icon"
                                            />
                                        </Grid>

                                        <Grid item xs={6} align="left">
                                            <Typography variant="h4" align="left">
                                                {homeData.temperature_degrees}°C
                                                </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="h5">
                                                {homeData.weather_description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box pd={10}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Box p={5} className={classes.center}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        spacing={3}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                Techonologies
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <a href={homeData.technologies.nodejs.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.nodejs.logo}
                                                    alt="NodeJS"
                                                />
                                            </a>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <a href={homeData.technologies.expressjs.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.expressjs.logo}
                                                    alt="ExpressJS"
                                                />
                                            </a>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <a href={homeData.technologies.mongodb.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.mongodb.logo}
                                                    alt="MongoDB"
                                                />
                                            </a>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <a href={homeData.technologies.aws_s3.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.aws_s3.logo}
                                                    alt="AWS S3"
                                                />
                                            </a> 
                                        </Grid>

                                        <Grid item xs={6}>
                                            <a href={homeData.technologies.aws_cloudfront.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.aws_cloudfront.logo}
                                                    alt="AWS CloudFront"
                                                />
                                            </a>
                                        </Grid>
                                   </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box pd={10}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Box p={5} className={classes.center}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        spacing={3}
                                    >
     
                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                Frontend
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} >
                                            <a href={homeData.technologies.reactjs.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.reactjs.logo}
                                                    alt="ReactJS"
                                                />
                                            </a>
                                        </Grid>

                                        <Grid item xs={6} >
                                            <a href={homeData.technologies.redux.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.redux.logo}
                                                    alt="Redux"
                                                />
                                            </a>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <a href={homeData.technologies.material_ui.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.material_ui.logo}
                                                    alt="Material UI"
                                                />
                                            </a>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <a href={homeData.technologies.fontawesome.url}>
                                                <img
                                                    className={(classes.techonologyImg)}
                                                    src={homeData.technologies.fontawesome.logo}
                                                    alt="Fontawesome"
                                                />
                                            </a>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box pd={10}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Box p={5} className={classes.center}>
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="center"
                                        spacing={3}
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                Personal Website Github
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <div className={classes.iconInlineAlign}>
                                                <span className={classes.iconPadding}>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Github"
                                                        onClick={() => window.open(homeData.website_github.backend_url)}
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
                                                        onClick={() => window.open(homeData.website_github.backend_url)}
                                                    >
                                                        Backend
                                                    </Link>
                                                </Typography>
                                            </div>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <div className={classes.iconInlineAlign}>
                                                <span className={classes.iconPadding}>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Github"
                                                        onClick={() => window.open(homeData.website_github.frontend_url)}
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
                                                        onClick={() => window.open(homeData.website_github.frontend_url)}
                                                    >
                                                        Frontend
                                                    </Link>
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default Home;