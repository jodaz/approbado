import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@approbado/lib/styles';
import { useLogin } from 'react-admin';
import queryString from 'query-string'
import Spinner from '../components/Spinner';

const Authenticate = () => {
    const { search } = useLocation()
    const values = queryString.parse(search)
    const login = useLogin()
    const { token } = values;

    React.useEffect(() => {
        if (token) {
            login(token, '/')
        }
    }, [token, login])

    return <Spinner />;
};

Authenticate.propTypes = {
    authProvider: PropTypes.func,
};

const AuthenticateWithTheme = (props) => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Authenticate {...props} />
    </ThemeProvider>
);

export default AuthenticateWithTheme;
