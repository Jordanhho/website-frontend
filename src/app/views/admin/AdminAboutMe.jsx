import React, { useState, useEffect, useCallback } from 'react';

import ReactHtmlParser from 'react-html-parser';

//icons
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ChipInput from "Components/ChipInput";
import Loader from "Components/Loader";
import TitleBanner from "Components/TitleBanner";

import useStyles from "./styles";

import staticRoutes from "Routes/static_routes";

import {
    getAboutMeApi,
} from "Services/public_api";

import {
    updateAboutMeApi
} from "Services/private_api";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AdminAboutMe() {
    const pageTitle = staticRoutes.admin.aboutMe.name;
    const classes = useStyles();

    const formRef = React.createRef();

    const xsSize = 12;
    const mdSize = 10;

    const [aboutMeBak, setAboutMeBak] = useState({});
    const [aboutMe, setData] = useState({
        firstname: "",
        lastname: "",
        profile_picture_url: "",
        personality_and_passion: "",
        esports_description: "",
        goal_description: "",
        details_about_self: [],
        interested_in: [],
    });

    const [ readOnly, setReadOnly ] = useState(true);

    const [loaded, setLoaded] = useState(null);
    const [openSuccessToast, setOpenSuccessToast] = useState(false);
    const [openFailureToast, setOpenFailureToast] = useState(false);

    function handleClose() {
        setOpenSuccessToast(false);
        setOpenFailureToast(false);
    }

    async function handleUpdate(e) {
        e.preventDefault();

        let postData = {...aboutMe}

        const result = await updateAboutMeApi(postData);

        //if failed update, load backup
        if(!result.data) {
            setData(aboutMeBak);
            setReadOnly(true);
            setOpenFailureToast(true);
        }
        else {
            setData(result.data);
            setAboutMeBak(result.data);

            //successfully updated!
            setReadOnly(true);
            setOpenSuccessToast(true);
        }
    }

    function handleOnClickEdit() {
        setAboutMeBak(aboutMe);
        setReadOnly(false);
    }

    function handleOnClickCancel() {
        setData(aboutMeBak);
        setReadOnly(true);
    }

    function handleOnChange(e) {
        setData({
            ...aboutMe, 
            [e.target.name]: e.target.value
        });
    }

    function handleOnChangeChip(name, val) {
        setData({
            ...aboutMe,
            [name]: val
        });
    }

    function handleOnDeleteChip(name, val) {
        let copyArr = [...aboutMe[name]];
        copyArr.splice(copyArr.indexOf(val), 1)
        setData({
            ...aboutMe,
            [name]: copyArr
        });
    }

    const fetchData = useCallback(async () => {
        const result = await getAboutMeApi();
        if (result.data) {
            setData(result.data);
            setAboutMeBak(result.data);
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
        <div>
            <TitleBanner title={pageTitle} />
            <Box p={2}>

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

                {(readOnly) &&
                <Fab
                    color="primary"
                    aria-label="edit"
                    className={classes.pinnedEditBtn}
                    onClick={handleOnClickEdit}
                >
                    <EditIcon />
                </Fab>}

                {(!readOnly) &&
                <Grid container justify="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOnClickCancel}
                        className={classes.pinnedCancelBtn}
                        endIcon={<CancelIcon />}
                    >
                        Cancel
                        </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                        className={classes.pinnedSaveBtn}
                        endIcon={<SaveIcon />}
                        type="submit"
                    >
                        Save
                    </Button>
                </Grid>}

                <form onSubmit={handleUpdate} ref={formRef}>
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
                                            Personality & Passion
                                        </Typography>
                                    </Grid>
                                    <br/>
                                    <br/>

                                    <Grid item xs={12} align="left">
                                        {(readOnly) ?
                                            ReactHtmlParser(aboutMe.personality_and_passion)
                                            :
                                            <TextField
                                                className={classes.textField}
                                                fullWidth
                                                multiline
                                                label="Personality & Passion"
                                                name="personality_and_passion"
                                                rows={15}
                                                variant="outlined"
                                                onChange={handleOnChange}
                                                value={aboutMe.personality_and_passion}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />}
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
                                            Facts about myself
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />

                                    <ChipInput
                                        label="Facts about myself"
                                        name="details_about_self"
                                        value={aboutMe.details_about_self}
                                        readOnly={readOnly}
                                        onDelete={handleOnDeleteChip}
                                        onChange={handleOnChangeChip}
                                    />

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
                                            Interests
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />
                                    <ChipInput
                                        label="Interests"
                                        name="interested_in"
                                        value={aboutMe.interested_in}
                                        readOnly={readOnly}
                                        onDelete={handleOnDeleteChip}
                                        onChange={handleOnChangeChip}
                                    />
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
                                            Goal
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />
                                    <Grid item xs={12} align="left">
                                        {(readOnly) ?
                                            ReactHtmlParser(aboutMe.goal_description)
                                            :
                                            <TextField
                                                className={classes.textField}
                                                fullWidth
                                                multiline
                                                label="Goal"
                                                name="goal_description"
                                                rows={15}
                                                variant="outlined"
                                                onChange={handleOnChange}
                                                value={aboutMe.goal_description}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />}
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
                                            Esports
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />
                                    <Grid item xs={12} align="left">
                                        {(readOnly) ?
                                            ReactHtmlParser(aboutMe.esports_description)
                                            :
                                            <TextField
                                                className={classes.textField}
                                                fullWidth
                                                multiline
                                                label="Esports"
                                                name="esports_description"
                                                rows={15}
                                                variant="outlined"
                                                onChange={handleOnChange}
                                                value={aboutMe.esports_description}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />}
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                </form>

                <Snackbar open={openSuccessToast} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Successfully saved!
                    </Alert>
                </Snackbar>
                <Snackbar open={openFailureToast} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Error, something went wrong with saving.
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    )
}
export default AdminAboutMe;