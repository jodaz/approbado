import * as React from 'react';
import Box from '@material-ui/core/Box';
import AsideBarHeader from './AsideBarHeader';
import useFetch from '@approbado/lib/hooks/useFetch'
import ChatsList from './ChatsList';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 300
        },
        height: 'inherit',
        boxShadow: '1px 0px 0px rgba(0, 0, 0, 0.24)'
    }
}))

const results = 10

const generateNullData = results => Array.from({ length: results }).map(_ => null)

const Aside = () => {
    const classes = useStyles();
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
        <Box className={classes.root}>
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

export default Aside;
