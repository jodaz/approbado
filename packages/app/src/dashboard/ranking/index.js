import * as React from 'react'
import Box from '@material-ui/core/Box'
import { axios } from '@approbado/lib/providers'
import RankingTable from './RankingTable'
import Spinner from '@approbado/lib/components/Spinner'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const RankingList = () => {
    const [data, setData] = React.useState(initialState)

    const fetchUsers = React.useCallback(async () => {
        const { data } = await axios.get('/users?page=0&perPage=5&sort=points&order=desc')

        setData({...data, loaded: true })
    }, [])

    React.useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Box display='flex' flexDirection='column'>
            {data.loaded ? <RankingTable {...data} /> : <Spinner />}
        </Box>
    )
}

export default RankingList
