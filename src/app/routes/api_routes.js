export const API_URL = "http://localhost:8080";

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
    HOME: "/api/home"
}