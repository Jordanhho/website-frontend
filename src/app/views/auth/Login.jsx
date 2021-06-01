import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import staticRoutes from "../../routes/static_routes";

import { userLoginAsync } from '../../redux/asyncActions/authAsyncActions';

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";
import useInputPass from "../../custom_hooks/useInputPass";

function Login() {
    const classes = useStyles();

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

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Paper elevation={3}>
                    <Container maxWidth="xs">
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
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="secondary" />}
                                    label="Remember me"
                                />
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
                            <Grid container>
                                <Grid item xs>
                                    <Link 
                                        href={staticRoutes.admin.forgotPassword} 
                                        variant="body2"
                                        className={classes.link}
                                    >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link 
                                        href={staticRoutes.admin.signUp} 
                                        variant="body2"
                                        className={classes.link}
                                    >
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </div>
        </Container>
    );
}
export default Login;