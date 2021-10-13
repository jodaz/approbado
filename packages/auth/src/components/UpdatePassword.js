import * as React from 'react';
import { Field } from 'react-final-form';
import {
    Button,
    Card,
    CardActions,
    Typography,
    Box
} from '@material-ui/core';
import axios from 'axios'
import renderInput from '../utils/renderInput'
import AuthLayout from './AuthLayout'
import useStyles from './formStyles'
import AuthHeaderForm from './AuthHeaderForm';
import { theme } from '@approbado/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/PersonOutlineOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';

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

const UpdatePassword = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();
    const { token } = useParams();

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return axios.put(`${process.env.REACT_APP_API_DOMAIN}/reset-password`, values)
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

    React.useEffect(() => {
        console.log(token)
    }, []);

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Recuperar contraseña'>
            <Card className={classes.card}>
                <div className={classes.form}>
                    <AuthHeaderForm title='Recuperar contraseña' />
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
                            type="submit"
                            className={classes.saveButton}
                            disabled={loading}
                            fullWidth
                        >
                            {'Verificar'}
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
            </Card>
        </AuthLayout >
    );
};

const UpdatePasswordWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <UpdatePassword {...props} />
    </ThemeProvider>
);

export default UpdatePasswordWithTheme;
