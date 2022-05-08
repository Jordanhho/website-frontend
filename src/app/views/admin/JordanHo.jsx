import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//custom images
import EseaIcon from "Assets/img/esea_icon.png";
import CfsIcon from "Assets/img/cfs_icon.png";

//icons
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Loader from "Components/Loader";
import TitleBanner from "Components/TitleBanner";
import useStyles from "./styles";


import staticRoutes from "Routes/static_routes";

import {
    getJordanHoApi,
    updateJordanHoApi
} from "Services/private_api";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function JordanHo() {
    const pageTitle = staticRoutes.admin.jordanHo.name;
    const classes = useStyles();

    const xsSize = 12;
    const mdSize = 10;

    const formRef = React.createRef();

    const [jordanHoBak, setJordanHoBak] = useState({});
    const [jordanHoData, setData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        crossfire_profile_url: "",
        youtube_url: "",
        linkedin_url: "",
        github_url: "",
        twitch_url: "",
        steam_url: "",
        esea_url: "",
        website_frontend_github_url: "",
        website_backend_github_url: "",
        resume_file_id: "",
        profile_picture_id: ""
    });

    const [resume, setResume] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const [readOnly, setReadOnly] = useState(true);

    const [loaded, setLoaded] = useState(null);
    const [openSuccessToast, setOpenSuccessToast] = useState(false);
    const [openFailureToast, setOpenFailureToast] = useState(false);

    function handleClose() {
        setOpenSuccessToast(false);
        setOpenFailureToast(false);
    }

    async function handleOnChangeProfilePicture(e) {
        setProfilePicture(e.target.files[0]);
    }

    async function handleOnChangeResume(e) {
        setResume(e.target.files[0]);
    }

    async function handleUpdate(e) {
        e.preventDefault();

        //use formData for multi part data
        let formData = new FormData();
        Object.keys(jordanHoData).forEach(function (key) {
            formData.append(key, jordanHoData[key]);
        })

        //add on resume if its not empty.
        if (resume) {
            formData.append("resume", resume);
        }

        //add on profile picture if its not empty.
        if (profilePicture) {
            formData.append("profile_picture", profilePicture);
        }

        const result = await updateJordanHoApi(formData);

        //if failed update, load backup
        if (!result.data) {
            setData(jordanHoBak);
            setReadOnly(true);
            setOpenFailureToast(true);
        }
        else {
            setData(result.data);
            setJordanHoBak(result.data);

            //successfully updated!
            setReadOnly(true);
            setOpenSuccessToast(true);
        }
    }

    function handleOnClickEdit() {
        setJordanHoBak(jordanHoData);
        setReadOnly(false);
    }

    function handleOnClickCancel() {
        setData(jordanHoBak);
        setReadOnly(true);
    }

    function handleOnChange(e) {
        setData({
            ...jordanHoData,
            [e.target.name]: e.target.value
        });
    }

    const fetchData = useCallback(async () => {
        const result = await getJordanHoApi();
        if (result.data) {
            setData(result.data);
            setJordanHoBak(result.data);
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
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={xsSize} md={mdSize}>
                        <Paper className={classes.paper}>
                            <Box p={3}>
                                <form onSubmit={handleUpdate} ref={formRef}>
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

                                    <Box pb={10}>
                                        <Grid
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                            spacing={3}
                                        >
                                            <Grid item xs={12}>
                                                <Typography variant="h3">
                                                    {jordanHoData.firstname} {jordanHoData.lastname}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12} >
                                                <Avatar src={jordanHoData.profile_picture_url} alt="Profile Picture" className={classes.profilePicture} />
                                            </Grid>

                                            {(!readOnly) &&
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">
                                                        Update Profile Picture
                                                    </Typography>
                                                </Grid>}

                                            {(!readOnly) &&
                                                <Grid item xs={12}>
                                                    <Input type="file" name="profile_picture" onChange={handleOnChangeProfilePicture} />
                                                </Grid>}
                                        </Grid>
                                    </Box>

                                    <Box pb={10}>
                                        <Grid
                                            container
                                            direction="column"
                                            justify="center"
                                            alignItems="center"
                                            spacing={3}
                                        >
                                            <Grid item xs={12} >
                                                <Typography variant="h4" color="primary" className={classes.underline}>
                                                    Contact
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid item xs={12} >
                                            <Grid
                                                container
                                                justify="center"
                                                alignItems="center"
                                                spacing={3}
                                            >
                                                <Grid item xs={12} >
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: readOnly,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconButton
                                                                        color="primary"
                                                                        component="span"
                                                                        aria-label="email"
                                                                        onClick={() => window.open(jordanHoData.email)}
                                                                    >
                                                                        <EmailIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        onChange={handleOnChange}
                                                        value={jordanHoData.email}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <TextField
                                                        fullWidth
                                                        label="LinkedIn"
                                                        name="linkedin_url"
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: readOnly,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconButton
                                                                        color="primary"
                                                                        component="span"
                                                                        aria-label="Linkedin"
                                                                        onClick={() => window.open(jordanHoData.linkedin_url)}
                                                                    >
                                                                        <LinkedInIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        onChange={handleOnChange}
                                                        value={jordanHoData.linkedin_url}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <TextField
                                                        fullWidth
                                                        label="Github"
                                                        name="github_url"
                                                        variant="outlined"
                                                        InputProps={{
                                                            readOnly: readOnly,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconButton
                                                                        color="primary"
                                                                        component="span"
                                                                        aria-label="Github"
                                                                        onClick={() => window.open(jordanHoData.github_url)}
                                                                    >
                                                                        <GitHubIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                        onChange={handleOnChange}
                                                        value={jordanHoData.github_url}
                                                    />
                                                </Grid>
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                    spacing={3}
                                                >
                                                    <Grid item xs={12} >
                                                        <IconButton
                                                            color="primary"
                                                            component="span"
                                                            aria-label="Resume"
                                                            onClick={() => window.open(jordanHoData.resume_url)}
                                                        >
                                                            <GetAppIcon
                                                                fontSize="large"
                                                                color="primary"
                                                            />
                                                            Resume
                                                    </IconButton>
                                                    </Grid>
                                                    {(!readOnly) &&
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6">
                                                                Update Resume
                                                            </Typography>
                                                        </Grid>}
                                                    {(!readOnly) &&
                                                        <Grid item xs={12}>
                                                            <Input type="file" name="resume" onChange={handleOnChangeResume} />
                                                        </Grid>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box pb={10}>
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                            spacing={3}
                                        >
                                            <Grid item xs={12}>
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="h4" color="primary" className={classes.underline}>
                                                            Other Contacts
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    label="Youtube"
                                                    name="youtube_url"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton
                                                                    color="primary"
                                                                    component="span"
                                                                    aria-label="Youtube"
                                                                    onClick={() => window.open(jordanHoData.youtube_url)}
                                                                >
                                                                    <YouTubeIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={jordanHoData.youtube_url}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    label="Twitch"
                                                    name="twitch_url"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton
                                                                    color="primary"
                                                                    component="span"
                                                                    aria-label="Twitch"
                                                                    onClick={() => window.open(jordanHoData.twitch_url)}
                                                                >
                                                                    <FontAwesomeIcon icon={["fab", "twitch"]} />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={jordanHoData.twitch_url}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    label="Steam"
                                                    name="steam_url"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton
                                                                    color="primary"
                                                                    component="span"
                                                                    aria-label="Steam"
                                                                    onClick={() => window.open(jordanHoData.steam_url)}
                                                                >
                                                                    <FontAwesomeIcon icon={["fab", "steam"]} />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={jordanHoData.steam_url}
                                                />
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
                                            <Grid item xs={12}>
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="h4" color="primary" className={classes.underline}>
                                                            Esports
                                                    </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    label="Crossfire Profile"
                                                    name="crossfire_url"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton
                                                                    color="primary"
                                                                    component="span"
                                                                    aria-label="CFS"
                                                                    onClick={() => window.open(jordanHoData.crossfire_profile_url)}
                                                                >
                                                                    <img className={classes.icon} src={CfsIcon} alt="CFS" />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={jordanHoData.crossfire_profile_url}
                                                />
                                            </Grid>
                                            <Grid item xs={12} >
                                                <TextField
                                                    fullWidth
                                                    label="ESEA Profile"
                                                    name="esea_url"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <IconButton
                                                                    color="primary"
                                                                    component="span"
                                                                    aria-label="esea"
                                                                    onClick={() => window.open(jordanHoData.esea_url)}
                                                                >
                                                                    <img className={classes.icon} src={EseaIcon} alt="ESEA" />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={jordanHoData.esea_url}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
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
                                </form>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
export default JordanHo;