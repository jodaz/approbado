import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@approbado/lib/styles';
import queryString from 'query-string'
import Spinner from '../components/Spinner';
import { useUserDispatch } from '@approbado/lib/hooks/useUserState'
import CONFIG_NAMES from '../configs'
import { useHistory } from 'react-router-dom'

const Authenticate = () => {
    const { search } = useLocation()
    const values = queryString.parse(search)
    const { token } = values;
    const { fetchUser } = useUserDispatch();
    const history = useHistory();

    React.useEffect(async () => {
        if (token) {
            await localStorage.setItem(CONFIG_NAMES.AUTH_TOKEN, token);
            await fetchUser();
            history.push('/')
        }
    }, [token])

    return <Spinner />;
};

Authenticate.propTypes = {
    authProvider: PropTypes.func,
};

const AuthenticateWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Authenticate {...props} />
    </ThemeProvider>
);

export default AuthenticateWithTheme;
