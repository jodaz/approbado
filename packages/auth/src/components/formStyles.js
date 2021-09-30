import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
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
        maxWidth: '500px'
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        marginTop: '2em',
        marginBottom: '2em',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
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
        color: '#fff',
        border: 'none',
        '& :nth-child(1)': {
            marginRight: '0.5em'
        }
    },
    saveButton: {
        padding: '0.5rem 2rem',
        textTransform: 'none',
        fontSize: '16px',
        borderRadius: '6px',
        '&:hover': {
            backgroundColor: fade(theme.palette.secondary.main, 0.95)
        }
    }
}));

export default useStyles;
