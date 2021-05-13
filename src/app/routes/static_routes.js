

const staticRoutes = {
    main: {
        apps: "/apps",
        aboutMe: "/about-me",
        home: "/"
    },
    admin: {
        home: "/admin",
        aboutMe: "/admin/about-me",
        apps: "/admin/apps",
        login: "/admin/login",
        signUp: "/admin/login/signup",
        forgotPassword: "/admin/login/forgot-password",
        email_verification_link: "/admin/login/email_verification/:linkHash",
        reset_password_link: "/admin/login/reset_password/:linkHash"
    },
}

export default staticRoutes;


// export const ROOT_URL = "/";
// export const about_me_url = "/about-me";

// export const apps_url = "/apps";

// export const admin_url = "/admin";

// export const about_me_admin_url = admin_url + "/aboutme";










// //csgo app items
// export const csgo_app_root_url = "/csgo-app";

// export const csgo_util_app_url = csgo_app_root_url + "/util";

// export const csgo_util_app_util_details_test_url = "/util-details/uploadtest";

// export const csgo_util_app_map_details_url = csgo_util_app_url + "/map-details/:mapId";

// export const csgo_util_app_util_details_add_url = csgo_util_app_map_details_url + "/util-details/add";

// export const csgo_util_app_util_details_url = csgo_util_app_map_details_url + "/util-details/:utilId";

// // export const csgo_util_maps_app_url = csgo_util_app_url + "/util";
// // export const csgo_util_details_app_url = csgo_util_app_url + "/util/";

// export const csgo_callouts_app_url = csgo_app_root_url + "/callouts";


// export const upload_img_example_url = csgo_app_root_url + "/upload";


// export const getUtilMapDetailsUrl = (mapId) => {
//     return csgo_util_app_url + "/map-details/" + mapId;
// }

// export const getUtilDetailsUrl = (mapId, utilId) => {
//     return csgo_util_app_url + "/map-details/" + mapId + "/util-details/" + utilId;
// }
