import Avatar from '@material-ui/core/Avatar'
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Dot from '@approbado/lib/components/Dot'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '4rem',
        cursor: 'pointer',
        display: 'flex',
        padding: '1rem 0'
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    names: {
        fontWeight: 700,
        color: theme.palette.primary.dark
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontWeight: 300,
        color: theme.palette.info.light,
        fontSize: '0.85rem'
    }
}));

const UserMessageCard = ({ data, handleClick }) => {
    const classes = useStyles();
    const name = data.is_private ? data.participants[0]['names'] : data.name;

    return (
        <Box
            onClick={handleClick}
            className={classes.root}
        >
            <Box className={classes.container}>
                <Box className={classes.names}>{name}</Box>
                <Box className={classes.message}>
                    Último mensaje
                    <Dot />
                    12 minutos
                </Box>
            </Box>
        </Box>
    );
}

export default UserMessageCard
