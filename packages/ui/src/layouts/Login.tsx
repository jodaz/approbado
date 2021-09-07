import * as React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useLogin, useNotify, useAuthState, useRedirect } from 'react-admin';
import Theming from '../layouts/theming';
import { Link } from 'react-router-dom';
import renderInput from '../components/RenderInput';
import { AuthenticationViewWithTheme, useChildrenClasses } from './AuthLayout';

interface FormValues {
  email?: string;
  password?: string;
}

const validate = (values: FormValues) => {
  const errors: FormValues = {};
  if (!values.email) {
    errors.email = "Ingrese su correo electrónico";
  }
  if (!values.password) {
    errors.password = "Ingrese su contraseña";
  }
  return errors;
};

const Login = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const classes = useChildrenClasses();
  const notify = useNotify();
  const login = useLogin();
  const location = useLocation<{ nextPathname: string } | null>();
  const { loading: loadingAuth, authenticated } = useAuthState();
  const redirect = useRedirect();

  const handleSubmit = (auth: FormValues) => {
    setLoading(true);
    login(auth, location.state ? location.state.nextPathname : '/')
      .catch(
      (error: Error) => {
        setLoading(false);
        notify('Crendenciales inválidas', 'warning');
      }
    );
  };

  /**
   * Check authentication status
   */
  React.useEffect(() => {
    if (!loadingAuth && authenticated) {
      redirect('/');
    }
  }, [loadingAuth, authenticated]);

  if (loadingAuth) return <></>;

  return (
    <AuthenticationViewWithTheme validate={validate} handleSubmit={handleSubmit}>
      <Card className={classes.card}>
        <div className={classes.avatar}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} className={classes.icon} alt='Flich logo' />
        </div>
        <div className={classes.textMessage}>
          <Typography variant="h5" gutterBottom>
            Bienvenido a nuestra
          </Typography>
          <Typography variant="h5" gutterBottom>
            Aula Virtual
          </Typography>
        </div>
        <div className={classes.form}>
          <div className={classes.input}>
            <Field
              autoFocus
              name="email"
              // @ts-ignore
              component={renderInput}
              label="Correo electrónico"
              disabled={loading}
            />
          </div>
          <div className={classes.input}>
            <Field
              name="password"
              // @ts-ignore
              component={renderInput}
              label="Contraseña"
              type="password"
              disabled={loading}
            />
          </div>
        </div>
        <CardActions className={classes.actions}>
          {/* @ts-ignore */}
          <Link to="/recover-password" variant="body2" style={{ textDecoration: 'none' }}>
            {"¿Olvidaste tu contraseña?"}
          </Link>

          <Button
            variant="contained"
            type="submit"
            color="secondary"
            disabled={loading}
            className={classes.button}
          >
            {loading && (
              <CircularProgress
                size={25}
                thickness={2}
              />
            )}
            Ingresar
          </Button>
        </CardActions>
      </Card>
    </AuthenticationViewWithTheme>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

const LoginWithTheme = (props: any) => (
  <ThemeProvider theme={createMuiTheme(Theming)}>
    <Login {...props} />
  </ThemeProvider>
);

export default LoginWithTheme;
