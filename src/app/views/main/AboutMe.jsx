import React, { useState, useEffect, useCallback  } from 'react';

import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description'; //for resume
import GitHubIcon from '@material-ui/icons/GitHub';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


import {
    getAboutMe
} from "../../services/public_api";

function AboutMe() {
    const [aboutMeData, setData] = useState({
        "description": "",
        "linkedin_url": "",
        "email": "",
        "youtube_url": "",
        "github_url": "",
        "resume_url": "",
    });

    const [loaded, setLoaded] = useState(false);

    const fetchData = useCallback(async () => {
        const data = await getAboutMe();
        setData(data);
        setLoaded(true);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
       <div>
            {(loaded) &&
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid container item xs={12} spacing={3}>
                    <h1>Jordan Ho</h1>
                </Grid>
                <Grid container item xs={12} spacing={3}>

                    <h1>Description (About me)</h1>
                    {aboutMeData.description}
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <h1>Hobby</h1>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <h1>Contact Me</h1>
                    <h3>
                        aboutMeData.email
                        <EmailIcon fontSize="large" color="primary" />
                    </h3>
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <h1>Social Media</h1>

                    <IconButton 
                        color="primary" 
                        component="span"
                        aria-label="Linkedin"
                        target="_blank"
                        rel="noreferrer"
                        href={aboutMeData.linkedin_url}
                    >
                        <LinkedInIcon fontSize="large" />
                    </IconButton>

                    <IconButton 
                        color="primary" 
                        component="span"
                        aria-label="Youtube"
                        target="_blank"
                        rel="noreferrer"
                        href={aboutMeData.youtube_url}
                    >
                        <YouTubeIcon fontSize="large" />
                    </IconButton>

                    <IconButton 
                        color="primary" 
                        component="span"
                        aria-label="Youtube"
                        target="_blank"
                        rel="noreferrer"
                        href={aboutMeData.github_url}
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <h1>Resume
                     
                    Link: aboutMeData.resume_url
                        <DescriptionIcon fontSize="large" />
                    </h1>
                </Grid>
            </Grid>}
        </div>
    );
}
export default AboutMe;