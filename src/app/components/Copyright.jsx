import React from "react";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'© 2021 '}
            <Link color="inherit" href="https://material-ui.com/">
                Jordan Ho - Powered by Node & React
        </Link>
            {'.'}
        </Typography>
    );
}
export default Copyright;
