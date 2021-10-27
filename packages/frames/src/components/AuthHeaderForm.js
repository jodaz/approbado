import { Typography, makeStyles, Grid } from "@material-ui/core";
import FBLoginButton from './FBLoginButton';
import GoogleLoginButton from './GoogleLoginButton';

const socialIconStyles = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: '4px',
    fontSize: '15px',
    justifyContent: 'space-between',
    padding: '0.5em 0.9em',
    border: 'none',
    fontWeight: '400',
    transition: '0.2s',
    lineHeight: '18px',
    height: '2rem',
    '&:hover': {
        cursor: 'pointer',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.3)'
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1em 0'
    },
    social: {
        width: '300px',
        marginTop: '1.5rem',
        justifyContent: 'space-between'
    },
    fbButton: {
        backgroundColor: '#1977F3',
        color: theme.palette.background.default,
        ...socialIconStyles
    },
    googleButton: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
        ...socialIconStyles
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

export default ({ title }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Typography variant='h5' component='h5'>
                {title}
            </Typography>
            <Grid container className={classes.social}>
                <FBLoginButton className={classes.fbButton} />
                <GoogleLoginButton className={classes.googleButton} />
            </Grid>
            <Grid container className={classes.divisor}>
                <span className={classes.line}></span>
                {'O'}
                <span className={classes.line}></span>
            </Grid>
        </Grid>
    )
}
