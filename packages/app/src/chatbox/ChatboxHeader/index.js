import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box';
import { useChatState } from '@approbado/lib/hooks/useChat'
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import makeStyles from '@material-ui/styles/makeStyles'
import configs from '@approbado/lib/configs';
import BookmarkInput from './BookmarkInput'
import SearchInput from './SearchInput'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '4rem',
        alignItems: 'center',
        padding: '0 1rem',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.24)'
    },
    names: {
        fontWeight: 700,
        lineHeight: '24px',
        fontSize: '18px'
    },
    container: {
        flexGrow: '1'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexGrow: 0.1,
        height: 'inherit',
        alignItems: 'center'
    }
}))

const ChatboxHeader = () => {
    const { status, data } = useChatState();
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => history.push(`/chats/${data.id}`)

    return (
        <Box
            className={classes.root}
        >
            <Box sx={{ marginRight: '1rem' }}>
                {!status ? (
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
                {!status ? (
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
            </Box>
            <Box className={classes.buttons}>
                <SearchInput />
                <BookmarkInput />
            </Box>
        </Box>
    );
}

export default ChatboxHeader
