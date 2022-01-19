import * as React from 'react'
// Components
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { ListBase, useListContext } from 'react-admin'
import Banner from './Banner'
import NotificationCard from './NotificationCard'

const NotificationsList = ({ isXSmall, ...rest }) => (
    <ListBase
        resource="notifications"
        basePath="/notifications"
        sort={{
            field: 'read_at',
            order: 'DESC'
        }}
        {...rest}
    >
        <NotificationsListView isXSmall={isXSmall} />
    </ListBase>
)

const NotificationsListView = ({ isXSmall }) => {
    const { ids, data, total } = useListContext();

    return (
        <Box display="flex" width={isXSmall ? '80%' : '100%'}>
            <Box width={'100%'}>
                {/* {ids.map((id, i) => (
                    <ForumCard
                        data={data[id]}
                        id={id}
                        index={i}
                        key={id}
                    />
                ))}
                {(total == 0) && (
                    <Typography component={'p'} variant="body1">
                        No tenemos debates disponibles, ¿quizás desees volver más tarde?
                    </Typography>
                )} */}
                <NotificationCard />
                <NotificationCard />
            </Box>
        </Box>
    )
}

const ForumsView = props => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )

    return (
        <Box display="flex" p={isXSmall ? '0' : '2rem'}>
            <NotificationsList isXSmall={isXSmall} {...props} />
            {(!isXSmall) && <Banner />}
        </Box>
    )
}

export default ForumsView
