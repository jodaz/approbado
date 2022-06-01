import Avatar from '@material-ui/core/Avatar'
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Dot from '@approbado/lib/components/Dot'
import Skeleton from "@material-ui/lab/Skeleton";
import configs from '@approbado/lib/configs'
import { useHistory } from 'react-router-dom'
import { useChatDispatch } from '@approbado/lib/hooks/useChat';

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
        flexDirection: 'column',
        width: '100%'
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

const UserMessageCard = ({ rootRef, index, data }) => {
    const classes = useStyles();
    const loading = data == null;
    const history = useHistory();
    const { setChat } = useChatDispatch();

    const handleClick = () => {
        history.push(`/chats/${data.id}`)
        setChat(data)
    }

    return (
        <Box
            onClick={handleClick}
            className={classes.root}
            ref={rootRef}
            index={index}
        >
            <Box sx={{ marginRight: '1rem' }}>
                {loading ? (
                    <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                    />
                ) : (
                    <Box className={classes.names}>
                        <Avatar src={`${configs.SOURCE}/${data.participants[0].picture}`} />
                    </Box>
                )}
            </Box>
            <Box className={classes.container}>
                {loading ? (
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                ) : (
                    <Box className={classes.names}>
                        {data.is_private
                            ? data.participants[0]['names']
                            : data.name
                        }
                    </Box>
                )}
                {loading ? (
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="40%"
                        style={{ marginBottom: 6 }}
                    />
                ) : (
                    <Box className={classes.message}>
                        Último mensaje
                        <Dot />
                        12 minutos
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default UserMessageCard
