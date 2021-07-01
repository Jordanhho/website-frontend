import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Loader from "../../components/Loader";
import Button from '@material-ui/core/Button';

import TitleBanner from "../../components/TitleBanner";
import staticRoutes from "../../routes/static_routes";

import {
    getHomeApi
} from "../../services/public_api";

import useStyles from "./styles";

function Home() {
    const pageTitle = "Home";

    const classes = useStyles();

    const [homeData, setData] = useState([]);
    const [loaded, setLoaded] = useState(null);

    const xsSize = 12;
    const mdSize = 6;

    const fetchData = useCallback(async () => {
        const result = await getHomeApi();
        if(result.error) {
            setLoaded(false);
        }
        else {
            setData(result.data);
            setLoaded(true);
        }
    }, []);
    
    useEffect(() => {
        document.title = pageTitle;
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
            <TitleBanner title={"Lets connect!"}/>
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
                                        Welcome!
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        This is my personal website to showcase my projects and experience.
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
                                    <Typography variant="h5" color="primary" className={classes.underline}>
                                        Web Development Specialization
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12} align="left">
                                    <Typography variant="body1" gutterBottom>
                                        I am very familar and interested in full-stack website development. I am not afraid to admit that I am not the best at frontend website development with CSS and UI Layout, however, I am very confident that I can spot UI errors and make UX improvements. I also really like being in control of the entire development cycle of working on creating the database schema, the entries, and then creating the backend APIs. Afterward, the frontend would be implemented with the APIs to be used to display information and maybe manipulate the data. My main development languages include ReactJS, Javascript, PHP, Python, C, and PHP. I also prefer to develop projects in simple, efficient and optimal work pattern that includes clean code writing that is easy to understand and fast.
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={staticRoutes.main.aboutMe}
                                        className={classes.button}
                                    >
                                        Learn more about me
                                    </Button>
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
                                    <Typography variant="h5" color="primary" className={classes.underline}>
                                        Personal Projects
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        Take a look at my latest projects here.
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        href={staticRoutes.main.apps}
                                        className={classes.button}
                                    >
                                        View My Projects
                                    </Button>
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
                                    <Typography variant="h5" color="primary" className={classes.underline}>
                                        Interested in my web development Skills?
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        You can learn more about my skills and experience here.
                                    </Typography>
                                </Grid>
                                <br/>

                                <Grid item xs={12}>
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
                                    <Typography variant="h5" color="primary" className={classes.underline}>
                                        Looking for a full-stack web developer?
                                    </Typography>
                                </Grid>
                                <br />
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="body1" gutterBottom>
                                        Well look no further, you can contact me about the details of your offer here.
                                    </Typography>
                                </Grid>
                                <br />

                                <Grid item xs={12}>
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
export default Home;