import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'auto',
        marginTop: theme.spacing(3),
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
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
    profilePicture: {
        width: "200px",
        height: "200px"
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
        "paddingRight": "10px"
    },
    weatherIcon: {
        width: "100px",
        height: "100px",
        backgroundColor: "skyBlue"
    },
    techonologyImg: {
        maxHeight: "50px",
        cursor: "pointer",
        maxWidth: "200px"
    },
    center: {
        textAlign: "center"
    },
    loader: { 
        paddingTop: '30vh', 
        paddingBottom: '30vh'
    }
}));

export default useStyles;
