import Box from '@material-ui/core/Box'
import ChatboxHeader from './ChatboxHeader'
import ChatboxInput from './ChatboxInput'

const Chatbox = () => {
    return (
        <Box sx={{
            display: 'flex',
            width: 'inherit',
            flexDirection: 'column'
        }}>
            <ChatboxHeader />
            <Box sx={{ display: 'flex', flex: 1 }} />
            <ChatboxInput />
        </Box>
    );
}

export default Chatbox;
