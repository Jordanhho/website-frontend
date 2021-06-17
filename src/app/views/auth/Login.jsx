import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import Loader from "../../components/Loader";

import staticRoutes from "../../routes/static_routes";

import { userLoginAsync } from '../../redux/asyncActions/authAsyncActions';

import { 
    getLoginSettings
} from "../../services/public_api";

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";
import useInputPass from "../../custom_hooks/useInputPass";

function Login() {
    const classes = useStyles();


    const [loginSettings, setData] = useState(null);
    const [loaded, setLoaded] = useState(null);

    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { userLoginLoading, loginError } = authObj;

    const email = useInput('');
    const password = useInputPass('');

    // handle button click of login form
    const handleLogin = async  (e) => {
        e.preventDefault();
        await dispatch(userLoginAsync(email.value, password.value));
    }

    const fetchData = useCallback(async () => {
        const result = await getLoginSettings();
        if (result.data) {
            setData(result.data);
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper elevation={3}>
                    <Box p={5}>
                        <Grid container justify="center">
                            <Typography component="h1" variant="h5">
                                Admin Login
                            </Typography>
                            <form onSubmit={handleLogin}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    {...email}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...password}
                                />
                                <br/>
                                <br />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    value={userLoginLoading ? 'Loading...' : 'Login'}
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                                {loginError && <div style={{ color: 'red', marginTop: 10 }}>Something went wrong. Please try again later.</div>}
                            </form>
                            <br/>
                            <Grid container>
                               {(loginSettings.enable_change_password &&
                                    <Grid item xs>
                                        <Link
                                            href={staticRoutes.admin.forgotPassword}
                                            variant="body2"
                                            className={classes.link}
                                        >
                                            Forgot password?
                                    </Link>
                                    </Grid>
                                )}

                                {(loginSettings.enable_new_accounts &&
                                    <Grid item>
                                        <Link
                                            href={staticRoutes.admin.signUp}
                                            variant="body2"
                                            className={classes.link}
                                        >
                                            Sign Up
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </div>
        </Container>
    );
}
export default Login;