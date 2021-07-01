import React, { useState, useEffect, useCallback } from 'react';

import ReactHtmlParser from 'react-html-parser';

//icons
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Chip from '@material-ui/core/Chip';

import TitleBanner from "../../components/TitleBanner";
import Loader from "../../components/Loader";
import ChipInput from "../../components/ChipInput";
import useStyles from "./styles";

import {
    getResumeDisplayApi,
} from "../../services/public_api";

import {
    updateResumeDisplayApi
} from "../../services/private_api";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AdminResumeDisplay() {
    const pageTitle = "Admin Manage Resume";
    const classes = useStyles();

    const xsSize = 12;
    const mdSize = 10;

    const formRef = React.createRef();

    const [resumeDataBak, setJordanHoBak] = useState({});
    const [resumeData, setData] = useState({
            resume_url: "",
            education: [],
            school_experience: [],
            programming_languages_comfortable_with: [],
            programming_languages_experienced_with: [],
            technologies_comfortable_with: [],
            technologies_experienced_with: [],
            work_experience: [],
            year_gap_start: "",
            year_gap_end: "",
            year_gap_description: ""
    });

    const [readOnly, setReadOnly] = useState(true);

    const [loaded, setLoaded] = useState(null);
    const [openSuccessToast, setOpenSuccessToast] = useState(false);
    const [openFailureToast, setOpenFailureToast] = useState(false);

    function handleClose() {
        setOpenSuccessToast(false);
        setOpenFailureToast(false);
    }

    async function handleUpdate(e) {
        e.preventDefault();
        const postData = resumeData;
        const result = await updateResumeDisplayApi(postData);

        //if failed update, load backup
        if (!result.data) {
            setData(resumeDataBak);
            setReadOnly(true);
            setOpenFailureToast(true);
        }
        else {
            setData(result.data);
            setJordanHoBak(result.data);

            //successfully updated!
            setReadOnly(true);
            setOpenSuccessToast(true);
        }
    }

    function handleOnChangeChip(name, val) {
        setData({
            ...resumeData,
            [name]: val
        });
    }

    function handleOnDeleteChip(name, val) {
        let copyArr = [...resumeData[name]];
        copyArr.splice(copyArr.indexOf(val), 1)
        setData({
            ...resumeData,
            [name]: copyArr
        });
    }

    //for inner array chips
    function handleArrChangeChip(name, index, innerKey, val) {
        let copyArr = [...resumeData[name]];
        copyArr[index][innerKey] = val;
        setData({
            ...resumeData,
            [name]: copyArr
        });
    }
    function handleArrOnDeleteChip(name, index, innerKey, val) {
        let copyArr = [...resumeData[name]];
        copyArr[index][innerKey].splice(copyArr[index][innerKey].indexOf(val), 1)
        setData({
            ...resumeData,
            [name]: copyArr
        });
    }

    function handleOnClickEdit() {
        setJordanHoBak(resumeData);
        setReadOnly(false);
    }

    function handleOnClickCancel() {
        setData(resumeDataBak);
        setReadOnly(true);
    }

    function handleOnChange(e, index, arrName) {
        if (typeof index === "undefined") {
            setData({
                ...resumeData,
                [e.target.name]: e.target.value
            });
        }
        else {
            let copyArr = [...resumeData[arrName]];
            copyArr[index][e.target.name] = e.target.value;
            setData({
                ...resumeData,
                [arrName]: copyArr
            });
        }
    }

    const fetchData = useCallback(async () => {
        const result = await getResumeDisplayApi();
        if (result.data) {
            setData(result.data);
            setJordanHoBak(result.data);
            setLoaded(true);
        }
        else {
            setLoaded(false);
        }
    }, []);

    useEffect(() => {
        document.title = pageTitle;
        fetchData();
    }, [fetchData]);

    if (loaded === null) {
        return (
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.loader}
                >
                    <Grid item xs={3}>
                        <Loader />
                    </Grid>

                </Grid>
            </Container>
        );
    }
    if (loaded === false) {
        return (
            <div>
                Error, something went wrong.
            </div>
        );
    }
    return (
        <div>
            <TitleBanner title={pageTitle} />
            <Box p={2}>
                {(readOnly) &&
                    <Fab
                        color="primary"
                        aria-label="edit"
                        className={classes.pinnedEditBtn}
                        onClick={handleOnClickEdit}
                    >
                        <EditIcon />
                    </Fab>}

                {(!readOnly) &&
                    <Grid container justify="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOnClickCancel}
                            className={classes.pinnedCancelBtn}
                            endIcon={<CancelIcon />}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdate}
                            className={classes.pinnedSaveBtn}
                            endIcon={<SaveIcon />}
                            type="submit"
                        >
                            Save
                    </Button>
                </Grid>}

                <form onSubmit={handleUpdate} ref={formRef}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            Education
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} align="left">
                                        <br />
                                        {resumeData.education.map((educ, index) => (
                                            <Box pb={2} key={index}>
                                                {(readOnly) &&
                                                <Grid
                                                    container
                                                    justify="center"
                                                    alignItems="left"
                                                >
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="h6" color="primary">
                                                            {educ.education_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="body1">
                                                            {educ.school_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="caption">
                                                            {educ.date_start} - {educ.date_end}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="caption">
                                                            {educ.location}
                                                        </Typography>
                                                    </Grid>
                                                    <br />
                                                    <br />
                                                    {(educ.education_description) &&
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="body2" >
                                                            {ReactHtmlParser(educ.education_description)}
                                                        </Typography>
                                                    </Grid>}
                                                </Grid>}

                                                {(!readOnly) &&
                                                <Grid
                                                    container
                                                    justify="center"
                                                    alignItems="left"
                                                    spacing={3}

                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6" color="primary" align="left">
                                                            {educ.education_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <TextField
                                                            className={classes.textField}
                                                            fullWidth
                                                            label="Education Name"
                                                            name="education_name"
                                                            variant="outlined"
                                                            InputProps={{
                                                                readOnly: readOnly
                                                            }}
                                                            onChange={(e) => { handleOnChange(e, index, "education") }}
                                                            value={educ.education_name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <TextField
                                                            className={classes.textField}
                                                            fullWidth
                                                            label="School Name"
                                                            name="school_name"
                                                            variant="outlined"
                                                            InputProps={{
                                                                readOnly: readOnly
                                                            }}
                                                            onChange={(e) => { handleOnChange(e, index, "education") }}
                                                            value={educ.school_name}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                label="Date Start"
                                                                name="date_start"
                                                                variant="outlined"
                                                                InputProps={{
                                                                    readOnly: readOnly
                                                                }}
                                                                onChange={(e) => { handleOnChange(e, index, "education") }}
                                                                value={educ.date_start}
                                                            />
                                                            <br />
                                                            <br />
                                                            <TextField
                                                                className={classes.textField}
                                                                label="Date End"
                                                                name="date_end"
                                                                variant="outlined"
                                                                InputProps={{
                                                                    readOnly: readOnly
                                                                }}
                                                                onChange={(e) => { handleOnChange(e, index, "education") }}
                                                                value={educ.date_end}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <TextField
                                                            className={classes.textField}
                                                            fullWidth
                                                            label="Location"
                                                            name="location"
                                                            variant="outlined"
                                                            InputProps={{
                                                                readOnly: readOnly
                                                            }}
                                                            onChange={(e) => { handleOnChange(e, index, "education") }}
                                                            value={educ.location}
                                                        />
                                                    </Grid>
                                                    {(educ.education_description) &&
                                                    <Grid item xs={12} align="left">
                                                        <TextField
                                                            className={classes.textField}
                                                            fullWidth
                                                            multiline
                                                            label="Education Description"
                                                            name="education_description"
                                                            rows={15}
                                                            variant="outlined"
                                                            onChange={(e) => { handleOnChange(e, index, "education")}}
                                                            value={educ.education_description}
                                                            InputProps={{
                                                                readOnly: readOnly,
                                                            }}
                                                        />
                                                    </Grid>}
                                                </Grid>}
                                            </Box>
                                        ))}
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="primary" className={classes.underline}>
                                            Programming Languages
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />
                                    {(readOnly) &&
                                    <Grid item xs={12}>
                                        <Grid container direction="row">
                                            <Grid item xs={6} align="center">
                                                <Typography variant="h6" color="primary">
                                                            Comfortable with
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} align="center">
                                                <Typography variant="h6" color="primary">
                                                            Experienced with
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} align="center">
                                                <ul className={classes.ul_none_style}>
                                                    {resumeData.programming_languages_comfortable_with.map((progLang, index) => (
                                                        <li key={index}>
                                                            <Chip label={progLang} className={classes.chip} variant="outlined" color="primary"/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Grid>
                                            <Grid item xs={6} align="center">
                                                <ul className={classes.ul_none_style}>
                                                    {resumeData.programming_languages_experienced_with.map((progLang, index) => (
                                                        <li key={index}>
                                                            <Chip label={progLang} className={classes.chip} variant="outlined" color="primary"/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Grid>
                                        </Grid>
                                    </Grid>}

                                    {(!readOnly) &&
                                    <Grid item xs={12}>
                                        <ChipInput
                                            label="Comfortable with"
                                            name="programming_languages_comfortable_with"
                                            value={resumeData.programming_languages_comfortable_with}
                                            readOnly={readOnly}
                                            onDelete={handleOnDeleteChip}
                                            onChange={handleOnChangeChip}
                                        />
                                        <br />
                                        <br />
                                        <ChipInput
                                            label="Experienced With"
                                            name="programming_languages_experienced_with"
                                            value={resumeData.programming_languages_experienced_with}
                                            readOnly={readOnly}
                                            onDelete={handleOnDeleteChip}
                                            onChange={handleOnChangeChip}
                                        />
                                    </Grid>}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="primary" className={classes.underline}>
                                            Technologies
                                        </Typography>
                                    </Grid>
                                    <br />
                                    <br />

                                    {(readOnly) &&
                                    <Grid item xs={12}>
                                        <Grid container direction="row">
                                            <Grid item xs={6} align="center">
                                                <Typography variant="h6" color="primary">
                                                    Comfortable with
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} align="center">
                                                <Typography variant="h6" color="primary">
                                                    Experienced with
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={6} align="center">
                                                <ul className={classes.ul_none_style}>
                                                    {resumeData.technologies_comfortable_with.map((tech, index) => (
                                                        <li key={index}>
                                                            <Chip label={tech} className={classes.chip} variant="outlined" color="primary" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Grid>
                                            <Grid item xs={6} align="center">
                                                <ul className={classes.ul_none_style}>
                                                    {resumeData.technologies_experienced_with.map((tech, index) => (
                                                        <li key={index}>
                                                            <Chip label={tech} className={classes.chip} variant="outlined" color="primary" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Grid>
                                        </Grid>
                                    </Grid>}

                                    {(!readOnly) &&
                                    <Grid item xs={12}>
                                        <ChipInput
                                            label="Comfortable with"
                                            name="technologies_comfortable_with"
                                            value={resumeData.technologies_comfortable_with}
                                            readOnly={readOnly}
                                            onDelete={handleOnDeleteChip}
                                            onChange={handleOnChangeChip}
                                        />
                                        <br />
                                        <br />
                                        <ChipInput
                                            label="Experienced With"
                                            name="technologies_experienced_with"
                                            value={resumeData.technologies_experienced_with}
                                            readOnly={readOnly}
                                            onDelete={handleOnDeleteChip}
                                            onChange={handleOnChangeChip}
                                        />
                                    </Grid>}

                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            Work Experience
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} align="left">
                                        <br />
                                        {resumeData.work_experience.map((workXp, index) => (
                                            <Box pb={5} key={index}>
                                                {(readOnly) &&
                                                    <Grid
                                                        container
                                                        justify="center"
                                                        alignItems="left"
                                                    >
                                                        <Grid item xs={12} align="left">
                                                            <Typography variant="h6" color="primary">
                                                                {workXp.company_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <Typography variant="body1">
                                                            {workXp.position_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <Typography variant="caption">
                                                            {workXp.date_start} - {workXp.date_end}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <Typography variant="caption">
                                                                {workXp.location}
                                                            </Typography>
                                                        </Grid>
                                                        <br/>
                                                        <br />
                                                        <Grid item xs={12} align="left">
                                                            <Typography variant="body2" >
                                                                {ReactHtmlParser(workXp.experience_description)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <br />
                                                            {workXp.technologies.map((tech, index) => (
                                                                <Chip label={tech} className={classes.chip} variant="outlined" color="primary" key={index}/>
                                                            ))}
                                                        </Grid>
                                                    </Grid>}

                                                {(!readOnly) &&
                                                    <Grid
                                                        container
                                                        justify="center"
                                                        alignItems="left"
                                                        spacing={3}
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" color="primary" align="left">
                                                                {workXp.company_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                fullWidth
                                                                label="Company Name"
                                                                name="company_name"
                                                                variant="outlined"
                                                                InputProps={{
                                                                    readOnly: readOnly
                                                                }}
                                                                onChange={(e) => { handleOnChange(e, index, "work_experience") }}
                                                                value={workXp.company_name}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <Grid item xs={12} align="left">
                                                                <TextField
                                                                    className={classes.textField}
                                                                    label="Date Start"
                                                                    name="date_start"
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        readOnly: readOnly
                                                                    }}
                                                                    onChange={(e) => { handleOnChange(e, index, "work_experience") }}
                                                                    value={workXp.date_start}
                                                                />
                                                                <br />
                                                                <br />
                                                                <TextField
                                                                    className={classes.textField}
                                                                    label="Date End"
                                                                    name="date_end"
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        readOnly: readOnly
                                                                    }}
                                                                    onChange={handleOnChange}
                                                                    value={workXp.date_end}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                fullWidth
                                                                label="Location"
                                                                name="location"
                                                                variant="outlined"
                                                                InputProps={{
                                                                    readOnly: readOnly
                                                                }}
                                                                onChange={(e) => { handleOnChange(e, index, "work_experience") }}
                                                                value={workXp.location}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                fullWidth
                                                                multiline
                                                                label="Experience Description"
                                                                name="experience_description"
                                                                rows={15}
                                                                variant="outlined"
                                                                onChange={(e) => { handleOnChange(e, index, "work_experience") }}
                                                                value={workXp.experience_description}
                                                                InputProps={{
                                                                    readOnly: readOnly,
                                                                }}
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <br />
                                                        <Grid item xs={12} >
                                                            <ChipInput
                                                                label="Technologies"
                                                                name="technologies"
                                                                value={workXp.technologies}
                                                                readOnly={readOnly}
                                                                onDelete={(name, val) => {
                                                                    handleArrOnDeleteChip("work_experience", index, name, val)
                                                                }}
                                                                onChange={(name, val) => {
                                                                    handleArrChangeChip("work_experience", index, name, val)
                                                                }}
                                                            />
                                                        </Grid>
                                                    </Grid>}
                                            </Box>
                                        ))}
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            School Experience
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} align="left">
                                        <br />
                                        {resumeData.school_experience.map((schoolXp, index) => (
                                            <Box pb={5} key={index}>
                                                {(readOnly) &&
                                                <Grid
                                                    container
                                                    justify="center"
                                                    alignItems="left"
                                                >
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="h6" color="primary">
                                                            {schoolXp.project_for}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="body1">
                                                            {schoolXp.project_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="body1">
                                                            {schoolXp.position_name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="caption">
                                                            {schoolXp.date_start} - {schoolXp.date_end}
                                                        </Typography>
                                                    </Grid>
                                                    <br/>
                                                    <br />
                                                    {(schoolXp.experience_description) &&
                                                    <Grid item xs={12} align="left">
                                                        <Typography variant="body2" >
                                                            {ReactHtmlParser(schoolXp.experience_description)}
                                                        </Typography>
                                                    </Grid>}
                                                </Grid>}

                                                {(!readOnly) &&
                                                    <Grid
                                                        container
                                                        justify="center"
                                                        alignItems="left"
                                                        spacing={3}
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="h6" color="primary" align="left">
                                                                {schoolXp.project_for}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                fullWidth
                                                                label="Project For"
                                                                name="project_for"
                                                                variant="outlined"
                                                                InputProps={{
                                                                    readOnly: readOnly
                                                                }}
                                                                onChange={(e) => { handleOnChange(e, index, "school_experience") }}
                                                                value={schoolXp.project_for}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                fullWidth
                                                                label="Project Name"
                                                                name="project_name"
                                                                variant="outlined"
                                                                InputProps={{
                                                                    readOnly: readOnly
                                                                }}
                                                                onChange={(e) => { handleOnChange(e, index, "school_experience") }}
                                                                value={schoolXp.project_name}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} align="left">
                                                            <Grid item xs={12} align="left">
                                                                <TextField
                                                                    className={classes.textField}
                                                                    label="Date Start"
                                                                    name="date_start"
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        readOnly: readOnly
                                                                    }}
                                                                    onChange={(e) => { handleOnChange(e, index, "school_experience") }}
                                                                    value={schoolXp.date_start}
                                                                />
                                                                <br />
                                                                <br />
                                                                <TextField
                                                                    className={classes.textField}
                                                                    label="Date End"
                                                                    name="date_end"
                                                                    variant="outlined"
                                                                    InputProps={{
                                                                        readOnly: readOnly
                                                                    }}
                                                                    onChange={(e) => { handleOnChange(e, index, "school_experience") }}
                                                                    value={schoolXp.date_end}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        {(schoolXp.education_description) &&
                                                        <Grid item xs={12} align="left">
                                                            <TextField
                                                                className={classes.textField}
                                                                fullWidth
                                                                multiline
                                                                label="Experience Description"
                                                                name="experience_description"
                                                                rows={15}
                                                                variant="outlined"
                                                                onChange={(e) => { handleOnChange(e, index, "school_experience") }}
                                                                value={schoolXp.experience_description}
                                                                InputProps={{
                                                                    readOnly: readOnly,
                                                                }}
                                                            />
                                                        </Grid>}

                                                        <br />
                                                        <br />
                                                        <Grid item xs={12} >
                                                            <ChipInput
                                                                label="Technologies"
                                                                name="technologies"
                                                                value={schoolXp.technologies}
                                                                readOnly={readOnly}
                                                                onDelete={(name, val) => {
                                                                    handleArrOnDeleteChip("school_experience", index, name, val)
                                                                }}
                                                                onChange={(name, val) => {
                                                                    handleArrChangeChip("school_experience", index, name, val)
                                                                }}
                                                            />
                                                        </Grid>
                                                        
                                                    </Grid>}
                                            </Box>
                                        ))}
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Grid item xs={xsSize} md={mdSize}>
                            <Paper className={classes.paper}>
                                <Box p={3} className={classes.center}>
                                    <Grid item xs={12}>
                                        <Typography variant="h4" color="Primary" className={classes.underline}>
                                            Year Gap After University
                                            </Typography>
                                    </Grid>
                                    <br/>
                                    {(readOnly) &&
                                    <Grid
                                        container
                                        justify="center"
                                        alignItems="left"
                                    >
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="primary">
                                                {resumeData.year_gap_start} - {resumeData.year_gap_end}
                                            </Typography>
                                        </Grid>
                                        <br/>
                                        <br />
                                        <Grid item xs={12} align="left">
                                            <Typography variant="body2" gutterBottom>
                                                {ReactHtmlParser(resumeData.year_gap_description)}
                                            </Typography>
                                        </Grid>
                                    </Grid>}
                                    {(!readOnly) &&
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="left"
                                            spacing={3}
                                        >
                                            <Grid item xs={12}>
                                                <TextField
                                                    className={classes.textField}
                                                    label="Date Start"
                                                    name="year_gap_start"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={resumeData.year_gap_start}
                                                />
                                                <br />
                                                <br />
                                                <TextField
                                                    className={classes.textField}
                                                    label="Date End"
                                                    name="year_gap_end"
                                                    variant="outlined"
                                                    InputProps={{
                                                        readOnly: readOnly
                                                    }}
                                                    onChange={handleOnChange}
                                                    value={resumeData.year_gap_end}
                                                />
                                            </Grid>
                                            <Grid item xs={12} align="left">
                                                <TextField
                                                    className={classes.textField}
                                                    fullWidth
                                                    multiline
                                                    label="Year Gap Description"
                                                    name="year_gap_description"
                                                    rows={15}
                                                    variant="outlined"
                                                    onChange={handleOnChange}
                                                    value={resumeData.year_gap_description}
                                                    InputProps={{
                                                        readOnly: readOnly,
                                                    }}
                                                />
                                            </Grid>
                                    </Grid>}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar open={openSuccessToast} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Successfully saved!
                    </Alert>
                </Snackbar>
                <Snackbar open={openFailureToast} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Error, something went wrong with saving.
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    )
}
export default AdminResumeDisplay;