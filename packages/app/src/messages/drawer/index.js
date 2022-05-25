import * as React from 'react';
import Box from '@material-ui/core/Box';
import AsideBarHeader from './AsideBarHeader';
import { axios } from '@approbado/lib/providers'
import ChatsList from './ChatsList';

const initialState = {
    data: {},
    total: 0,
    loaded: false
}

const initialUrl = '/chats'

const MessagesAsideBar = () => {
    const [state, setState] = React.useState(initialState)
    const [url, setUrl] = React.useState(initialUrl)

    const fetchChats = async () => {
        try {
            const { data } = await axios.get(url)

            setState({ ...state, ...data, loaded: true })
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = e => {
        if (e.currentTarget.value) {
            setUrl(`${initialUrl}?filter%5Bname%5D=${e.currentTarget.value}`)
        } else {
            setUrl(initialUrl)
        }
    }

    React.useEffect(() => {
        setState({ ...state, loaded: false })
        fetchChats();
    }, [url])

    return (
        <Box height='inherit' width='300px' component='div'>
            <AsideBarHeader onChange={handleChange} />
            <ChatsList {...state} />
        </Box>
    );
}

export default MessagesAsideBar;
