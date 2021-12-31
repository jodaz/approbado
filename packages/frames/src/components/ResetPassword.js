import * as React from 'react';
import { Field } from 'react-final-form';
import {
    Card,
    CardActions,
    Typography,
    Box
} from '@material-ui/core';
import axios from 'axios'
import renderInput from '@approbado/lib/components/renderInput'
import AuthLayout from './AuthLayout'
import useStyles from '@approbado/lib/styles/formStyles'
import AuthHeaderForm from './AuthHeaderForm';
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/PersonOutlineOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@approbado/lib/components/Dialog'
import Button from '@approbado/lib/components/Button'

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    return errors;
};

const ResetPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return axios.post(`${process.env.REACT_APP_API_DOMAIN}/reset-password`, values)
            .then(res => {
                const { token } = res.data;

                setLoading(false);
                setOpen(true);
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Recuperar contraseña'>
            <div className={classes.form}>
                <Field
                    component={renderInput}
                    name="email"
                    type="text"
                    placeholder='Correo electrónico'
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
                <CardActions className={classes.actions}>
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={loading}
                        unresponsive
                        fullWidth
                    >
                        Verificar
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
            <Dialog open={open} handleClose={handleClose} classes={classes}>
                <Typography gutterBottom>
                    ¡Revise su correo electrónico! Le enviamos un código de recuperación.
                </Typography>
                <Button onClick={handleClose}>
                    Vale, entendido
                </Button>
            </Dialog>
        </AuthLayout >
    );
};

const ResetPasswordWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <ResetPassword {...props} />
    </ThemeProvider>
);

export default ResetPasswordWithTheme;
