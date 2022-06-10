import * as React from 'react';
import { axios } from '@approbado/lib/providers';
import Spinner from '@approbado/lib/components/Spinner'
import CommentShowLayout from './CommentShowLayout'
import CommentList from '@approbado/lib/layouts/comments/CommentList'
import Box from '@material-ui/core/Box'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import { useMediaQuery, makeStyles } from '@material-ui/core'
import CommentInput from '@approbado/lib/layouts/comments/CommentInput'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import PopularPosts from '@approbado/lib/components/PopularPosts'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100%',
        paddingTop: '2rem',
    },
    container: props => ({
        width: props.isXSmall ? '100%' : '75%'
    }),
    commentsBox: {
        minHeight: '20rem',
        width: '100%',
        marginTop: '2rem'
    },
}))


const emptyTitle = ({ is_registered }) => (
    (!is_registered) ? 'Sin comentarios' : 'Sé el primero en comentar'
)

const CommentShow = () => {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const classes = useStyles({
        isXSmall: isXSmall
    });
    const { user } = useUserState();
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/comments/${id}`)

        setRecord(data)
    }, [])

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (!Object.entries(record).length) return <Spinner />;

    return (
        <Box className={classes.root} paddingBottom="5rem">
            <Box className={classes.container}>
                <CommentShowLayout {...record} />
                <Box className={classes.commentsBox}>
                    {(user.is_registered) && <CommentInput />}
                    {(record.commentsCount == 0) ? (
                        <NoContent
                            icon={<ForumIllustration />}
                            title={emptyTitle(user)}
                        />
                    ) : (
                        <CommentList parent_id={record.id} />
                    )}
                </Box>
            </Box>
            <PopularPosts isXSmall={isXSmall} />
        </Box>
    );
}

export default CommentShow;
