import {
    privateAxios
} from "./auth_api";

import {
    API_URL,
    privateApiRoutes
} from "../routes/api_routes";

//** Update About Me */

//update about me data
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