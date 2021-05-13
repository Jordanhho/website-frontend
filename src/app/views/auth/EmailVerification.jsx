import React, { useEffect, useState } from 'react';


import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import staticRoutes from "../../routes/static_routes";

import useStyles from "./styles";

import { useParams } from "react-router-dom";

import {
    emailVerificationApi
} from "../../services/auth_api";


function EmailVerification() {

    const classes = useStyles();

    const [emailVerified, setEmailVerified] = useState(false);
    const [invalidLink, setInvalidLink] = useState(false);

    const [loading, setLoading] = useState(true);

    let { linkHash } = useParams();

    // verify token on app load
    useEffect(() => {
        verifyEmail();
    });


    async function verifyEmail() {

        console.log("verifying email link: ", linkHash)
        const result = await emailVerificationApi(linkHash);

        setLoading(false);

        //invalid email verification link
        if (!result.data.emailVerified) {
            setInvalidLink(true);
        }
        else {
            setEmailVerified(true);
        }

        console.log(result.data);

        


        // if (result.error) {
        //     setEmailVerified(false);
        //     setLinkExpired(false);
        // }
 
        

        //redirect to login page upon successful verification with a delay of 10 seconds.


    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Email Verification
                </Typography>
    
                    {/* <Grid container spacing={2}> */}
                        {(loading) && <CircularProgress color="secondary" />}

                        {(emailVerified) && <div>Email Verified!</div>}

                        {(invalidLink) && <div>Invalid Email Verification Link</div>}


                    {/* </Grid> */}
                    {/* <Grid container justify="flex-end">
                        <Grid item> */}
                            <Link href={staticRoutes.admin.login} variant="body2">
                                Sign In
                            </Link>
                        {/* </Grid>
                    </Grid> */}
            </div>
        </Container>
    )
}
export default EmailVerification;