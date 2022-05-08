import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//custom images
import EseaIcon from "Assets/img/esea_icon.png";
import CfsIcon from "Assets/img/cfs_icon.png";

//icons
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';


import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TitleBanner from "Components/TitleBanner";

import Loader from "Components/Loader";

import useStyles from "./styles";

import staticRoutes from "Routes/static_routes";

import {
    getContactMeApi
} from "Services/public_api";

function ContactMe() {
    const pageTitle = staticRoutes.main.contactMe.name;

    const classes = useStyles();

    const xsSize = 12;
    const mdSize = 6;

    const [contactMeData, setData] = useState({
        email: "",
        crossfire_profile_url: "",
        youtube_url: "",
        linkedin_url: "",
        github_url: "",
        twitch_url: "",
        steam_url: "",
        esea_url: "",
    });
    const [loaded, setLoaded] = useState(null);
    const [showEmail, setShowEmail] = useState(false);


    function handleShowEmail() {
        setShowEmail(true);
    }

    const fetchData = useCallback(async () => {
        const result = await getContactMeApi();
        if (result.data) {
            result.data.email = result.data.email.split("").reverse();
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
    }, [fetchData, pageTitle]);

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
            <Box p={2}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary">
                                        Interested? Lets have a chat!
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        Feel free to reach out to me by sending me an email.
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
                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Contacts
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
                                                    onClick={() => window.open(`mailto:${contactMeData.email.split("").reverse()}`)}
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
                                                {!showEmail ?
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={handleShowEmail}
                                                        className={classes.button}
                                                    >
                                                        Show Email
                                                    </Button>
                                                    :

                                                    <Link
                                                        href="#"
                                                        color="inherit"
                                                        onClick={() => window.open(`mailto:${contactMeData.email.split("").reverse()}`)}
                                                        className={classes.flip_text}
                                                    >
                                                        {contactMeData.email}
                                                    </Link>
                                                }
                                            </Typography>
                                        </div>

                                        <div className={classes.iconInlineAlign}>
                                            <span className={classes.iconPadding}>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Linkedin"
                                                    onClick={() => window.open(contactMeData.linkedin_url)}
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
                                                    onClick={() => window.open(contactMeData.linkedin_url)}
                                                    className={classes.displayLink}
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
                                                    onClick={() => window.open(contactMeData.github_url)}
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
                                                    onClick={() => window.open(contactMeData.github_url)}
                                                    className={classes.displayLink}
                                                >
                                                    GitHub
                                            </Link>
                                            </Typography>
                                        </div>
                                    </Box>
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
                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Other
                                </Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Box p={5}>
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            aria-label="Youtube"
                                            onClick={() => window.open(contactMeData.youtube_url)}
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
                                            onClick={() => window.open(contactMeData.steam_url)}
                                            className={classes.iconInline}
                                        >
                                            <FontAwesomeIcon icon={["fab", "steam"]} className={classes.iconInline} styles={{ "color": "primary" }} />
                                        </IconButton>

                                        <IconButton
                                            color="primary"
                                            component="span"
                                            aria-label="Twitch"
                                            onClick={() => window.open(contactMeData.twitch_url)}
                                            className={classes.iconInline}
                                        >
                                            <FontAwesomeIcon icon={["fab", "twitch"]} className={classes.iconInline} styles={{ "color": "primary" }} />
                                        </IconButton>

                                    </Box>
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
                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3} className={classes.center}>
                                            
                                <Grid item xs={12} >
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Esports
                                </Typography>
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Box p={5}>
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            aria-label="CFS"
                                            onClick={() => window.open(contactMeData.crossfire_profile_url)}
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
                                            onClick={() => window.open(contactMeData.esea_url)}
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
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
export default ContactMe;