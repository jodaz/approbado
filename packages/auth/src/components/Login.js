import * as React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { theme } from '@approbado/core';

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
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(
      (auth) => {
        setLoading(true)
        console.log(auth)
        // login(auth, '/').catch(
        //   (error) => {
        //     setLoading(false)
        //     notify(
        //       error.response.status === 401
        //         ? 'Su contraseña o login no coinciden'
        //         : 'Ha ocurrido un error durante su autenticación',
        //       'warning'
        //     )
        //     if (error.response.data.errors) {
        //         return error.response.data.errors;
        //     }
        //   }
        // )
      },
      []
    )

    const validate = (values) => {
        const errors = {};
        if (!values.login) {
            errors.login = 'Ingrese su nombre de usuario';
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
                            <div className={classes.avatar}>
                                <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar>
                            </div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="login"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={'Usuario'}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={'Contraseña'}
                                        type="password"
                                        disabled={loading}
                                    />
                                </div>
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
