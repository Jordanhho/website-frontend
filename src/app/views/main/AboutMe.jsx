import React, { useState, useEffect, useCallback  } from 'react';

import ReactHtmlParser from 'react-html-parser';

//custom images
import EseaIcon from "../../assets/img/esea_icon.png";
import CfsIcon from "../../assets/img/cfs_icon.png";

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import TitleBanner from "../../components/TitleBanner";

import staticRoutes from "../../routes/static_routes";

import Loader from "../../components/Loader";

import useStyles from "./styles";

import {
    getAboutMeApi
} from "../../services/public_api";

function AboutMe() {
    const pageTitle = "About Me";
    const classes = useStyles();

    const [aboutMe, setData] = useState({
        firstname: "",
        lastname: "",
        profile_picture_url: "",
        skill_specialization_description: "",
        hobby_description: "",
        esports_description: "",
        goal_description: "",
        crossfire_profile_url: "",
        esea_url: "",
    });

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getAboutMeApi();
        if(result.data) {
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
          
                <Box pd={10}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h3">
                                {aboutMe.firstname} {aboutMe.lastname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Avatar src={aboutMe.profile_picture_url} alt="Profile Picture" className={classes.profilePicture} />
                        </Grid>
                    </Grid>
                </Box>

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
                                        My Personality & Passion
                                    </Typography>
                                </Grid>
                                <br/>
                                <br/>
                                <Grid item xs={12} align="left">
                                    <Typography variant="body1" gutterBottom>
                                        {ReactHtmlParser(aboutMe.personality_and_passion)}
                                    </Typography>
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
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Facts about myself
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="center">
                                    <ul className={classes.ul_none_style}>
                                        {aboutMe.details_about_self.map((fact, index) => (
                                            <li key={index}>
                                                <br/>
                                                <Chip label={fact} className={classes.chip} variant="outlined" color="primary" />
                                                {/* <Typography variant="body1">
                                                    {fact}
                                                </Typography> */}
                                            </li>
                                        ))}
                                    </ul>
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
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Interests
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12} align="left">
                                    {aboutMe.interested_in.map((interest, index) => (
                               
                                            <Chip label={interest} className={classes.chip} variant="outlined" color="primary"/>
                          
                                    ))}
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
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Goal
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12} align="left">
                                    <Typography variant="body1" gutterBottom>
                                        {ReactHtmlParser(aboutMe.goal_description)}
                                    </Typography>
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
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Esports
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12} align="left">
                                    <Typography variant="body1" gutterBottom>
                                        {ReactHtmlParser(aboutMe.esports_description)}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} align="center">
                            
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        aria-label="CFS"
                                        onClick={() => window.open(aboutMe.crossfire_profile_url)}
                                        className={classes.iconInline}
                                    >
                                        <img
                                            className={(classes.imgIcon)}
                                            src={CfsIcon}
                                            alt="CFS"
                                            styles={{ "color": "primary" }}
                                        />
                                    </IconButton>

                                    <IconButton
                                        color="primary"
                                        component="span"
                                        aria-label="Esea"
                                        onClick={() => window.open(aboutMe.esea_url)}
                                        className={classes.iconInline}
                                    >
                                        <img
                                            className={(classes.imgIcon)}
                                            src={EseaIcon}
                                            alt="ESEA"
                                            styles={{ "color": "primary" }}
                                        />
                                    </IconButton>
                                
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
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary" className={classes.underline}>
                                        Interested in me?<br/>Take a look at my resume
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12} align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={staticRoutes.main.resumeDisplay}
                                        className={classes.button}
                                    >
                                        View My Resume
                                    </Button>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
export default AboutMe;