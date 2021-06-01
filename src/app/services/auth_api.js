import axios from "axios";

import { 
    API_URL, 
    authApiRoutes 
} from "../routes/api_routes";

//force send credentials (cookies) to every axios request
axios.defaults.withCredentials = true;

const VERIFY_LOGIN_SESSION_TIMEOUT = 300; //300 ms for verifying login session.

//** Sign Up Process */

//sign up for user
export const userSignUpApi = async (data) => {
    try {
        return await axios.post(API_URL + authApiRoutes.SIGNUP, data);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

export const activateAccountApi = async (data) => {
    try {
        return await axios.post(API_URL + authApiRoutes.ACTIVATE_ACCOUNT, data);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

//** User login process */

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

//** Verify Login Session Process */

// set tokens to the axios header
export const setAuthTokenApi = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

// verify refresh token to generate new access token if refresh token is present
export const verifyLoginSessionApi = async () => {
    try {
        return await axios({
                method: "post",
                url: (API_URL + authApiRoutes.VERIFY_LOGIN_SESSION),
                timeout: VERIFY_LOGIN_SESSION_TIMEOUT
            });
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

/** reset password process */

export const sendResetPasswordEmailApi = async (email) => {
    try {
        return await axios.post(API_URL + authApiRoutes.SEND_RESET_PASSWORD_EMAIL, email);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

// check if reset password link is valid
export const verifyResetPasswordCodeApi = async (verification_code) => {
    try {
        return await axios.post(API_URL + authApiRoutes.VERIFY_RESET_PASSWORD_CODE, verification_code);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

// send request to reset password with email 
export const resetPasswordApi = async (data) => {
    try {
        return await axios.post(API_URL + authApiRoutes.RESET_PASSWORD, data);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}