import * as React from 'react';
import Box from '@material-ui/core/Box';
import UserMessageCard from './UserMessageCard'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'
import Spinner from '@approbado/lib/components/Spinner'

const ChatsList = ({ total, items, loading, error, lastItemRef }) => {
    return (
        <Box
            component='div'
            sx={{
                width: 'inherit',
                overflowY: 'auto',
                height: 'calc(100vh - 9rem)',
                scrollbarWidth: 10,
                scrollbarColor: '#6D6D6D',
                "&::-webkit-scrollbar": {
                    width: 10
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#D9D9D9",
                    borderRadius: 5
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#6D6D6D",
                    borderRadius: 5
                }
            }}
        >
            {total ? items.map((item, index) => {
                if (items.length === index + 1) {
                    return (
                        <UserMessageCard data={item} rootRef={lastItemRef} />
                    );
                } else {
                    return <UserMessageCard index={index} data={item} />
                }
            }) : (
                <ErrorMessage>
                    No tiene mensajes disponibles.
                </ErrorMessage>
            )}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                padding: '2rem 0'
            }}>
                {(loading) && <Spinner />}

                {(error) && <ErrorMessage />}
            </Box>
        </Box>
    );
}

export default ChatsList;
