import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        width: "100%"
    },
    ul_none_style: {
        listStyle: "none",
        padding: 0
    },
    chip: {
        color: "white !important",
        maxWidth: "100%"
    },
    underline: {
        borderBottom: "1px solid " + theme.palette.primary.main,
    },
    deleteBtn: {
        border: "1px solid " + theme.palette.primary.main + " !important",
    },
    formControl: {
        margin: theme.spacing(1)
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
        zIndex: "999"
    },
    pinnedSaveBtn: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: "999"
    },
    pinnedCancelBtn: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(14),
        zIndex: "999"
    },
    center: {
        textAlign: "center",
        width: "100%"
    },
}));

export default useStyles;