import * as React from 'react';
import Box from '@material-ui/core/Box';
import AsideBarHeader from './AsideBarHeader';
import useFetch from '@approbado/lib/hooks/useFetch'
import ChatsList from './ChatsList';

const results = 10

const generateNullData = results => Array.from({ length: results }).map(_ => null)

const MessagesAsideBar = () => {
    const [perPage, setPerPage] = React.useState(results)
    const [filter, setFilter] = React.useState({})
    const {
        loading,
        error,
        data,
        hasMore,
        total
    } = useFetch('/chats', {
        perPage: perPage,
        page: 1,
        filter: filter
    })
    const [items, setItems] = React.useState([])
    const observer = React.useRef()

    const handleChange = e => {
        if (e.currentTarget.value) {
            setFilter({
                name: e.currentTarget.value
            })
        } else {
            setFilter({})
        }
    }

    const lastItemRef = React.useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setItems(prevItems => {
                    return [...prevItems, ...generateNullData(results)]
                })
                setPerPage(prevPerPage => prevPerPage + results)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    React.useEffect(() => {
        if (data.length) {
            setItems(data)
        }

        if (data.length == 0 && !loading) {
            setItems([])
        }
    }, [data, loading])

    React.useEffect(() => {
        setItems(generateNullData(results))
    }, [])

    return (
        <Box
            component='div'
            sx={{
                height: 'inherit',
                width: 300,
                boxShadow: '1px 0px 0px rgba(0, 0, 0, 0.24)'
            }}
        >
            <AsideBarHeader onChange={handleChange} />
            <ChatsList
                total={total}
                error={error}
                loading={loading}
                items={items}
                lastItemRef={lastItemRef}
            />
        </Box>
    );
}

export default MessagesAsideBar;
