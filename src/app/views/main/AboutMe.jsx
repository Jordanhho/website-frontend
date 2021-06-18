import React, { useState, useEffect, useCallback  } from 'react';

import ReactHtmlParser from 'react-html-parser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//custom images
import EseaIcon from "../../assets/img/esea_icon.png";
import CfsIcon from "../../assets/img/cfs_icon.png";

//icons
import GamesIcon from '@material-ui/icons/Games';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SchoolIcon from '@material-ui/icons/School';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GetAppIcon from '@material-ui/icons/GetApp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import ComputerIcon from '@material-ui/icons/Computer';
import WorkIcon from '@material-ui/icons/Work';

import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import Loader from "../../components/Loader";

import useStyles from "./styles";

import {
    getAboutMe
} from "../../services/public_api";

function AboutMe() {
    const pageTitle = "About Me";
    const classes = useStyles();

    const [aboutMe, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        education_description: "",
        school_experience_description: "",
        work_experience_description: "",
        skill_specialization_description: "",
        hobby_description: "",
        esports_description: "",
        goal_description: "",
        crossfire_profile_url: "",
        youtube_url: "",
        linkedin_url: "",
        github_url: "",
        twitch_url: "",
        steam_url: "",
        esea_url: "",
        resume_url: ""
    });

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getAboutMe();
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

                <Box pd={10}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <br/>
                                <Grid item xs={12}>
                                    <SchoolIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Education
                                </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.education_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <ComputerIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" align="center">
                                        School Project Experience
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.school_experience_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <WorkIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Work Experience
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.work_experience_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <MenuBookIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4" align="center">
                                        Skill & Specialization
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.skill_specialization_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <GamesIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Hobby
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.hobby_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <SportsEsportsIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Esports
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.esports_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <SportsEsportsIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Goal
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <Typography variant="body1" gutterBottom>
                                            {ReactHtmlParser(aboutMe.goal_description)}
                                        </Typography>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <ContactMailIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Contact Me
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={5}>
                                        <div className={classes.iconInlineAlign}>
                                            <span className={classes.iconPadding}>
                                                <IconButton
                                                    color="primary"
                                                    component="span"
                                                    aria-label="Resume"
                                                    onClick={() => window.open(`mailto:${aboutMe.email}`)}
                                                    className={classes.iconInline}
                                                >
                                                    <EmailIcon
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
                                                    onClick={() => window.open(`mailto:${aboutMe.email}`)} 
                                                >
                                                    {aboutMe.email}
                                                </Link>
                                            </Typography>
                                        </div>

                                        <div className={classes.iconInlineAlign}>
                                            <span className={classes.iconPadding}>
                                                <IconButton
                                                    color="primary"
                                                    component="span"
                                                    aria-label="Resume"
                                                    onClick={() => window.open(aboutMe.resume_url)}
                                                    className={classes.iconInline}
                                                >
                                                    <GetAppIcon
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
                                                    onClick={() => window.open(aboutMe.resume_url)} 
                                                >
                                                    Resume Link
                                                </Link>
                                            </Typography>
                                        </div>

                                        <div className={classes.iconInlineAlign}>
                                            <span className={classes.iconPadding}>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Linkedin"
                                                    onClick={() => window.open(aboutMe.linkedin_url)}
                                                    className={classes.iconInline}
                                                >
                                                    <LinkedInIcon
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
                                                    onClick={() => window.open(aboutMe.linkedin_url)} 
                                                >
                                                    LinkedIn
                                                </Link>
                                            </Typography>
                                        </div>

                                        <div className={classes.iconInlineAlign}>
                                            <span className={classes.iconPadding}>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Github"
                                                    onClick={() => window.open(aboutMe.github_url)}
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
                                                    onClick={() => window.open(aboutMe.github_url)} 
                                                >
                                                    GitHub
                                                </Link>
                                            </Typography>
                                        </div>
                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <ContactMailIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Other Contacts
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Box p={5}>
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            aria-label="Youtube"
                                            onClick={() => window.open(aboutMe.youtube_url)}
                                            className={classes.iconInline}
                                        >
                                            <YouTubeIcon
                                                fontSize="large"
                                                color="primary"
                                                className={classes.iconInline}
                                            />
                                        </IconButton>

                                        <IconButton
                                            color="primary"
                                            component="span"
                                            aria-label="Steam"
                                            onClick={() => window.open(aboutMe.steam_url)}
                                            className={classes.iconInline}
                                        >
                                            <FontAwesomeIcon icon={["fab", "steam"]} className={classes.iconInline} styles={{"color": "primary"}}/>
                                        </IconButton>

                                        <IconButton
                                            color="primary"
                                            component="span"
                                            aria-label="Twitch"
                                            onClick={() => window.open(aboutMe.twitch_url)}
                                            className={classes.iconInline}
                                        >
                                            <FontAwesomeIcon icon={["fab", "twitch"]} className={classes.iconInline} styles={{ "color": "primary" }} />
                                        </IconButton>

                                    </Box>
                                </Grid>
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
                                <br />
                                <Grid item xs={12}>
                                    <ContactMailIcon
                                        className={classes.displayIcon}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        Esports
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Box p={5}>
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
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </Container>
    );
}
export default AboutMe;