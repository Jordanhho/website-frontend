import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: '#A7FFEB',
            main: '#1DE9B6',
            active: '#FF4081',
            dark: '#FF4081', //TODO figure out how to override button color
            contrastText: '#000',
            
        },
        secondary: {
            light: '#FF80AB',
            main: '#FF4081',
            dark: '#F50057',
            contrastText: '#000',
        },
    },
    overrides: {
        MuiButton: {
            outlined: {
                "&:hover": {
                    backgroundColor: '#FF4081 !important',
                }
            },
        }, 
    },
});

export default theme;

/*

    palette: {
        type: "dark",
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },

    palette: {
        text: {
            primary: "#ffffff",
            secondary: "#00000"
        },
        type: "dark",
        active: {
            main: '#ff669a'
        },
        primary: {

            main: '#212121'
        },
        secondary: {
            main: '#ff4081',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        background: {
            main: "#121212"
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    }
*/