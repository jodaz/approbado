import * as React from 'react'
// Components
import Box from '@material-ui/core/Box'
import ForumCard from './ForumCard'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import Spinner from '../../components/Spinner'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'
import useFetch from '../../hooks/useFetch'

const generateNullData = results => Array.from({ length: results }).map(_ => null)

const results = 5

const ForumListView = ({ sort = {}, filter = {} }) => {
    const { user } = useUserState();
    const [perPage, setPerPage] = React.useState(results)
    const {
        loading,
        total,
        data,
        error,
        hasMore
    } = useFetch('/forums', {
        perPage: perPage,
        page: 1,
        filter: filter,
        sort: sort
    })
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

        if (data.length == 0 && !loading) {
            setItems([])
        }
    }, [data, loading])

    React.useEffect(() => {
        setItems(generateNullData(results))
    }, [])

    if (!total) {
        return (
            <NoContent
                icon={<ForumIllustration />}
                title='Aún no hay debates publicados'
            />
        );
    }

    return (
        <Box width={'100%'}>
            {total ? items.map((item, index) => {
                if (items.length === index + 1) {
                    return (
                        <ForumCard
                            data={item}
                            user={user}
                            rootRef={lastItemRef}
                        />
                    );
                } else {
                    return <ForumCard index={index} data={item} user={user} />
                }
            }) : (
                <ErrorMessage>
                    No tiene notificaciones disponibles.
                </ErrorMessage>
            )}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                padding: '2rem 0'
            }}>
                {(loading) && <Spinner />}

                {(error) && <ErrorMessage />}
            </Box>
            {(loading) && <Spinner />}
        </Box>
    )
}

ForumListView.defaultProps = {
    filter: {},
    sort: { field: 'id', order: 'ASC' },
    perPage: 3,
    page: 1
}

export default ForumListView
