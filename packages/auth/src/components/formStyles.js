import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '90%',
        minHeight: '100%',
        [theme.breakpoints.up('sm')]: {
            minWidth: '50%'
        }
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));

export default useStyles;
