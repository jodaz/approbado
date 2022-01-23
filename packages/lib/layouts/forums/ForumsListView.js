import * as React from 'react'
// Components
import Box from '@material-ui/core/Box'
import { useMutation } from 'react-admin'
import ForumCard from './ForumCard'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import Spinner from '../../components/Spinner'

const ForumListView = ({ sort, filter, perPage, page: initialPage }) => {
    const { user } = useUserState();
    const [items, setItems] = React.useState([])
    const [page, setPage] = React.useState(initialPage);
    const [loadMore, setLoadMore] = React.useState(true)
    const [fetchData, { data, total, error, loaded }] = useMutation({
        type: 'getList',
        resource: 'forums',
        payload: {
            pagination: { page, perPage },
            sort,
            filter,
        }
    });
    const targetRef = React.useRef();

    const handleScroll = e => {
        // console.log(targetRef)
        // if ((window.innerHeight >= targetRef.current.getBoundingClientRect().bottom) && loadMore) {
        //     handleLoadMore();
        // }
        e.stopPropagation();
    }

    React.useEffect(() => {
        fetchData()
    }, []);

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, true)

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    React.useEffect(() => {
        if (loaded) {
            setItems([...items, ...data])
            setLoadMore(total > items.length)
        }
    }, [data, loaded])

    const handleLoadMore = async () => {
        await setPage(page + 1)
        await fetchData();
    }

    if (error) {
        return <p>ERROR: {error}</p>
    }

    if (!total) {
        return (
            <NoContent
                icon={<ForumIllustration />}
                title='Aún no hay debates publicados'
            />
        );
    }

    return (
        <Box width={'100%'} ref={targetRef}>
            {items.map((item, i) => (
                <ForumCard
                    data={item}
                    id={i}
                    index={i}
                    key={i}
                    user={user}
                />
            ))}
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
