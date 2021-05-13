import React, { useState, useEffect } from 'react';

import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description'; //for resume
import GitHubIcon from '@material-ui/icons/GitHub';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

function AboutMe() {
    const [aboutMeData, setData] = useState({});

    useEffect(() => {

        let apiData = {
            "description": "TODO DESCRIPTION",
            "linkedinUrl": "https://www.linkedin.com/in/jordanhho/",
            "email": "jordanhho@gmail.com",
            "youtubeUrl": "https://www.youtube.com/channel/UC8MYJwWZQr6c6Ryjkt6vv4Q",
            "githubUrl": "https://github.com/Jordanhho",
            "resumeUrl": "",
        }

        setData(apiData);

    }, []);

    return (
        <div>
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
                        href={aboutMeData.linkedinUrl}
                    >
                        <LinkedInIcon fontSize="large" />
                    </IconButton>

                    <IconButton 
                        color="primary" 
                        component="span"
                        aria-label="Youtube"
                        target="_blank"
                        rel="noreferrer"
                        href={aboutMeData.youtubeUrl}
                    >
                        <YouTubeIcon fontSize="large" />
                    </IconButton>

                    <IconButton 
                        color="primary" 
                        component="span"
                        aria-label="Youtube"
                        target="_blank"
                        rel="noreferrer"
                        href={aboutMeData.githubUrl}
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                </Grid>

                <Grid container item xs={12} spacing={3}>
                    <h1>Resume
                     
                    Link: aboutMeData.resumeUrl
                        <DescriptionIcon fontSize="large" />
                    </h1>
                </Grid>
            </Grid>
        </div>
    );
}
export default AboutMe;