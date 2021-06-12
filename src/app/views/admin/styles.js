import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        cursor: "pointer"
    },
    icon: {
        width: "30px",
        height: "30px",
    },
    profilePicture: {
        width: "200px",
        height: "200px"
    },
    pinnedEditBtn: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    pinnedSaveBtn: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    pinnedCancelBtn: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(14),
    }
}));

export default useStyles;