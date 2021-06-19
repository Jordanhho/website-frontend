import axios from "axios";

import {
    API_URL,
    publicApiRoutes
} from "../routes/api_routes";

import {
    handleApi
} from "./api_utility";

export async function getLoginSettingsApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.LOGIN_SETTINGS);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function getHomeApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.HOME);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function getAboutMeApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.ABOUT_ME);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}

export async function getAppsApi() {
    try {
        let res = await axios.get(API_URL + publicApiRoutes.APPS);
        return await handleApi(res);
    } catch (err) {
        return {
            error: true,
            msg: err.response
        };
    }
}