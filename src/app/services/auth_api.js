import axios from "axios";

import { 
    API_URL, 
    authApiRoutes 
} from "./api_routes";


//force send credentials (cookies) to every axios request
axios.defaults.withCredentials = true;



//sign up for user
export const userSignUpApi = async (signUpObj) => {
   
    try {
        console.log("posting to : ", API_URL + authApiRoutes.SIGNUP)
        return await axios.post(API_URL + authApiRoutes.SIGNUP, signUpObj);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}



// set tokens to the axios header
export const setAuthTokenApi = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

// verify refresh token to generate new access token if refresh token is present
export const verifyTokenApi = async () => {
    try {
        return await axios.post(API_URL + authApiRoutes.VERIFY_TOKEN);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

// user login API to validate the credential
export const userLoginApi = async (email, password) => {
    try {
        return await axios.post(API_URL + authApiRoutes.LOGIN, { email, password });
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

// manage user logout
export const userLogoutApi = async () => {
    try {
        return await axios.post(API_URL + authApiRoutes.LOGOUT);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}


export const sendResetPassEmail = async (email) => {
    try {
        console.log("posting to : ", API_URL + authApiRoutes.SEND_RESET_PASS_EMAIL)
        return await axios.post(API_URL + authApiRoutes.SEND_RESET_PASS_EMAIL, email);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}



// send request to reset password with email and link hash
export const resetPasswordApi = async (params) => {
    try {
        console.log("posting to : ", API_URL + authApiRoutes.RESET_PASSWORD)
        return await axios.post(API_URL + authApiRoutes.RESET_PASSWORD, params);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

// check if reset password link is valid
export const verifyResetPassLinkApi = async (hash) => {
    try {
        console.log("posting to : ", API_URL + authApiRoutes.VERIFY_RESET_PASSWORD)
        return await axios.post(API_URL + authApiRoutes.VERIFY_RESET_PASSWORD, hash);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}



// email verification link
export const emailVerificationApi = async (emailVerificationHash) => {
    try {
        console.log("posting to : ", API_URL + authApiRoutes.VERIFY_EMAIL)
        return await axios.post(API_URL + authApiRoutes.VERIFY_EMAIL, { "linkHash": emailVerificationHash});
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}
