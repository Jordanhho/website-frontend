import axios from "axios";

import {
    handleApi
} from "./api_utility";

import {
    API_URL,
    privateApiRoutes
} from "../routes/api_routes";

//* Get Admin Home */
export const getAdminSettings = async (data) => {
    try {
        let res = await axios.get(
            API_URL + privateApiRoutes.GET_ADMIN_SETTINGS,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

//** Update Apps */

export const updateApps = async (data) => {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_APPS,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export const removeApp = async (app_id) => {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.REMOVE_APP,
            app_id
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

//** Update About Me */

export const updateAboutMe = async (data) => {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_ABOUT_ME, 
            data,
            { //for file resume upload
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

/** Update Admin Home */
export const updateAdminSettings = async (data) => {
    try {
        let res = await axios.post(
            API_URL + privateApiRoutes.UPDATE_ADMIN_SETTINGS,
            data
        );
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}