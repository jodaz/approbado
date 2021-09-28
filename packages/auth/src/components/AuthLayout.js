import * as React from 'react';
import { Form } from 'react-final-form';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@approbado/core';
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    }
}));

const AuthLayout = ({ validate, handleSubmit, children }) => {
    const classes = useStyles();

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div>
                        <Typography variant='h5' component='h5'>
                            La mejor manera de aprender y compartir conocimiento sobre derecho,
                            esta en Approbado.
                        </Typography>
                    </div>
                    <div className={classes.main}>
                        {
                            React.Children.map(children, (child) =>
                                React.cloneElement(child)
                            )
                        }
                    </div>
                </form>
            )}
        />
    );
};

const AuthLayoutWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <AuthLayout {...props} />
    </ThemeProvider>
);

export default AuthLayoutWithTheme;
