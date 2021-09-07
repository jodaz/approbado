import * as React from 'react';
import { withTypes } from 'react-final-form';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Notification, useAuthState, usePermissions, useRedirect } from 'react-admin';
import Theming from './theming';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.primary.main
  }
}));

export const useChildrenClasses = makeStyles(theme => ({
  card: {
    minWidth: 500,
    height: 700,
    borderRadius: '0',
    [theme.breakpoints.down('sm')]: {
      minWidth: 400
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 300
    }
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    backgroundColor: 'transparent',
  },
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 1em 1em 1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textMessage: {
    textAlign: 'center'
  },
  button: {
    borderRadius: '0',
    padding: '0.5em 2em',
    margin: '1em',
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.main
  },
  content: {
    height: '300',
    maxWidth: '300'
  }
}));

const { Form } = withTypes<any>();

const AuthenticationView: React.FC<AuthenticationViewProps> = ({ validate, handleSubmit, children }) => {
  const rootClasses = useStyles();
  const redirect = useRedirect();
  const { loading: loadingAuth, authenticated } = useAuthState();
  const { loading: loadingPermissions, permissions } = usePermissions();

  /**
   * Check authentication status
   */
  React.useEffect(() => {
    if (!loadingAuth && authenticated && !loadingPermissions && permissions !== 'guest') {
      return redirect('/');
    }
  }, [loadingAuth, authenticated, loadingPermissions, permissions]);

  if (loadingAuth) return <></>;

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      redirect={false}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={rootClasses.main}>
            {React.Children.map(children, (child) =>
              React.cloneElement(child)
            )}
            <Notification />
          </div>
        </form>
      )}
    />
  );
};

interface AuthenticationViewProps {
  handleSubmit: any;
  validate: any;
  authProvider: any;
  previousRoute: any;
  children: any
};

export const AuthenticationViewWithTheme = (props: any) => (
  <ThemeProvider theme={createMuiTheme(Theming)}>
    <AuthenticationView {...props} />
  </ThemeProvider>
);
