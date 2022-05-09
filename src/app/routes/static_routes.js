const staticRoutes = {
    personal_website: 'https://jordanho.ca/',
    main: {
        name: 'Home',
        abs: '/',
        relLink: '/',
        layoutLink: '/*',
        resumeDisplay: {
            name: 'My Experience',
            abs: '/resume-display',
            relLink: '/resume-display',
        },
        apps: {
            name: 'My Projects',
            abs: '/apps',
            relLink: '/apps',
        },
        aboutMe: {
            name: 'About Me',
            abs: '/about-me',
            relLink: '/about-me',
        },
        contactMe: {
            name: 'Contact Me',
            abs: '/contact-me',
            relLink: '/contact-me',
        },
        aboutWebsite: {
            name: 'About Website',
            abs: '/about-website',
            relLink: '/about-website',
        }
    },
    admin: {
        name: 'Admin Manage Settings',
        abs: '/admin',
        relLink: '/',
        layoutLink: '/admin/*',
        aboutMe: {
            name: 'Manage About Me',
            abs: '/admin/about-me',
            relLink: '/about-me',
        },
        apps: {
            name: 'Manage Projects',
            abs: '/admin/apps',
            relLink: '/apps',
        },
        jordanHo: {
            name: 'Manage Jordan Ho',
            abs: '/admin/jordan-ho',
            relLink: '/jordan-ho',
        },
        bucketFiles: {
            name: 'Bucket Files',
            abs: '/admin/bucket-files',
            relLink: '/bucket-files',
        },
        resumeDisplay: {
            name: 'Manage Resume',
            abs: '/admin/resume-display',
            relLink: '/resume-display',
        },
        login: {
            name: 'Login',
            abs: '/admin/login/',
            relLink: '/',
            layoutLink: '/login/*',
            signUp: {
                name: 'Sign Up',
                abs: '/admin/login/signup',
                relLink: '/signup',
            },
            activateAccount: {
                name: 'Admin Activate Account',
                abs: '/admin/login/activate_account/:email/:activation_code?',
                relLink: '/activate_account/:email/:activation_code?',
            },
            forgotPassword: {
                name: 'Forgot Password',
                abs: '/admin/login/forgot-password',
                relLink: '/forgot-password',
            },
            activateAccountTemplate: (email, activation_code = "") => `/admin/login/activate_account/${email}/${activation_code}`,
        }, 
    },
}

export default staticRoutes;