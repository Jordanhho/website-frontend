//requests server to check if session token is still valid, return true if so, else return false
import axios from 'axios';

import store from "../redux/stores/index";

import {
    csgoAppLogout
} from "../redux/actions";


export function getCsrfToken() {
    return new Promise(resolve => {
        axios.get('/api-getCsrfToken')
            .then((res) => {
                resolve(true);
            })
            .catch(err => {
                console.error(err);
                resolve(false);
            });
    });
}

function handleApiCallback(resolve, data) {
    //if data returns is "error"", logout.
    if (data == "error") {
        store.dispatch(csgoAppLogout());
        resolve(null);
    }
    else {
        resolve(data);
    }
}

const API_IS_VALID_SESSION = "/api-isValidSession";

const API_GET_BASE_MAP_DATA = "/api-getBaseMapData";
const API_GET_MAP_UTIL_DATA = "/api-getMapUtilData";
const API_GET_UTIL_DATA = "/api-getUtilData";

const API_ADD_UTIL_DATA = "/api-addUtil";
const API_EDIT_UTIL_DATA = "/api-editUtil";

const API_GET_REQ = "GET";
const API_POST_REQ = "POST";


//calls an API if logged in
export function useApi(apiRoute, postData) {
    return new Promise((resolve, reject) => {
        //this checks if the user has a cookie called sessionToken and checks the server with it if it is valid
        const sessionToken = getSessionTokenFromCookie();
        //no such active session, logout.
        if (!sessionToken) {
            console.log("no session token");
            store.dispatch(csgoAppLogout());
            resolve(null);
        }
        switch (apiRoute) {
            case API_GET_BASE_MAP_DATA:
                handleAxioReq(API_GET_REQ, apiRoute).then((data) => {
                    handleApiCallback(resolve, data);
                });
                break;
            case API_IS_VALID_SESSION:
                let activeSession = null;
                handleAxioReq(API_GET_REQ, apiRoute).then((data) => {
                    if (data.success) {
                        console.log("VALID Session Token ");
                        activeSession = true;
                    }
                    else {
                        console.log("INVALID session token");
                        activeSession = false;
                    }
                    handleApiCallback(resolve, activeSession);
                });
                break;
            case API_GET_MAP_UTIL_DATA:
                handleAxioReq(API_POST_REQ, apiRoute, postData).then((data) => {
                    handleApiCallback(resolve, data);
                });
                break;
            case API_GET_UTIL_DATA:
                console.log(postData);
                handleAxioReq(API_POST_REQ, apiRoute, postData).then((data) => {
                    handleApiCallback(resolve, data);
                });
                break;

            case API_ADD_UTIL_DATA:
                handleAxioReq(API_POST_REQ, apiRoute, postData).then((data) => {
                    handleApiCallback(resolve, data);
                });
                break;

            case API_EDIT_UTIL_DATA:

                break;
            default:
                console.log("No such API" + apiRoute);
                resolve(null);
        }
    });
}

async function handleAxioReq(typeReq, apiRoute, postData) {
    return new Promise(resolve => {
        switch (typeReq) {
            case API_GET_REQ:
                axios.get(apiRoute, postData)
                    .then((res) => {
                        let data = res.data;
                        resolve(data);
                    })
                    .catch(err => {
                        console.error(err);
                        resolve("error");
                    });
                break;
            case API_POST_REQ:
                axios.post(apiRoute, postData)
                    .then((res) => {
                        let data = res.data;
                        resolve(data);
                    })
                    .catch(err => {
                        console.error(err);
                        resolve("error");
                    });
                break;
            default:
                console.log("no such request");
                resolve("error");
        }
    });
}


export function loginToApp(postData) {
    return new Promise(resolve => {
        axios.post('/api-login', postData)
            .then((res) => {
                //if response success is true, that means successfully logged in
                if (res.data.success) {
                    console.log("Logged in!");
                    resolve(true);
                }
                else {
                    console.log("In valid login details");
                    resolve(false);
                }
            })
            .catch(err => {
                console.error(err);
                resolve("error");
            });
    });
}

// async function checkSessionStatus() {
//     return new Promise(resolve => {
//         //this checks if the user has a cookie called sessionToken and checks the server with it if it is valid
//         const sessionToken = getSessionTokenFromCookie();
//         if (sessionToken) {
//             axios.get('/api-isValidSession')
//                 .then((res) => {
//                     if (res.data.success) {
//                         console.log("VALID Session Token ");
//                         resolve(true);
//                     }
//                     else {
//                         console.log("INVALID session token");
//                         resolve(false);
//                     }
//                 })
//                 .catch(err => {
//                     console.error(err);
//                     resolve("error");
//                 });
//         }
//         //cookies don't exist, 
//         else {
//             console.log("No session token!");
//             resolve(false);
//         }
//     });
// }

function getSessionTokenFromCookie() {
    let cookies = document.cookie;
    if (cookies !== "") {
        let cookieParts = cookies.split('; ');
        let cookieData = {};
        for (let i = 0; i < cookieParts.length; i++) {
            let cur = cookieParts[i].split('=');
            cookieData[cur[0]] = cur[1];
        }
        const sessionToken = cookieData.sessionToken;
        if (sessionToken != "") {
            return sessionToken;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

export function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}