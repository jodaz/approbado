import * as React from 'react'
// Components
import Box from '@material-ui/core/Box'
import { ListBase, useListContext } from 'react-admin'
import ForumCard from './ForumCard'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import Spinner from '../../components/Spinner'

const ForumListView = props => (
    <ListBase
        resource="forums"
        basePath="/forums"
        perPage={5}
        {...props}
    >
        <Box display="flex">
            <ForumList />
        </Box>
    </ListBase>
)

const ForumList = () => {
    const { ids, data, total, loading } = useListContext();
    const { user } = useUserState();


    if (loading) return <Spinner />

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
            {ids.map((id, i) => (
                <ForumCard
                    data={data[id]}
                    id={id}
                    index={i}
                    key={id}
                    user={user}
                />
            ))}
        </Box>
    )
}

export default ForumListView
