import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => (
    {
        paper: {
            width: 'auto',
            marginTop: theme.spacing(3),
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        ul_none_style: {
            listStyle: "none",
            padding: 0
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        button: {
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.primary.dark + " !important",
            }
        },
        chip: {
            color: "white !important",
            maxWidth: "100%"
        },
        displayLink: {
            textDecoration: "underline !important",
            cursor: "pointer"
        },
        underline: {
            borderBottom: "1px solid " + theme.palette.primary.main,
        },
        link: {
            cursor: "pointer"
        },
        imgIcon: {
            width: "100px",
            height: "100px",
        },
        displayIcon: {
            fontSize: "60px",
        },
        iconInlineAlign: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        iconInline: {
            "fontSize": "50px",
        },
        iconPadding: {
            "paddingRight": "0px"
        },
        weatherIcon: {
            width: "100px",
            height: "100px",
            backgroundColor: "skyBlue"
        },
        technologyImg: {
            maxHeight: "50px",
            cursor: "pointer",
            maxWidth: "200px"
        },
        center: {
            textAlign: "center",
            maxWidth: "100%"
        },
        loader: { 
            paddingTop: '30vh', 
            paddingBottom: '30vh'
        },
        profilePicture: {
            width: "200px !important",
            height: "200px !important"
        },
        flip_text: {
            direction: "rtl", 
            unicodeBidi: "bidi-override"
        }
    }
));

export default useStyles;
