import React, { useState, useEffect, useCallback } from 'react';

import ReactHtmlParser from 'react-html-parser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//custom images
import EseaIcon from "../../assets/img/esea_icon.png";
import CfsIcon from "../../assets/img/cfs_icon.png";

//icons
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import DescriptionIcon from '@material-ui/icons/Description'; //for resume
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';

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
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Loader from "../../components/Loader";

import useStyles from "./styles";

import {
    getAboutMe,
} from "../../services/public_api";

import {
    updateAboutMe
} from "../../services/private_api";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AboutMe() {
    const classes = useStyles();

    const formRef = React.createRef();

    const [aboutMeBak, setAboutMeBak] = useState({});
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

    const [ resume, setResume ] = useState(null);
    const [ profilePicture, setProfilePicture] = useState(null);

    const [ readOnly, setReadOnly ] = useState(true);

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
        Object.keys(aboutMe).forEach(function (key) {
            formData.append(key, aboutMe[key]);
        })

        //add on resume if its not empty.
        if(resume) {
            formData.append("resume", resume); 
        }

        //add on profile picture if its not empty.
        if (profilePicture) {
            formData.append("profile_picture", profilePicture);
        }

        const result = await updateAboutMe(formData);

        //if failed update, load backup
        if(!result.data) {
            setData(aboutMeBak);
            setReadOnly(true);
            setOpenFailureToast(true);
        }
        else {
            setData(result.data);

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

    const fetchData = useCallback(async () => {
        const result = await getAboutMe();
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
            <form onSubmit={handleUpdate} ref={formRef}>
                <Paper className={classes.paper}>
                    <Box p={5}>
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
                                        {aboutMe.firstname} {aboutMe.lastname}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} >
                                    <Avatar src={aboutMe.profile_picture_url} alt="Profile Picture" className={classes.profilePicture} />
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
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h4">
                                        About Me
                                    </Typography>
                                </Grid>
                            </Grid>

                            <br/>

                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                spacing={3}
                            >
                                <Grid item xs={12} >
                                    {(readOnly) ?
                                    ReactHtmlParser(aboutMe.school_experience_description)
                                    :
                                    <TextField
                                        fullWidth
                                        multiline
                                        label="Education"
                                        name="education_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                        value={aboutMe.education_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>
                                <Grid item xs={12} >
                                    {(readOnly) ?
                                    ReactHtmlParser(aboutMe.school_experience_description)
                                    :
                                    <TextField
                                        fullWidth={true}
                                        multiline
                                        label="School Experience"
                                        name="school_experience_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                            value={aboutMe.school_experience_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>

                                <Grid item xs={12} >
                                    {(readOnly) ?
                                    ReactHtmlParser(aboutMe.work_experience_description)
                                    :
                                    <TextField
                                        fullWidth={true}
                                        multiline
                                        label="Work Experience"
                                        name="work_experience_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                        value={aboutMe.work_experience_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>

                                <Grid item xs={12} >
                                    {(readOnly) ?
                                    ReactHtmlParser(aboutMe.skill_specialization_description)
                                    :
                                    <TextField
                                        fullWidth={true}
                                        multiline
                                        label="Skill & Specialization"
                                        name="skill_specialization_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                        value={aboutMe.skill_specialization_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>


                                <Grid item xs={12}>
                                    {(readOnly) ?
                                        ReactHtmlParser(aboutMe.hobby_description)
                                    :
                                    <TextField
                                        fullWidth={true}
                                        multiline
                                        label="Hobby"
                                        name="hobby_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                        value={aboutMe.hobby_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>

                                <Grid item xs={12}>
                                    {(readOnly) ?
                                    ReactHtmlParser(aboutMe.esports_description)
                                    :
                                    <TextField
                                        fullWidth={true}
                                        multiline
                                        label="Esports"
                                        name="esports_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                        value={aboutMe.esports_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>

                                <Grid item xs={12}>
                                    {(readOnly) ?
                                    ReactHtmlParser(aboutMe.goal_description)
                                    :
                                    <TextField
                                        fullWidth={true}
                                        multiline
                                        label="Goal"
                                        name="goal_description"
                                        rows={10}
                                        variant="outlined"
                                        onChange={handleOnChange}
                                        value={aboutMe.goal_description}
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />}
                                </Grid>
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
                                    <Typography variant="h4">
                                        Contact Me
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
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
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: readOnly,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            color="primary"
                                                            component="span"
                                                            aria-label="email"
                                                            onClick={() => window.open(aboutMe.email)}
                                                        >
                                                            <EmailIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={handleOnChange}
                                            value={aboutMe.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            fullWidth
                                            name="linkedin_url"
                                            label="LinkedIn"
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: readOnly,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            color="primary"
                                                            component="span"
                                                            aria-label="Linkedin"
                                                            onClick={() => window.open(aboutMe.linkedin_url)}
                                                        >
                                                            <LinkedInIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={handleOnChange}
                                            value={aboutMe.linkedin_url}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            fullWidth
                                            name="github_url"
                                            label="Github"
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: readOnly,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            color="primary"
                                                            component="span"
                                                            aria-label="Github"
                                                            onClick={() => window.open(aboutMe.github_url)}
                                                        >
                                                            <GitHubIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={handleOnChange}
                                            value={aboutMe.github_url}
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
                                                onClick={() => window.open(aboutMe.resume_url)}
                                            >
                                                <DescriptionIcon
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
                                            <Typography variant="h4">
                                                Other Contacts
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        name="youtube_url"
                                        label="Youtube"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: readOnly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        aria-label="Youtube"
                                                        onClick={() => window.open(aboutMe.youtube_url)}
                                                    >
                                                        <YouTubeIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleOnChange}
                                        value={aboutMe.youtube_url}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        name="twitch_url"
                                        label="Twitch"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: readOnly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        aria-label="Twitch"
                                                        onClick={() => window.open(aboutMe.twitch_url)}
                                                    >
                                                        <FontAwesomeIcon icon={["fab", "twitch"]} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleOnChange}
                                        value={aboutMe.twitch_url}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        name="steam_url"
                                        label="Steam"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: readOnly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        aria-label="Steam"
                                                        onClick={() => window.open(aboutMe.steam_url)}
                                                    >
                                                        <FontAwesomeIcon icon={["fab", "steam"]} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleOnChange}
                                        value={aboutMe.steam_url}
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
                                            <Typography variant="h4">
                                                Esports
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        name="crossfire_url"
                                        label="Crossfire Profile"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: readOnly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        aria-label="CFS"
                                                        onClick={() => window.open(aboutMe.crossfire_profile_url)}
                                                    >
                                                        <img className={classes.icon} src={CfsIcon} alt="CFS" />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleOnChange}
                                        value={aboutMe.crossfire_profile_url}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        name="esea_url"
                                        label="ESEA Profile"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: readOnly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        aria-label="esea"
                                                        onClick={() => window.open(aboutMe.esea_url)}
                                                    >
                                                        <img className={classes.icon} src={EseaIcon} alt="ESEA" />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleOnChange}
                                        value={aboutMe.esea_url}
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
                    </Box>
                </Paper>
            </form>
        </Container>
    )
}
export default AboutMe;