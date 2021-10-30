import * as React from 'react';
import { Field } from 'react-final-form';
import {
    Card,
    CardActions,
    Typography,
    Box
} from '@material-ui/core';
import Button from '@approbado/lib/components/Button'
import axios from 'axios'
import renderInput from '@approbado/lib/components/renderInput'
import AuthLayout from './AuthLayout'
import useStyles from '@approbado/lib/styles/formStyles'
import { Link } from 'react-router-dom'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import AuthHeaderForm from './AuthHeaderForm';
import AccountCircle from '@material-ui/icons/PersonOutlineOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKeyOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Checkbox from '@approbado/lib/components/Checkbox'

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
    if (!values.conditions || !values.conditions.length) {
        errors.conditions = 'Debe aceptar los términos y condiciones.'
    }

    return errors;
};

const Register = () => {
    const [loading, setLoading] = React.useState(false);
    const [sendWithCode, setSendWithCode] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(values => {
        setLoading(true)
        let url = !sendWithCode ?
            `${process.env.REACT_APP_API_DOMAIN}/auth/send`
            : `${process.env.REACT_APP_API_DOMAIN}/auth/register`;

        return axios.post(url, values)
            .then(res => {
                setSendWithCode(!sendWithCode);
                setLoading(false);

                if (sendWithCode) {
                    const { token } = res.data;

                    window.location.href =
                        `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;
                }
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [sendWithCode]);

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit}>
            <Card className={classes.card}>
                <div className={classes.form}>
                    <AuthHeaderForm title='Crear cuenta' />
                    <Field
                        component={renderInput}
                        name="names"
                        type="text"
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
                    <Field
                        name="conditions"
                        type="checkbox"
                        value="conditions"
                        component={Checkbox}
                    >
                        <label>
                            {' '}
                            He leído y acepto los {' '}
                            <a
                                href="http://approbado.alaxatech.com/terminos-y-condiciones/"
                                target="_blank"
                                className={classes.link}
                            >
                                <strong>términos y condiciones</strong>
                            </a>
                        </label>
                    </Field>
                    {sendWithCode && (
                        <Field
                            component={renderInput}
                            name="code"
                            type="text"
                            placeholder='Ingresa el código de confirmación'
                            disabled={loading}
                            className={classes.input}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ConfirmationNumberIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
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
                                {' '}
                                <Link to="/login" className={classes.link}>
                                    <strong>Ingresa aquí</strong>
                                </Link>
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
