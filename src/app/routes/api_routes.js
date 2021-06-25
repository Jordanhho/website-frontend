//switch between production and development to the reactjs server
export const API_URL = ((process.env.NODE_ENV === "development") 
    ? "http://localhost:8080"
    : "https://jordanho.ca"
);

export const authApiRoutes = {
    LOGIN: "/api/auth/login",
    VERIFY_LOGIN_SESSION: "/api/auth/verify-login-session",
    LOGOUT: "/api/auth/logout",

    SIGNUP: "/api/auth/signup",
    ACTIVATE_ACCOUNT: "/api/auth/activate-account",

    SEND_RESET_PASSWORD_EMAIL: "/api/auth/send-reset-password-email",
    VERIFY_RESET_PASSWORD_CODE: "/api/auth/verify-reset-password-code",
    RESET_PASSWORD: "/api/auth/reset-password",
}

export const publicApiRoutes = {
    HOME: "/api/home",
    APPS: "/api/apps",
    RESUME_DISPLAY: "/api/resume-display",
    ABOUT_ME: "/api/about-me",
    CONTACT_ME: "/api/contact-me",
    ABOUT_WEBSITE: "/api/about-website",
    LOGIN_SETTINGS: "/api/login-settings",
}

export const privateApiRoutes = {
    UPDATE_HOME: "/api/home/update",

    UPDATE_ABOUT_ME: "/api/about-me/update",

    UPDATE_APPS: "/api/apps/update",
    REMOVE_APP: "/api/apps/remove",

    GET_ADMIN_SETTINGS: "/api/admin/settings",
    UPDATE_ADMIN_SETTINGS: "/api/admin/settings/update",

    UPDATE_RESUME_DISPLAY: "/api/admin/resume-display/update",

    GET_JORDAN_HO: "/api/admin/jordan-ho",
    UPDATE_JORDAN_HO: "/api/admin/jordan-ho/update",

    GET_BUCKET_FILES: "/api/admin/bucket-files",
    UPDATE_BUCKET_FILES: "/api/admin/bucket-files/update"
}