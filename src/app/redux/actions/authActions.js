import {
    VERIFY_TOKEN_STARTED, 
    VERIFY_TOKEN_END,

    USER_SIGNUP_STARTED,
    USER_SIGNUP_FAILURE,
    USER_SIGNUP_SUCCESS,

    USER_LOGIN_STARTED, 
    USER_LOGIN_FAILURE, 

    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../constants/authTypes";

import {
    setAuthTokenApi
} from "../../services/auth_api";





// user sign up  - start
export const userSignUpStarted = () => {
    return {
        type: USER_SIGNUP_STARTED
    }
}


// user sign up  - failure
export const userSignUpFailure = (error = 'Something went wrong. Please try again later.') => {
    return {
        type: USER_SIGNUP_FAILURE,
        payload: {
            error
        }
    }
}



// user sign up - success
export const userSignUpSuccess = ({ token, expiredAt, user }) => {
    return {
        type: USER_SIGNUP_SUCCESS,
        payload: {
            token,
            expiredAt,
            user
        }
    }
}






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
export const verifyTokenStarted = (silentAuth = false) => {
    return {
        type: VERIFY_TOKEN_STARTED,
        payload: {
            silentAuth
        }
    }
}

// verify token - end/failure
export const verifyTokenEnd = () => {
    return {
        type: VERIFY_TOKEN_END
    }
}





// handle user logout
export const userLogout = () => {
    setAuthTokenApi();
    return {
        type: USER_LOGOUT
    }
}

