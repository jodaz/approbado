import * as React from 'react';
import { Field } from 'react-final-form';
import {
    Button,
    Card,
    CardActions,
    CircularProgress
} from '@material-ui/core';
import axios from 'axios'
import renderInput from '../utils/renderInput'
import InputContainer from '@approbado/core/components/InputContainer'
import AuthLayout from './AuthLayout'
import useStyles from './formStyles'
import AuthHeaderForm from './AuthHeaderForm';

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

    const handleSubmit = React.useCallback(auth => {
        setLoading(true)

        axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, auth)
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
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Iniciar sesión'>
            <Card className={classes.card}>
                <div className={classes.form}>
                    <AuthHeaderForm title='Iniciar sesión' />
                    <InputContainer labelName='Correo electrónico' md={12}>
                        <Field
                            autoFocus
                            name="email"
                            // @ts-ignore
                            component={renderInput}
                            label={'Usuario'}
                            disabled={loading}
                        />
                    </InputContainer>
                    <InputContainer labelName='Contraseña' md={12}>
                        <Field
                            name="password"
                            // @ts-ignore
                            component={renderInput}
                            label={'Contraseña'}
                            type="password"
                            disabled={loading}
                        />
                    </InputContainer>
                </div>
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

export default Login;
