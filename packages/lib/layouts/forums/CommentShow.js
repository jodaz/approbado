import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import configs from '@approbado/lib/configs'
import Avatar from '@material-ui/core/Avatar';
import ReplyIcon from './ReplyIcon';
import { useConvertPostgresDate } from '@approbado/lib/hooks/useConvertPostgresDate'
import LikeButton from './LikeButton';
import Dot from '@approbado/lib/components/Dot'
import Report from './Report';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
        marginRight: '1rem'
    }
}))

const CommentShow = comment => {
    const classes = useStyles();
    const date = useConvertPostgresDate(comment.created_at)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );

    return (
        <Box className={classes.root} key={comment.id}>
            <Avatar
                aria-label="avatar"
                src={`${configs.SOURCE}/${comment.owner.picture}`}
            />
            <Box className={classes.content}>
                <Box component="div" className={classes.header}>
                    <Link to={`/users/${comment.owner.id}/show`} className={classes.username}>
                        {comment.owner.names}
                    </Link>
                    {!(isXSmall) && <Dot />}
                    <Box className={classes.date}>
                        {date}
                    </Box>
                </Box>
                <Box>
                    {comment.summary}
                </Box>
                <Box className={classes.actions}>
                    <Box className={classes.actionButton}>
                        <ReplyIcon />
                        {comment.commentsCount}
                        {(!isXSmall) && <> respuestas </> }
                    </Box>
                    <Box className={classes.actionButton}>
                        <LikeButton {...comment} />
                        {comment.likesCount}
                        {(!isXSmall) && <> likes </> }
                    </Box>
                    <Box className={classes.actionButton}>
                        <Report {...comment} />
                        {(!isXSmall) && <> reportar </> }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CommentShow;
