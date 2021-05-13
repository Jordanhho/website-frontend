import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import staticRoutes from "../../routes/static_routes";

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";

import { userSignUpAsync } from '../../redux/asyncActions/authAsyncActions';

function SiguUp() {

    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { userLoginLoading, signUpError } = authObj;

    const classes = useStyles();

    const email = useInput('');
    const password = useInput('');
    const firstName = useInput('');
    const lastName = useInput('');



    function handleSubmit(e) {
        e.preventDefault();

        const signUpData = {
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
        
        // const target = e.target;

        // const formData = new FormData(target);
        // console.log(formData)
        // let postData = {};
        // for (var [key, value] of formData.entries()) {
        //     postData[key] = value;
        // }

        console.log(signUpData);
        dispatch(userSignUpAsync(signUpData));
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstname"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                autoFocus
                                {...firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="lname"
                                {...lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                {...email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        value={userLoginLoading ? 'Loading...' : 'Login'}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    {signUpError && <div style={{ color: 'red', marginTop: 10 }}>{signUpError}</div>}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={staticRoutes.admin.login} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
export default SiguUp;