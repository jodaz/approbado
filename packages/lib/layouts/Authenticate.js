import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { theme } from '@approbado/lib/styles';
import { useLogin } from 'react-admin';
import queryString from 'query-string'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main
    },
    loader: {
        height: '5em !important',
        width: '5em !important',
    }
}));

const Login = () => {
    const { search } = useLocation()
    const values = queryString.parse(search)
    const login = useLogin()
    const classes = useStyles()
    const { token } = values;

    React.useEffect(() => {
        if (token) {
            login(token, '/')
        }
    }, [token, login])

    return (
        <Box className={classes.root}>
            <CircularProgress className={classes.loader}/>
        </Box>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
};

const LoginWithTheme = (props) => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
