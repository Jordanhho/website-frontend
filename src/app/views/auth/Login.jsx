import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import staticRoutes from "../../routes/static_routes";

import { userLoginAsync } from '../../redux/asyncActions/authAsyncActions';

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";

function Login() {
    const classes = useStyles();

    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { userLoginLoading, loginError } = authObj;

    const email = useInput('');
    const password = useInput('');

    // handle button click of login form
    const handleLogin = async  (e) => {
        e.preventDefault();
        console.log("submitting")
        await dispatch(userLoginAsync(email.value, password.value));
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
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
                        {...email}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        {...password}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        value={userLoginLoading ? 'Loading...' : 'Login'}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    {loginError && <div style={{ color: 'red', marginTop: 10 }}>{loginError}</div>}
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
            </div>
        </Container>
    );
}
export default Login;