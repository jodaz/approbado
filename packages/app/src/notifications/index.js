import * as React from 'react'
// Components
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Banner from './Banner'
import useFetch from '@approbado/lib/hooks/useFetch'
import NotificationCard from './NotificationCard'
import Spinner from '@approbado/lib/components/Spinner'

const generateNullData = results => Array.from({ length: results }).map(_ => null)

const results = 5

const Index = () => {
    const [perPage, setPerPage] = React.useState(results)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs'))
    const {
        loading,
        error,
        data,
        hasMore
    } = useFetch('/notifications', perPage, 0)
    const [items, setItems] = React.useState([])

    const observer = React.useRef()
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
    }, [data])

    React.useEffect(() => {
        setItems(generateNullData(results))
    }, [])

    return (
        <Box display="flex" p={isXSmall ? '0' : '2rem'}>
            <Box
                display="flex"
                flexDirection='column'
                width='100%'
            >
                {items.map((item, index) => {
                    if (items.length === index + 1) {
                        return <NotificationCard data={item} index={index} rootRef={lastItemRef} />
                    } else {
                        return <NotificationCard index={index} data={item} />
                    }
                })}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '2rem 0'
                }}>
                    {(loading) && <Spinner />}

                    {(error) && (
                        <Box fontWeight='300'>Ha ocurrido un error en su solicitud</Box>
                    )}
                </Box>
            </Box>
            {(!isXSmall) && <Banner />}
        </Box>
    )
}

export default Index
