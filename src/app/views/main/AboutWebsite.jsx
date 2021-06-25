import React, { useState, useEffect, useCallback } from 'react';

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
    getAboutWebsiteApi
} from "../../services/public_api";

function AboutWebsite() {
    const pageTitle = "About My Personal Website";

    const classes = useStyles();


    const [aboutWebsiteData, setData] = useState([]);

    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getAboutWebsiteApi();
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
                                    <Typography variant="h4" color="Primary" className={classes.underline}>
                                        Details
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="left">
                                    <Typography variant="body1" gutterBottom>
                                        This is my personal website to showcase my projects and my experience.
                                        <br />
                                        <br />
                                        The website website has been built with a ReactJS frontend, and an ExpressJS backend that is served with Nginx. 
                                        <br/>
                                        <br />
                                        The website is served to CloudFlare with a Google Domain. 
                                        <br/>
                                        <br />
                                        The frontend uses Google's Material UI framework with FontAwesome Icons.
                                        The backend uses AWS S3 and CloudFront to upload and serve files. 
                                        <br/>
                                        <br/>
                                        The database is MongoDB with Mongoose to provide a schema system to a schemaless database. 
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
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            Backend Technologies
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.nodejs.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.nodejs.logo}
                                                alt="NodeJS"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.nginx.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.nginx.logo}
                                                alt="Nginx"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.expressjs.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.expressjs.logo}
                                                alt="ExpressJS"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.mongodb.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.mongodb.logo}
                                                alt="MongoDB"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.aws_s3.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.aws_s3.logo}
                                                alt="AWS S3"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.aws_cloudfront.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.aws_cloudfront.logo}
                                                alt="AWS CloudFront"
                                            />
                                        </a>
                                    </Grid>
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
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    spacing={3}
                                >

                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            Frontend Technologies
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.reactjs.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.reactjs.logo}
                                                alt="ReactJS"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.redux.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.redux.logo}
                                                alt="Redux"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.material_ui.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.material_ui.logo}
                                                alt="Material UI"
                                            />
                                        </a>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <a href={aboutWebsiteData.technologies.fontawesome.url}>
                                            <img
                                                className={(classes.technologyImg)}
                                                src={aboutWebsiteData.technologies.fontawesome.logo}
                                                alt="Fontawesome"
                                            />
                                        </a>
                                    </Grid>

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
                                <Grid
                                    container
                                    justify="center"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            Personal Website Github
                                            </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div className={classes.iconInlineAlign}>
                                            <span className={classes.iconPadding}>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="Github"
                                                    onClick={() => window.open(aboutWebsiteData.website_backend_github_url)}
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
                                                    onClick={() => window.open(aboutWebsiteData.website_backend_github_url)}
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
                                                    onClick={() => window.open(aboutWebsiteData.website_frontend_github_url)}
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
                                                    onClick={() => window.open(aboutWebsiteData.website_frontend_github_url)}
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
        </Container>
    );
}
export default AboutWebsite;