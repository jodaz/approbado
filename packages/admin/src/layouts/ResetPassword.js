import * as React from 'react';
import {
    CardActions,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core';
import axios from 'axios'
import Button from '../components/Button'
import InputContainer from '@approbado/lib/components/InputContainer'
import AuthLayout from './AuthLayout'
import formStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { TextInput } from 'react-admin'

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    return errors;
};

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        padding: '0 1.5rem'
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
}));

const ResetPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = { ...formStyles(), ...useStyles() };

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return axios.post(`${process.env.REACT_APP_API_DOMAIN}/reset-password`, values)
            .then(res => {
                const { token } = res.data;

                setLoading(false);
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Iniciar sesión'>
            <div className={classes.form}>
                <Box className={classes.cardHeader}>
                    <Typography variant="h5" classKey='h3'>
                        Recupera tu cuenta
                    </Typography>
                    <Typography variant="subtitle1" classKey='p'>
                        Ingresa tu correo electrónico para recuperar tu cuenta
                    </Typography>
                </Box>

                <InputContainer labelName='Correo electrónico' md={12}>
                    <TextInput
                        source="email"
                        placeholder="Ingrese su correo electrónico"
                        disabled={loading}
                        fullWidth
                    />
                </InputContainer>
                <CardActions className={classes.actions}>
                    <Button disabled={loading}>
                        {'Recuperar contraseña'}
                    </Button>
                </CardActions>
            </div>
        </AuthLayout >
    );
};

const ResetPasswordWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <ResetPassword {...props} />
    </ThemeProvider>
);

export default ResetPasswordWithTheme;
