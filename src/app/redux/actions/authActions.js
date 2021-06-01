import {
    VERIFY_LOGIN_SESSION_STARTED,
    VERIFY_LOGIN_SESSION_END,

    USER_LOGIN_STARTED, 
    USER_LOGIN_FAILURE, 

    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../constants/authTypes";

import {
    setAuthTokenApi
} from "../../services/auth_api";


// user login - start
export const userLoginStarted = () => {
    return {
        type: USER_LOGIN_STARTED
    }
}

// user login - failure
export const userLoginFailure = (error = 'Something went wrong. Please try again later.') => {
    return {
        type: USER_LOGIN_FAILURE,
        payload: {
            error
        }
    }
}

// verify token - success
export const userLoginSuccess = ({ token, expiredAt, user }) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: {
            token,
            expiredAt,
            user
        }
    }
}

// verify token - start
export const verifyLoginSessionStarted = (silentAuth = false) => {
    return {
        type: VERIFY_LOGIN_SESSION_STARTED,
        payload: {
            silentAuth
        }
    }
}

// verify token - end/failure
export const verifyLoginSessionEnd = () => {
    return {
        type: VERIFY_LOGIN_SESSION_END
    }
}

// handle user logout
export const userLogout = () => {
    setAuthTokenApi();
    return {
        type: USER_LOGOUT
    }
}