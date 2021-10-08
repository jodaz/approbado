import * as React from 'react';
import { Field } from 'react-final-form';
import {
    Button,
    Card,
    CardActions,
    Typography,
    Box
} from '@material-ui/core';
import Checkbox from '@approbado/core/components/Checkbox'
import axios from 'axios'
import renderInput from '../utils/renderInput'
import AuthLayout from './AuthLayout'
import useStyles from './formStyles'
import { useFormState } from 'react-final-form'
import { Link } from 'react-router-dom'
import { theme } from '@approbado/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import AuthHeaderForm from './AuthHeaderForm';
import AccountCircle from '@material-ui/icons/PersonOutlineOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKeyOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    if (!values.names) {
        errors.names = 'Ingrese su nombre';
    }

    if (!values.phone) {
        errors.phone = 'Ingrese su teléfono';
    }

    if (!values.password) {
        errors.password = 'Ingrese su contraseña';
    }
    if (values.conditions && !values.conditions.length) {
        errors.conditions = 'Debe aceptar los términos y condiciones.'
    }
    console.log(errors)
    return errors;
};

const VerificationCodeInput = props => {
    const { values } = useFormState();

    if (values.setCode) {
        return (
            <Field
                component={renderInput}
                name="code"
                placeholder='Ingrese el código de verificación'
                max='6'
                {...props}
            />
        )
    }

    return null;
}

const Register = () => {
    const [loading, setLoading] = React.useState(false);
    const [sendWithCode, setSendWithCode] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/send`, values)
            .then(res => {
                setSendWithCode(true);
                setLoading(false);
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, []);

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit}>
            <Card className={classes.card}>
                <div className={classes.form}>
                    <AuthHeaderForm title='Crear cuenta' />
                    <Field
                        component={renderInput}
                        name="names"
                        type="email"
                        placeholder='Ingresa un nombre'
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
                        name="email"
                        // @ts-ignore
                        component={renderInput}
                        placeholder='Ingresa un correo electrónico'
                        disabled={loading}
                        className={classes.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Field
                        name="password"
                        // @ts-ignore
                        component={renderInput}
                        placeholder='Ingresa una contraseña'
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
                    <Field
                        name="phone"
                        // @ts-ignore
                        component={renderInput}
                        placeholder='Teléfono'
                        type="text"
                        disabled={loading}
                        className={classes.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalPhoneOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <label>
                      <Field
                        name="conditions"
                        component={Checkbox}
                        type="checkbox"
                        value="conditions"
                      />{' '}
                      He leído y acepto los {' '}
                        <a
                            href="http://approbado.alaxatech.com/terminos-y-condiciones/"
                            target="_blank"
                        >
                            términos y condiciones.
                        </a>
                    </label>
                    {/* <VerificationCodeInput className={classes.input} disabled={loading} /> */}
                    <CardActions className={classes.actions}>
                        <Button
                            variant='contained'
                            color='secondary'
                            type="submit"
                            className={classes.saveButton}
                            disabled={loading}
                            fullWidth
                        >
                            {'Crear una cuenta'}
                        </Button>
                        <Box component="div" marginTop="2rem">
                            <Typography variant="subtitle1" component="p">
                                ¿Ya tienes una cuenta?
                                <Link to="/register"> Ingresa aquí </Link>
                            </Typography>
                        </Box>
                    </CardActions>
                </div>
            </Card>
        </AuthLayout >
    );
};

const RegisterWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Register {...props} />
    </ThemeProvider>
);

export default RegisterWithTheme;
