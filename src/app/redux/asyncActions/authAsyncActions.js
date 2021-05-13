import {
    verifyTokenStarted, 
    verifyTokenEnd,

    userLoginStarted, 
    userLoginFailure, 
    userLoginSuccess,

    userSignUpStarted,
    userSignUpFailure, 
    userSignUpSuccess,

    userLogout
} from "../actions/authActions";

import { 
    verifyTokenApi, 
    userLoginApi, 
    userLogoutApi,
    userSignUpApi 
} from '../../services/auth_api';






// handle user sign up
export const userSignUpAsync = (signUpObj) => async dispatch => {


    dispatch(userSignUpStarted());
    console.log(signUpObj);
    const result = await userSignUpApi(signUpObj);

    if (result.error) {
        dispatch(userSignUpFailure(result.response.data.message));
        return;
    }

    dispatch(userSignUpSuccess(result.data));
}

//TODO email checker if it exists already






// handle user login
export const userLoginAsync = (email, password) => async dispatch => {
    dispatch(userLoginStarted());

    const result = await userLoginApi(email, password);

    if (result.error) {
        dispatch(userLoginFailure(result.response.data.message));
        return;
    }

    dispatch(userLoginSuccess(result.data));
}










// handle verify token
export const verifyTokenAsync = (silentAuth = false) => async dispatch => {
    dispatch(verifyTokenStarted(silentAuth));

    const result = await verifyTokenApi();

    if (result.error) {
        dispatch(verifyTokenEnd());

        if (result.response && [401, 403].includes(result.response.status)) {
            dispatch(userLogout());
            return;
        }
    }

    if (result.status === 204) {
        dispatch(verifyTokenEnd());
    }
    else {
        dispatch(userLoginSuccess(result.data));
    }  
}








// handle user logout
export const userLogoutAsync = () => dispatch => {
    dispatch(userLogout());
    userLogoutApi();
}