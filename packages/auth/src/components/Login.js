import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { theme } from '@approbado/core';
import axios from 'axios'
import renderInput from '../utils/renderInput'
import InputContainer from '@approbado/core/components/InputContainer'

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: `url(${process.env.PUBLIC_URL}/background.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        padding: '1em',
        display: 'flex'
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(auth => {
        setLoading(true)

        axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, auth)
            .then(res => {
                const { token } = res.data;

                window.location.href = `${process.env.REACT_APP_LOCATION}/auth/${token}`;

                setLoading(false);
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

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

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.form}>
                                <InputContainer labelName='Correo electrónico'>
                                    <Field
                                        autoFocus
                                        name="email"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={'Usuario'}
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
                    </div>
                </form>
            )}
        />
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
