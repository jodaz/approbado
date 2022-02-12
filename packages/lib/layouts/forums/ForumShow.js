import * as React from 'react';
import {
    useShowController
} from 'react-admin'
import Box from '@material-ui/core/Box';
import BackButton from './BackButton'
import Typography from '@material-ui/core/Typography';
import { useMediaQuery, makeStyles } from '@material-ui/core'
import PopularPosts from '@approbado/lib/components/PopularPosts'
import Avatar from '@material-ui/core/Avatar';
import PostDescription from './PostDescription'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import Spinner from '@approbado/lib/components/Spinner'
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import CommentInput from '@approbado/lib/layouts/comments/CommentInput'
import CommentList from '@approbado/lib/layouts/comments/CommentList'

// Hooks
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import configs from '@approbado/lib/configs'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        paddingTop: '2rem',
    },
    container: props => ({
        width: props.isXSmall ? '100%' : '75%'
    }),
    header: {
        display: 'flex',
        justifyContent: 'start',
        fontWeight: '600'
    },
    content: {
        width: '100%',
        display: 'flex',
        paddingLeft: '1rem',
        paddingTop: '0.2rem',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 600,
        fontSize: '1.1rem',
        paddingBottom: '1rem'
    },
    commentsBox: {
        minHeight: '20rem',
        width: '100%',
        marginTop: '2rem'
    },
    link: {
        fontWeight: 600,
        color: theme.palette.info.main
    }
}))

const emptyTitle = ({ is_registered }) => (
    (!is_registered) ? 'Sin comentarios' : 'Sé el primero en comentar'
)

const ForumShow = props => {
    const { user } = useUserState();
    const showControllerProps = useShowController(props)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const classes = useStyles({
        isXSmall: isXSmall
    });
    const { setDialog } = useDialogDispatch('forums.warning')

    const { record, loading } = showControllerProps

    if (loading) return <Spinner />;

    return (
        <Box className={classes.root} paddingBottom="5rem">
            <Box className={classes.container}>
                {(user.is_registered) && (
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <BackButton />
                        {(record.owner.id != user.id) && (
                            <Link
                                to='/forums'
                                color='info'
                                underline='hover'
                                component={LinkBehavior}
                                className={classes.link}
                                onClick={() => setDialog()}
                            >
                                Iniciar un debate
                            </Link>
                        )}
                    </Box>
                )}
                <Box className={classes.root}>
                    {(record.owner) && (
                        <Link
                            to={`/users/${record.owner.id}/show`}
                            color='info'
                            underline='none'
                            component={LinkBehavior}
                        >
                            <Avatar
                                aria-label="avatar"
                                src={`${configs.SOURCE}/${record.owner.picture}`}
                            />
                        </Link>
                    )}
                    <Box className={classes.content}>
                        <Box component="div">
                            <Typography component='h6' className={classes.title}>
                                {record.message}
                            </Typography>
                        </Box>
                        <Box>
                            {record.summary}
                        </Box>
                        <PostDescription record={record} />
                    </Box>
                </Box>
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
    )
}

export default ForumShow;
