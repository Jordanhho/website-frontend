import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import BannerImg from "Assets/img/title_banner.jpg";

import useStyles from "./styles";

const TitleBanner = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.title_banner} style={{ backgroundImage: `url(${BannerImg})` }}>
            <Box pb={10} pt={10}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12} align="center">
                        <Typography variant="h3" color="primary">
                            {props.title}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default TitleBanner;