import { Typography, makeStyles, Grid } from "@material-ui/core";
import FBLoginButton from './FBLoginButton';

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
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: '3px',
        fontSize: '1em',
        justifyContent: 'space-between',
        padding: '0.5em 0.9em',
        backgroundColor: '#1977F3',
        color: theme.palette.secondary.light,
        border: 'none',
        '&:hover': {
            cursor: 'pointer'
        },
        '& :nth-child(1)': {
            marginRight: '0.5em'
        }
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
                <FBLoginButton className={classes.fbButton} />
            </Grid>
        </Grid>
    )
}
