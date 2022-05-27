import Box from '@material-ui/core/Box'
import ChatboxHeader from './ChatboxHeader'
import ChatboxInput from './ChatboxInput'
import ChatboxMessages from './ChatboxMessages'

const Chatbox = () => {
    return (
        <Box sx={{
            display: 'flex',
            width: 'inherit',
            flexDirection: 'column'
        }}>
            <ChatboxHeader />
            <ChatboxMessages />
            <ChatboxInput />
        </Box>
    );
}

export default Chatbox;
