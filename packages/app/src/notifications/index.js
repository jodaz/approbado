import * as React from 'react'
// Components
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Banner from './Banner'
import NotificationsList from './NotificationsList'
import { axios } from '@approbado/lib/providers'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const Index = () => {
    const [state, setState] = React.useState(initialState)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )

    const fetchNotifications = async () => {
        const { data } = await axios.get('/notifications')

        setState({
            ...state,
            total: data.length,
            data: data.data,
            loaded: true
        })
    }

    React.useEffect(() => {
        fetchNotifications();
    }, [])

    console.log(state)

    return (
        <Box display="flex" p={isXSmall ? '0' : '2rem'}>
            <NotificationsList isXSmall={isXSmall} {...state} />
            {(!isXSmall) && <Banner />}
        </Box>
    )
}

export default Index
