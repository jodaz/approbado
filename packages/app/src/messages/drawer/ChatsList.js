import * as React from 'react';
import Box from '@material-ui/core/Box';
import UserMessageCard from './UserMessageCard'

const ChatsList = ({ total, data }) => {
    return (
        <Box
            component='div'
            sx={{
                width: 'inherit',
                overflowY: 'auto',
                height: 'calc(100vh - 9rem)'
            }}
        >
            {data.length && data.map(user => (
                <UserMessageCard data={user} />
            ))}
        </Box>
    );
}

export default ChatsList;
