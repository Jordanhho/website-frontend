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
    ABOUT_ME: "/api/about-me",
    APPS: "/api/apps",
    HOME: "/api/home",
    LOGIN_SETTINGS: "/api/login-settings"
}

export const privateApiRoutes = {
    UPDATE_ABOUT_ME: "/api/about-me/update",
    UPDATE_APPS: "/api/apps/update",
    REMOVE_APP: "/api/apps/remove",
    UPDATE_HOME: "/api/home/update",
    GET_ADMIN_SETTINGS: "/api/admin/settings",
    UPDATE_ADMIN_SETTINGS: "/api/admin/settings/update"
}