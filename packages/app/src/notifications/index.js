import * as React from 'react'
// Components
import { useMediaQuery } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Banner from './Banner'
import useNotificationsFetch from './useNotificationsFetch'
import NotificationCard from './NotificationCard'
import Spinner from '@approbado/lib/components/Spinner'

const Index = () => {
    const [perPage, setPerPage] = React.useState(10)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs'))
    const {
        loading,
        error,
        data,
        hasMore
    } = useNotificationsFetch(perPage, 0)

    const observer = React.useRef()
    const lastItemRef = React.useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPerPage(prevPerPage => prevPerPage + 10)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <Box display="flex" p={isXSmall ? '0' : '2rem'}>
            <Box
                display="flex"
                flexDirection='column'
                width='100%'
            >
                {data.map((item, index) => {
                    if (data.length === index + 1) {
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
