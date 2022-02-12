import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core'
import configs from '@approbado/lib/configs'
import Avatar from '@material-ui/core/Avatar';
import ReplyIcon from '@approbado/lib/icons/ReplyIcon';
import { useConvertPostgresDate } from '@approbado/lib/hooks/useConvertPostgresDate'
import LikeButton from './LikeButton';
import Dot from '@approbado/lib/components/Dot'
import Report from './Report';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '700',
        fontSize: '1.5rem',
        marginBottom: '2rem'
    },
    container: {
        padding: '1.6rem 0.4rem',
        color: theme.palette.info.light,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
    },
    postTitle: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: '1rem',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    username: {
        marginLeft: '0.2rem',
        fontWeight: '600',
        cursor: 'pointer',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    description: {
        paddingTop: '1rem',
        display: 'flex',
        fontSize: '0.9rem'
    },
    root: {
        display: 'flex',
        width: '100%',
        paddingTop: '2rem'
    },
    content: {
        width: '100%',
        display: 'flex',
        paddingLeft: '1rem',
        paddingTop: '0.2rem',
        flexDirection: 'column',
        fontSize: '0.95rem',
    },
    username: {
        cursor: 'pointer',
        fontSize: '1rem',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontWeight: '600',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    header: {
        marginBottom: '1rem',
        display: 'inherit',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'start'
        }
    },
    actions: {
        display: 'inherit',
        marginTop: '1rem',
        color: theme.palette.info.light
    },
    date: {
        color: theme.palette.info.light
    },
    actionButton: {
        display: 'inherit',
        marginRight: '1rem',
        padding: '6px 0',
        color: theme.palette.info.light,
        fontWeight: 400
    }
}))

const CommentShow = comment => {
    const classes = useStyles();
    const date = useConvertPostgresDate(comment.created_at)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const { user } = useUserState();

    let { is_registered } = user;

    return (
        <Box className={classes.root} key={comment.id}>
            <Link
                to={`/users/${comment.owner.id}/show`}
                color='info'
                underline='none'
                component={LinkBehavior}
            >
                <Avatar
                    aria-label="avatar"
                    src={`${configs.SOURCE}/${comment.owner.picture}`}
                />
            </Link>
            <Box className={classes.content}>
                <Box component="div" className={classes.header}>
                    <Link
                        to={`/users/${comment.owner.id}/show`}
                        color='info'
                        underline='hover'
                        component={LinkBehavior}
                        className={classes.username}
                    >
                        {comment.owner.names}
                    </Link>
                    {!(isXSmall) && <Dot />}
                    <Link
                        to={`/comments/${comment.id}/show`}
                        color='info'
                        underline='hover'
                        component={LinkBehavior}
                        className={classes.date}
                    >
                        {date}
                    </Link>
                </Box>
                <Box>
                    {comment.summary}
                </Box>
                <Box className={classes.actions}>
                    <Link
                        to={`/comments/${comment.id}/show`}
                        color='info'
                        underline='hover'
                        component={LinkBehavior}
                        className={classes.actionButton}
                    >
                        <ReplyIcon />
                        {comment.commentsCount}
                        {(!isXSmall) && <> respuestas </> }
                    </Link>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <LikeButton {...comment} />
                        {comment.likesCount}
                        {(!isXSmall) && <> likes </> }
                    </Box>
                    {(is_registered) && (
                        <Button className={classes.actionButton}>
                            <Report {...comment} />
                            {(!isXSmall) && <> reportar </> }
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default CommentShow;
