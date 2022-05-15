import * as React from 'react'
import Box from '@material-ui/core/Box'
import { axios } from '@approbado/lib/providers'
import RankingTable from './RankingTable'
import Spinner from '@approbado/lib/components/Spinner'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@approbado/lib/icons/SearchIcon'

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const initialUrl = `/users?page=0&perPage=5&sort=points&order=desc`

const RankingList = () => {
    const [data, setData] = React.useState(initialState)
    const [url, setUrl] = React.useState(initialUrl)

    const fetchUsers = async () => {
        const { data } = await axios.get(url)

        setData({...data, loaded: true })
    }

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setUrl(`${initialUrl}+&filter%5Bglobal_search%5D=${e.currentTarget.value}`)
        } else {
            setUrl(initialUrl)
        }
    }

    React.useEffect(() => {
        fetchUsers();
    }, [url])

    return (
        <Box display='flex' flexDirection='column'>
            <TextField
                onChange={handleOnChange}
                InputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <SearchIcon />
                        </Box>
                    )
                }}
            />
            {data.loaded ? <RankingTable {...data} /> : <Spinner />}
        </Box>
    )
}

RankingList.defaultValues = {
    search: ''
}

export default RankingList
