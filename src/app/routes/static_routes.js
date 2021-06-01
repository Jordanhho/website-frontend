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
        activateAccount: "/admin/login/activate_account/:email/:activation_code?",
        activateAccountTemplate: (email, activation_code = "") => `/admin/login/activate_account/${email}/${activation_code}`,
        forgotPassword: "/admin/login/forgot-password"
    },
}
export default staticRoutes;