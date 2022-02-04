import * as React from 'react';
import { Field } from 'react-final-form';
import {
    CardActions,
    Typography,
    Box
} from '@material-ui/core';
import axios from 'axios'
import renderInput from '@approbado/lib/components/renderInput'
import AuthLayout from './AuthLayout'
import useStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/PersonOutlineOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKeyOutlined';
import Button from '@approbado/lib/components/Button'

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    if (!values.password) {
        errors.password = 'Ingrese su contraseña';
    }

    return errors;
};

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(values => {
        setLoading(true)
        return axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, values)
            .then(res => {
                const { token } = res.data;

                window.location.href =
                    `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;

                setLoading(false);
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    return (
        <AuthLayout
            validate={validate}
            handleSubmit={handleSubmit}
            title='Iniciar sesión'
        >
                <div className={classes.form}>
                    <Field
                        component={renderInput}
                        name="email"
                        type="text"
                        placeholder='Usuario'
                        disabled={loading}
                        className={classes.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Field
                        name="password"
                        // @ts-ignore
                        component={renderInput}
                        placeholder='Contraseña'
                        type="password"
                        disabled={loading}
                        className={classes.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box component="div" display='flex' justifyContent="flex-end" marginTop="1rem">
                        <Link to="/reset-password" className={classes.link}> ¿Olvidaste tu contraseña? </Link>
                    </Box>
                    <CardActions className={classes.actions}>
                        <Button
                            variant='contained'
                            color='secondary'
                            disabled={loading}
                            type='submit'
                            unresponsive
                            fullWidth
                        >
                            {'Iniciar sesión'}
                        </Button>
                        <Box component="div" marginTop="2rem">
                            <Typography variant="subtitle1" component="p">
                                ¿Aún no tienes una cuenta?
                                {' '}
                                <Link to="/register" className={classes.link}><strong>Ingresa aquí</strong></Link>
                            </Typography>
                        </Box>
                    </CardActions>
                </div>
        </AuthLayout >
    );
};

const LoginWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
