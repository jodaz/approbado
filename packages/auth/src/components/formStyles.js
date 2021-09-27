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
        flexDirection: 'column',
        height: '300px'
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
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
    }
}));

export default useStyles;
