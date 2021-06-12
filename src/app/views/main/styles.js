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
        // "paddingLeft": "0px", 
        "fontSize": "50px",
    },
    iconPadding: {
        "paddingRight": "10px"
    }
}));

export default useStyles;
