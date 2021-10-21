import * as React from 'react';
import {
    makeStyles,
    CardActions,
    Typography,
    Box
} from '@material-ui/core';
import axios from 'axios'
import AuthLayout from './AuthLayout'
import formStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { useLocation, useHistory, Link } from 'react-router-dom'
import { TextInput } from 'react-admin'
import Spinner from '@approbado/lib/components/Spinner'
import queryString from 'query-string'
import Dialog from '@approbado/lib/components/Dialog'
import InputContainer from '@approbado/lib/components/InputContainer'
import Button from '@approbado/lib/components/Button'

const validate = (values) => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Ingrese su nueva contraseña';
    }
    if (!values.password_confirmed) {
        errors.password_confirmed = 'Repita su nueva contraseña';
    } else {
        if (values.password_confirmed !== values.password) {
            errors.password_confirmed = 'Las contraseñas no coinciden.';
        }
    }

    return errors;
};

const useStyles = makeStyles(() => ({
    form: {
        width: '100%',
        padding: '0 1.5rem'
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    errorMessage: {
        display: 'flex',
        height: '5rem',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem'
    }
}));

const UpdatePassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [isVerifying, setIsVerifying] = React.useState(true);
    const [verificationError, setVerificationError] = React.useState(undefined)
    const classes = { ...formStyles(), ...useStyles() };
    const { search } = useLocation()
    const values = queryString.parse(search)
    const { token } = values;
    const history = useHistory()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        history.push('/login')
    };

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return axios.put(`${process.env.REACT_APP_API_DOMAIN}/reset-password/?token=${token}`, values)
            .then(() => {
                setLoading(false)
                setOpen(true)
            }).catch(err => {
                setLoading(false);

                if (err.response.status == 500) {
                    history.push('/error');
                }

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    /**
     * Verify if token is valid
     */
    React.useEffect(() => {
        return axios.get(`${process.env.REACT_APP_API_DOMAIN}/reset-password/?token=${token}`)
            .then(() => {
                setIsVerifying(false);
            }).catch(err => {
                setIsVerifying(false);

                if (err.response.data.errors) {
                    if (err.response.status == 500) {
                        history.push('/error');
                    }

                    const { token } = err.response.data.errors

                    setVerificationError(token)
                }
            });
    }, []);

    return (
        <>
            {(isVerifying)
                ? <Spinner />
                : (
                    <AuthLayout validate={validate} handleSubmit={handleSubmit}>
                        <div className={classes.form}>
                            <Box className={classes.cardHeader}>
                                <Typography variant="h5" classKey='h3'>
                                    Recupera tu cuenta
                                </Typography>
                            </Box>
                            {(verificationError == undefined)
                                ? (
                                    <>
                                        <InputContainer labelName='Nueva contraseña' md={12}>
                                            <TextInput
                                                source="password"
                                                placeholder="Ingrese su contraseña"
                                                disabled={loading}
                                                fullWidth
                                            />
                                        </InputContainer>
                                        <InputContainer labelName='Confirma tu contraseña' md={12}>
                                            <TextInput
                                                source="password_confirmed"
                                                placeholder="Repita su contraseña"
                                                disabled={loading}
                                                fullWidth
                                            />
                                        </InputContainer>
                                    </>
                                )
                                : (
                                    <Box className={classes.errorMessage}>
                                        <Typography variant='subtitle1'>
                                            Lo siento, {verificationError}.
                                        </Typography>
                                        <Link to='/login' className={classes.link}>Volver al inicio</Link>
                                    </Box>
                                )
                            }
                            {(verificationError == undefined) && (
                                <CardActions className={classes.actions}>
                                    <Button disabled={loading} fullWidth>
                                        {'Enviar'}
                                    </Button>
                                </CardActions>
                            )}
                        </div>
                        <Dialog open={open} handleClose={handleClose}>
                            <Typography gutterBottom>
                                Hemos recuperado tu cuenta con éxito.
                            </Typography>
                            <Button onClick={handleClose}>
                                Continuar
                            </Button>
                        </Dialog>
                    </AuthLayout >
                )
            }
        </>
    );
};

const UpdatePasswordWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <UpdatePassword {...props} />
    </ThemeProvider>
);

export default UpdatePasswordWithTheme;
