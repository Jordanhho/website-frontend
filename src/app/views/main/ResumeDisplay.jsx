import React, { useState, useEffect, useCallback } from 'react';

import ReactHtmlParser from 'react-html-parser';
import GetAppIcon from '@material-ui/icons/GetApp';

import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import staticRoutes from "../../routes/static_routes";
import TitleBanner from "../../components/TitleBanner";

import Loader from "../../components/Loader";

import useStyles from "./styles";

import {
    getResumeDisplayApi
} from "../../services/public_api";

function ResumeDisplay() {
    const pageTitle = "My Experience";

    const classes = useStyles();

    const [resumeData, setData] = useState({

    });
    const [loaded, setLoaded] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getResumeDisplayApi();
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
                                        My Resume
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>

                                    <div className={classes.iconInlineAlign}>
                                        <span className={classes.iconPadding}>
                                            <IconButton
                                                color="primary"
                                                component="span"
                                                aria-label="Resume"
                                                onClick={() => window.open(resumeData.resume_url)}
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
                                                onClick={() => window.open(resumeData.resume_url)}
                                            >
                                                Resume Link
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
                        <Paper className={classes.paper}>
                            <Box p={5} className={classes.center}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Education
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="left">
                                    <br/>
                                    {resumeData.education.map((educ, index) => (
                                        <Box pb={5} key={index}>
                                            <Grid
                                                container
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs={12}>
                                                    <Typography variant="h6" color="primary">
                                                        {educ.education_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1">
                                                        {educ.school_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">
                                                        {educ.date_start} - {educ.date_end}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption" >
                                                        {educ.location}
                                                    </Typography>
                                                </Grid>
                                                <br/>
                                                <br/>
                                                {(educ.education_description &&
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" >
                                                            {ReactHtmlParser(educ.education_description)}
                                                        </Typography>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Box>
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
                                        Programming Languages
                                    </Typography>
                                </Grid>
                                <br/>
                                <Grid item xs={12}>
                                    <Grid container direction="row">
                                        <Grid item xs={6} align="center">
                                            <Typography variant="h6" color="primary">
                                                Comfortable with
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} align="center">
                                            <Typography variant="h6" color="primary">
                                                Experienced with
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} align="center">
                                            <ul className={classes.ul_none_style}>
                                                {resumeData.programming_languages_comfortable_with.map((progLang, index) => (
                                                    <li key={index}>
                                                        <Chip label={progLang} className={classes.chip} variant="outlined" color="primary"/>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
                                        <Grid item xs={6} align="center">
                                            <ul className={classes.ul_none_style}>
                                                {resumeData.programming_languages_experienced_with.map((progLang, index) => (
                                                    <li key={index}>
                                                        <Chip label={progLang} className={classes.chip} variant="outlined" color="primary"/>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
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
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Technologies
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Grid container direction="row">
                                        <Grid item xs={6} align="center">
                                            <Typography variant="h6" color="primary">
                                                Comfortable with
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} align="center">
                                            <Typography variant="h6" color="primary">
                                                Experienced with
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6} align="center">
                                            <ul className={classes.ul_none_style}>
                                                {resumeData.technologies_comfortable_with.map((tech, index) => (
                                                    <li key={index}>
                                                        <Chip label={tech} className={classes.chip} variant="outlined" color="primary"/>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
                                        <Grid item xs={6} align="center">
                                            <ul className={classes.ul_none_style}>
                                            {resumeData.technologies_experienced_with.map((tech, index) => (
                                                    <li key={index}>
                                                        <Chip label={tech} className={classes.chip} variant="outlined" color="primary"/>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
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
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="primary" className={classes.underline}>
                                        Work Experience
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="left">
                                    <br />
                                    {resumeData.work_experience.map((workXp, index) => (
                                        <Box pb={5} key={index}>
                                            <Grid
                                                container
                                                justify="center"
                                                alignItems="center"
                                            >
                                                <Grid item xs={12}>
                                                    <Typography variant="h5" color="primary">
                                                        <Link href="#"
                                                            color="inherit"
                                                            onClick={() => window.open(workXp.website_url)}
                                                        >
                                                            {workXp.company_name}
                                                        </Link>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body1">
                                                        {workXp.position_name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">
                                                        {workXp.date_start} - {workXp.date_end}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">
                                                        {workXp.location}
                                                    </Typography>
                                                </Grid>
                                                <br />
                                                <br />
                                                {(workXp.experience_description &&
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" >
                                                            {ReactHtmlParser(workXp.experience_description)}
                                                        </Typography>
                                                    </Grid>
                                                )}
                                                <Grid item xs={12}>
                                                    <br />
                                                    {workXp.technologies.map((tech, index) => (
                                                        <Chip label={tech} className={classes.chip} variant="outlined" color="primary" key={index}/>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Box>
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
                                        Year Gap After University
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="primary">
                                        {resumeData.year_gap_start} - {resumeData.year_gap_end}
                                    </Typography>
                                </Grid>
    
                                <br />
                                <Grid item xs={12} align="left">
                                    <Typography variant="body2" gutterBottom>
                                        {ReactHtmlParser(resumeData.year_gap_description)}
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
                                    <Typography variant="h6" color="primary" className={classes.underline}>
                                       Like what you see? <br/>Hire a full-stack developer today!
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12} align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={staticRoutes.main.contactMe}
                                        className={classes.button}
                                    >
                                        Contact Me
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
export default ResumeDisplay;