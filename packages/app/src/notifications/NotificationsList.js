import * as React from 'react'
// Components
import Box from '@material-ui/core/Box'
import NotificationCard from './NotificationCard'
import Spinner from '@approbado/lib/components/Spinner'

const NotificationsList = ({ isXSmall, data, loaded }) => {

    const renderNotifications = () => (
        <>
            {data.map((item, key) => (
                <NotificationCard key={key} {...item} />
            ))}
        </>
    )

    return (
        <Box
            display="flex"
            flexDirection='column'
            width={isXSmall ? '80%' : '100%'}
        >
            {loaded ? renderNotifications() : (
                <Box sx={{
                    display: 'flex',
                    padding: '2rem 0'
                }}>
                    <Spinner />
                </Box>
            )}
        </Box>
    )
}

export default NotificationsList
