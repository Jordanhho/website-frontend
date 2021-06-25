const staticRoutes = {
    main: {
        home: "/",
        resumeDisplay: "/resume-display",
        apps: "/apps",
        aboutMe: "/about-me",
        contactMe: "/contact-me",
        aboutWebsite: "/about-website",
    },
    admin: {
        home: "/admin",
        aboutMe: "/admin/about-me",
        apps: "/admin/apps",
        jordanHo: "/admin/jordan-ho",
        bucketFiles: "/admin/bucket-files",
        resumeDisplay: "/admin/resume-display",
        login: "/admin/login",
        signUp: "/admin/login/signup",
        activateAccount: "/admin/login/activate_account/:email/:activation_code?",
        activateAccountTemplate: (email, activation_code = "") => `/admin/login/activate_account/${email}/${activation_code}`,
        forgotPassword: "/admin/login/forgot-password"
    }
}
export default staticRoutes;