import * as React from 'react';
import { Field } from 'react-final-form';
import {
    Button,
    Card,
    CardActions,
    Grid,
    CircularProgress
} from '@material-ui/core';
import axios from 'axios'
import renderInput from '../utils/renderInput'
import InputContainer from '@approbado/core/components/InputContainer'
import AuthLayout from './AuthLayout'
import useStyles from './formStyles'

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

    return errors;
};

const Register = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, values)
            .then(res => {
                const { token } = res.data;

                window.location.href =
                    `${process.env.REACT_APP_LOCATION}/auth/${token}`;

                setLoading(false);
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit}>
            <Card className={classes.card}>
                <Grid container className={classes.form}>
                    <InputContainer labelName='Correo electrónico'>
                        <Field
                            autoFocus
                            name="email"
                            // @ts-ignore
                            component={renderInput}
                            disabled={loading}
                        />
                    </InputContainer>
                    <InputContainer labelName='Contraseña'>
                        <Field
                            name="password"
                            // @ts-ignore
                            component={renderInput}
                            label={'Contraseña'}
                            type="password"
                            disabled={loading}
                        />
                    </InputContainer>
                    <InputContainer labelName='Correo electrónico'>
                        <Field
                            autoFocus
                            name="email"
                            // @ts-ignore
                            component={renderInput}
                            disabled={loading}
                        />
                    </InputContainer>
                    <InputContainer labelName='Teléfono'>
                        <Field
                            autoFocus
                            name="email"
                            // @ts-ignore
                            component={renderInput}
                            disabled={loading}
                        />
                    </InputContainer>
                </Grid>
                <CardActions className={classes.actions}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={loading}
                        fullWidth
                    >
                        {loading && (
                            <CircularProgress
                                size={25}
                                thickness={2}
                            />
                        )}
                        {'Acceder'}
                    </Button>
                </CardActions>
            </Card>
        </AuthLayout >
    );
};

export default Register;
