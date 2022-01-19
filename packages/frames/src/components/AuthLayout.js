import * as React from 'react';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box } from '@material-ui/core'
import AuthHeaderForm from './AuthHeaderForm';

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        justifyContent: 'center',
        zIndex: 1000,
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    },
    outer: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        color: '#fff',
        background: theme.palette.primary.main,
        '&::before': {
            content: "''",
            background: `url(${process.env.PUBLIC_URL}/A.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0px 0px',
            position: 'absolute',
            width: '500.41px',
            height: '500px',
            left: '-125px',
            top: '0px',
            zIndex: 0,
        }
    },
    title: {
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        padding: '2rem',
        width: '30%',
        [theme.breakpoints.only("xs")]: {
            display: "none",
        },
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        minHeight: '100%',
        [theme.breakpoints.up('sm')]: {
            minWidth: '50%'
        },
        color: theme.palette.primary.main,
        backgroundColor: '#fff'
    },
    divisor: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 300,
        marginTop: '2rem',
        alignItems: 'center'
    },
    line: {
        border: `1px solid rgba(0, 0, 0, 0.2)`,
        height: '0',
        width: '44%'
    }
}));

const AuthLayout = ({ validate, title, handleSubmit, children, ...rest }) => {
    const classes = useStyles();

    return (
        <Box component='div' className={classes.outer}>
            <Box component='div' className={classes.title}>
                <img src={process.env.PUBLIC_URL + "/isotipo.png"} alt="approbado_isotipo" />
                <Typography variant='h5' component='h5'>
                    La mejor manera de aprender y compartir conocimiento sobre derecho,
                    esta en <strong>Approbado</strong>.
                </Typography>
            </Box>
            <Box component='div' className={classes.main}>
                <Box className={classes.formWrapper}>
                    <AuthHeaderForm title={title} />
                    <Form
                        onSubmit={handleSubmit}
                        validate={validate}
                        {...rest}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                <Grid container className={classes.divisor}>
                                    <span className={classes.line}></span>
                                    {'O'}
                                    <span className={classes.line}></span>
                                </Grid>
                                {
                                    React.Children.map(children, (child) =>
                                        React.cloneElement(child)
                                    )
                                }
                            </form>
                        )}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AuthLayout;
