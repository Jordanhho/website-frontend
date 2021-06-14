import {
    privateAxios
} from "./auth_api";

import {
    API_URL,
    privateApiRoutes
} from "../routes/api_routes";

//** Update Apps */

export const updateApps = async (data) => {
    try {
        return await privateAxios.post(
            API_URL + privateApiRoutes.UPDATE_APPS,
            data
        );
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

export const removeApp = async (app_id) => {
    try {
        return await privateAxios.post(
            API_URL + privateApiRoutes.REMOVE_APP,
            app_id
        );
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

//** Update About Me */

export const updateAboutMe = async (data) => {
    try {
        return await privateAxios.post(
            API_URL + privateApiRoutes.UPDATE_ABOUT_ME, 
            data,
            { //for file resume upload
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        );
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}