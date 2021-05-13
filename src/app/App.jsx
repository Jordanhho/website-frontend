import React from 'react';
import { CookiesProvider } from "react-cookie";
import theme from './theme/theme';

import { MuiThemeProvider } from '@material-ui/core/styles';
import {
    Route,
    BrowserRouter
} from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import AppLayout from "./views/AppLayout";

function App() {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Route path="/" component={AppLayout} />
                </MuiThemeProvider>
            </BrowserRouter>
        </CookiesProvider>
    )
}
export default App;