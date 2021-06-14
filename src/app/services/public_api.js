import axios from "axios";

import {
    API_URL,
    publicApiRoutes
} from "../routes/api_routes";

export async function getAboutMe() {
    try {
        return await axios.get(API_URL + publicApiRoutes.ABOUT_ME).then((result) => result);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}

export async function getApps() {
    try {
        return await axios.get(API_URL + publicApiRoutes.APPS).then((result) => result);
    } catch (err) {
        return {
            error: true,
            response: err.response
        };
    }
}