import React, { useState, useEffect, useCallback } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Loader from "Components/Loader";
import TitleBanner from "Components/TitleBanner";

import staticRoutes from "Routes/static_routes";

import {
    getAdminSettingsApi,
    updateAdminSettingsApi
} from "Services/private_api";

import useStyles from "./styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AdminHome() {
    const pageTitle = staticRoutes.admin.name;
    const classes = useStyles();

    const formRef = React.createRef();

    const xsSize = 12;
    const mdSize = 6;

    const [adminHomeData, setData] = useState();

    const [loaded, setLoaded] = useState(null);

    const [openSuccessToast, setOpenSuccessToast] = useState(false);
    const [successToastMsg, setSuccessToastMsg] = useState("");
    const [openFailureToast, setOpenFailureToast] = useState(false);
    const [failureToastMsg, setFailureToastMsg] = useState("");

    function handleClose() {
        setOpenSuccessToast(false);
        setOpenFailureToast(false);
    }

    async function handleUpdate(e) {
        e.preventDefault();

        let value = e.target.checked;
        let name = e.target.name;

        let postData = {
            adminSettings: {
                [name]: value
            }
        }
        const result = await updateAdminSettingsApi(postData);

        //if failed update, load backup
        if (!result.data) {
            setFailureToastMsg("Error, something went wrong.");
            setOpenFailureToast(true);
        }
        else {
            setData(result.data);
            
            //successfully updated!
            setSuccessToastMsg("Successfully updated app details!");
            setOpenSuccessToast(true);
        }
    };

    const fetchData = useCallback(async () => {
        const result = await getAdminSettingsApi();
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
                                    <Typography variant="h3" color="primary" align="center">
                                        Admin Settings
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12} align="left">
                                    <form onSubmit={handleUpdate} ref={formRef}>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch 
                                                        checked={adminHomeData.enable_new_accounts} 
                                                        onChange={handleUpdate}
                                                        name="enable_new_accounts" 
                                                        color="primary"
                                                    />}
                                                label="Enable Sign Up"
                                            />
                                        </FormGroup>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={adminHomeData.enable_emailing}
                                                        onChange={handleUpdate}
                                                        name="enable_emailing"
                                                        color="primary"
                                                    />}
                                                label="Enable Emails"
                                            />
                                        </FormGroup>
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={adminHomeData.enable_change_password}
                                                        onChange={handleUpdate}
                                                        name="enable_change_password"
                                                        color="primary"
                                                    />}
                                                label="Enable Change Password"
                                            />
                                        </FormGroup>
                                    </form>
                                </Grid>
                            </Box>
                        </Paper>
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
        </Container>
    );
}
export default AdminHome;