import {
    verifyLoginSessionStarted,
    verifyLoginSessionEnd,

    userLoginStarted, 
    userLoginFailure, 
    userLoginSuccess,

    userLogout
} from "../actions/authActions";

import { 
    verifyLoginSessionApi, 
    userLoginApi, 
    userLogoutApi
} from '../../services/auth_api';

// handle user login
export const userLoginAsync = (email, password) => async dispatch => {
    dispatch(userLoginStarted());
    const result = await userLoginApi(email, password);
    if (result.error) {
        //no response from server
        if(!result.response) {
            dispatch(userLoginFailure());
        }
        //error code from server
    else {
            dispatch(userLoginFailure(result.response.data.msg));
        }
        return;
    }
    dispatch(userLoginSuccess(result.data));
}

// verify login session
export const verifyLoginSessionAsync = (silentAuth = false) => async dispatch => {
    dispatch(verifyLoginSessionStarted(silentAuth));
    const result = await verifyLoginSessionApi();

    //User is not logged in or invalid session
    if (result.error
        || result.status !== 200
        || !result.data
        ) {
        dispatch(verifyLoginSessionEnd());
        dispatch(userLogout());
        return;
    }

    //success if no error
    dispatch(userLoginSuccess(result.data));
}

// handle user logout
export const userLogoutAsync = () => dispatch => {
    dispatch(userLogout());
    userLogoutApi();
}