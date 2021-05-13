import React from "react";

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

import staticRoutes from "../../routes/static_routes";

import {
    sendResetPassEmail
} from "../../services/auth_api";

import useStyles from "./styles";
import useInput from "../../custom_hooks/useInput";

function ForgotPassword() {

    const classes = useStyles();

    const recaptchaRef = React.createRef();

    const email = useInput('');

    // handle button click of send email
    const handleSendEmail = async (e) => {
        e.preventDefault();
        console.log("submitting")
        const result = await sendResetPassEmail({ email: email.value });
        if (!result.data.emailSent) {
            alert("failed email sent!");
        }
        else {
            alert("email sent");
        }
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
                <form className={classes.form} submit={handleSendEmail}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSendEmail}
                    >
                        Send
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={staticRoutes.admin.login} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RE_CAPTCHA_PUBLIC_KEY}
                        onChange={onChange}
                    />
                </form>
            </div>
        </Container>
    )
}
export default ForgotPassword;