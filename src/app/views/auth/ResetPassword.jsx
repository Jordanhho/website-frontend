import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import ReCAPTCHA from "react-google-recaptcha";
import { RE_CAPTCHA_PUBLIC_KEY } from "../../config/google_config";

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";

import staticRoutes from "../../routes/static_routes";

import {
    verifyResetPassLinkApi,
    resetPasswordApi
} from "../../services/auth_api";


function ResetPassword() {
    const classes = useStyles();
    const recaptchaRef = React.createRef();
    let { linkHash } = useParams();

    const password = useInput('');
    const confirmPassword = useInput('');

    const [linkVerified, setLinkVerified] = useState(false);
    const [invalidLink, setInvalidLink] = useState(false);
    const [loading, setLoading] = useState(true);

    

    // verify token on app load
    useEffect(() => {
        console.log("verifying reset pass link: ", linkHash)
        const result = verifyResetPassLinkApi({ linkHash: linkHash });

        setLoading(false);

        //invalid email verification link
        if (!result.data.linkVerified) {
            setInvalidLink(true);
        }
        else {
            console.log(result.data);
            setLinkVerified(true);
        }

        // verifyResetPassLink();
    }, [linkHash]);


    // async function verifyResetPassLink() {
       

       




        // if (result.error) {
        //     setEmailVerified(false);
        //     setLinkExpired(false);
        // }



        //redirect to login page upon successful verification with a delay of 10 seconds.


    // }


    async function handleResetPassword(e) {
        e.preventDefault();

        //TODO same confirm password
        const resetPassObj = {
            linkHash: linkHash,
            password: password.value
        }

        let result = await resetPasswordApi(resetPassObj);
        console.log(result);
    }






    function onChange() {
        const recaptchaValue = recaptchaRef.current.getValue();
        // this.props.onSubmit(recaptchaValue);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>

                {(loading) && <CircularProgress color="secondary" />}

                {(invalidLink) && <div>Invalid Reset Password Link</div>}

                {(linkVerified) && 
                    <form className={classes.form} onSubmit={handleResetPassword}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    {...confirmPassword}
                                />
                            </Grid>
                        </Grid>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RE_CAPTCHA_PUBLIC_KEY}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </Button>
                        
                    </form> 
                }
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href={staticRoutes.admin.login} variant="body2">
                            Already have an account? Sign in
                            </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}
export default ResetPassword;