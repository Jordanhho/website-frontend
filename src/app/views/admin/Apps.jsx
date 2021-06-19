import React, { useState, useEffect, useCallback } from 'react';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import useStyles from "./styles";

import Loader from "../../components/Loader";

import {
    getAppsApi,
} from "../../services/public_api";

import {
    removeApp,
    updateApps,
} from "../../services/private_api";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Apps() {
    const pageTitle = "Admin Manage My Projects";
    const classes = useStyles();

    const formRef = React.createRef();

    const [apps, setData] = useState([]);
    const [newApps, setNewApps] = useState([]);

    const [appsBak, setAppsBak] = useState([]);

    const [readOnly, setReadOnly] = useState(true)

    const [loaded, setLoaded] = useState(null);
    const [openSuccessToast, setOpenSuccessToast] = useState(false);
    const [successToastMsg, setSuccessToastMsg] = useState("");
    const [openFailureToast, setOpenFailureToast] = useState(false);
    const [failureToastMsg, setFailureToastMsg] = useState("");

    function handleClose() {
        setOpenSuccessToast(false);
        setOpenFailureToast(false);
    }

    function handleOnClickEdit() {
        setAppsBak(apps);
        setReadOnly(false);
    }

    function handleOnClickCancel() {
        setData(appsBak);
        setReadOnly(true);
    }

    //index is the index of the app details item
    function handleOnChange(e, index) {
        let copyApps = [...apps];
        let appDetails = { ...copyApps[index] };

        //for checkboxes
        if(e.target.checked) {
            appDetails[e.target.name] = e.target.checked;
        }
        else {
            appDetails[e.target.name] = e.target.value;
        }
        copyApps[index] = appDetails;
        setData(copyApps);
    }

    //index is the index of the app new details item
    function handleOnChangeNewApps(e, index) {
        let copyNewApps = [...newApps];
        let appDetails = { ...copyNewApps[index] };

        //for checkboxes
        if (e.target.checked) {
            appDetails[e.target.name] = e.target.checked;
        }
        else {
            appDetails[e.target.name] = e.target.value;
        }
        copyNewApps[index] = appDetails;
        setNewApps(copyNewApps);
    }


    async function handleOnDeleteApp(index) {

        let app_id = apps[index].app_id;

        let postData = {
            app_id: app_id
        }

        let result = await removeApp(postData);

        setReadOnly(true);

        //if success update, remove app from apps list
        if (result.data) {
            setSuccessToastMsg("Successfully removed app!");
            setOpenSuccessToast(true);

            //refresh data
            fetchData();
        }
        else {
            setFailureToastMsg("Error, something went wrong.");
            setOpenFailureToast(true);
        }
    }

    async function handleOnLocalDeleteApp(e, index) {
        //remove item from newApps array
        let copyNewApps = [...newApps];
        copyNewApps.splice(index, 1);

        setNewApps(copyNewApps);
    }

    async function handleUpdate(e) {
        e.preventDefault();

        let combinedApps = ([...apps]).concat([...newApps]);

        let postData = {
            apps: combinedApps
        };

        const result = await updateApps(postData);

        setReadOnly(true);

        //if failed update, load backup
        if (!result.data) {
            setData(appsBak);
            setFailureToastMsg("Error, something went wrong.");
            setOpenFailureToast(true);
        }
        else {
            setData(result.data);
            //successfully updated!
            setSuccessToastMsg("Successfully updated app details!");
            setOpenSuccessToast(true);
        }
    }

    async function handleOnClickAddApp() {
        let copyNewApps = [...newApps];
        let appDetails = {
            app_id: "",
            app_name: "",
            app_description: "",
            github_url: "",
            app_type: "",
            app_url: "",
            is_wip: false
        }
        copyNewApps.push(appDetails);
        setNewApps(copyNewApps);
    }

    const fetchData = useCallback(async () => {
        const result = await getAppsApi();
        if (result.data) {
            setData(result.data);
            setAppsBak(result.data);
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
            <form onSubmit={handleUpdate} ref={formRef}>
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
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={6}>
                            {apps.map((appDetails, index) => (
                                <Paper className={classes.paper} key={index}>
                                    <Box p={5}>

                                        {(readOnly) &&
                                            <Grid item xs={12}>
                                                <Grid container justify="flex-end">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleOnDeleteApp(index)}
                                                        className={classes.button}
                                                        endIcon={<DeleteIcon />}
                                                    >
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        }

                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                App Details
                                            </Typography>
                                        </Grid>

                                        <br/>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Unique App ID"
                                                name="app_id"
                                                rows={10}
                                                variant="outlined"
                                                onChange={(e) => handleOnChange(e, index)}
                                                value={appDetails.app_id}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                                disabled={true}
                                            />
                                        </Grid>

                                        <br/>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="App Name"
                                                name="app_name"
                                                rows={10}
                                                variant="outlined"
                                                onChange={(e) => handleOnChange(e, index)}
                                                value={appDetails.app_name}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />
                                        </Grid>
                                        
                                        <br/>

                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel>App Type</InputLabel>
                                                <Select
                                                    value={appDetails.app_type}
                                                    onChange={(e) => handleOnChange(e, index)}
                                                    label="App Type"
                                                    inputProps={{
                                                        readOnly: readOnly,
                                                        name: 'app_type',
                                                        id: 'outlined-age-native-simple'
                                                    }}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value={"web_app"}>Web App</MenuItem>
                                                    <MenuItem value={"windows_app"}>Windows App</MenuItem>
                                                    <MenuItem value={"android_app"}>Android App</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <br />

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                label="App Description"
                                                name="app_description"
                                                rows={10}
                                                variant="outlined"
                                                onChange={(e) => handleOnChange(e, index)}
                                                value={appDetails.app_description}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />
                                        </Grid>

                                        <br />
                                        <br />

                                        <Grid item xs={12}>
                                            <Typography variant="h5" color="primary">
                                                Status:
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox 
                                                        checked={appDetails.is_wip} 
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        name="is_wip" 
                                                        color="primary"
                                                        disabled={readOnly}
                                                    />
                                                }
                                                label="Is a Work In Progress"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="app_url"
                                                label="App Url"
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: readOnly,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton
                                                                color="primary"
                                                                component="span"
                                                                aria-label="App Url"
                                                                onClick={() => window.open(appDetails.app_url)}
                                                            >
                                                                <LinkIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={(e) => handleOnChange(e, index)}
                                                value={appDetails.app_url}
                                            />
                                        </Grid>

                                        <br />

                                        <Grid item xs={12}>
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
                                                                onClick={() => window.open(appDetails.github_url)}
                                                            >
                                                                <GitHubIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={(e) => handleOnChange(e, index)}
                                                value={appDetails.github_url}
                                            />
                                        </Grid>
                                    </Box>
                                </Paper>
                            ))}

                            {newApps.map((appDetails, index) => (
                                <Paper className={classes.paper} key={index}>
                                    <Box p={5}>

                                        {(!readOnly) &&
                                            <Grid item xs={12}>
                                                <Grid container justify="flex-end">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleOnLocalDeleteApp(index)}
                                                        className={classes.button}
                                                        endIcon={<DeleteIcon />}
                                                    >
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        }

                                        <Grid item xs={12}>
                                            <Typography variant="h4" color="primary">
                                                App Details
                                            </Typography>
                                        </Grid>

                                        <br />

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Unique App ID"
                                                name="app_id"
                                                rows={10}
                                                variant="outlined"
                                                onChange={(e) => handleOnChangeNewApps(e, index)}
                                                value={appDetails.app_id}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                                helperText="This cannot be changed after creation."
                                            />
                                        </Grid>

                                        <br />
                                        <br />

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="App Name"
                                                name="app_name"
                                                rows={10}
                                                variant="outlined"
                                                onChange={(e) => handleOnChangeNewApps(e, index)}
                                                value={appDetails.app_name}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />
                                        </Grid>

                                        <br />

                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel>App Type</InputLabel>
                                                <Select
                                                    value={appDetails.app_type}
                                                    onChange={(e) => handleOnChangeNewApps(e, index)}
                                                    label="App Type"
                                                    inputProps={{
                                                        readOnly: readOnly,
                                                        name: 'app_type',
                                                        id: 'outlined-age-native-simple'
                                                    }}
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value={"web_app"}>Web App</MenuItem>
                                                    <MenuItem value={"windows_app"}>Windows App</MenuItem>
                                                    <MenuItem value={"android_app"}>Android App</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <br />

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                label="App Description"
                                                name="app_description"
                                                rows={10}
                                                variant="outlined"
                                                onChange={(e) => handleOnChangeNewApps(e, index)}
                                                value={appDetails.app_description}
                                                InputProps={{
                                                    readOnly: readOnly,
                                                }}
                                            />
                                        </Grid>

                                        <br />
                                        <br />

                                        <Grid item xs={12}>
                                            <Typography variant="h5" color="primary">
                                                Status:
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={appDetails.is_wip}
                                                        onChange={(e) => handleOnChangeNewApps(e, index)}
                                                        name="is_wip"
                                                        color="primary"
                                                        disabled={readOnly}
                                                    />
                                                }
                                                label="Is a Work In Progress"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                name="app_url"
                                                label="App Url"
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: readOnly,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton
                                                                color="primary"
                                                                component="span"
                                                                aria-label="App Url"
                                                                onClick={() => window.open(appDetails.app_url)}
                                                                disabled={true}
                                                            >
                                                                <LinkIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={(e) => handleOnChangeNewApps(e, index)}
                                                value={appDetails.app_url}
                                            />
                                        </Grid>

                                        <br />

                                        <Grid item xs={12}>
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
                                                                onClick={() => window.open(appDetails.github_url)}
                                                                disabled={true}
                                                            >
                                                                <GitHubIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={(e) => handleOnChangeNewApps(e, index)}
                                                value={appDetails.github_url}
                                            />
                                        </Grid>
                                    </Box>
                                </Paper>
                            ))}

                            <br/>
                                    
                            {(!readOnly) &&
                                <Grid item xs={12}>
                                    <Grid container justify="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOnClickAddApp}
                                            className={classes.button}
                                            endIcon={<AddIcon />}
                                        >
                                            Add App
                                    </Button>
                                    </Grid>
                                </Grid>
                            }

                        </Grid>
                    </Grid>

                    <Snackbar open={openSuccessToast} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            {successToastMsg}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openFailureToast} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {failureToastMsg}
                            Error, something went wrong with saving.
                        </Alert>
                    </Snackbar>

                </Box>
            </form>
        </Container>
    );
}
export default Apps;