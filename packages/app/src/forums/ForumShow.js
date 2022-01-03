import * as React from 'react';
import {
    useShowController
} from 'react-admin'
import Box from '@material-ui/core/Box';
import BackButton from './BackButton'
import Typography from '@material-ui/core/Typography';
import { useMediaQuery, makeStyles } from '@material-ui/core'
import PopularPosts from './PopularPosts'
import Avatar from '@material-ui/core/Avatar';
import PostDescription from './PostDescription'
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import Spinner from '@approbado/lib/components/Spinner'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100%',
        paddingTop: '2rem'
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
        minHeight: '20rem'
    }
}))

const ForumShow = props => {
    const showControllerProps = useShowController(props)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const classes = useStyles({
        isXSmall: isXSmall
    });

    const { record, loading } = showControllerProps

    if (loading) return <Spinner />;

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <BackButton />
                <Box className={classes.root}>
                    {(record.owner) && (
                        <Avatar
                            aria-label="avatar"
                            src={`${process.env.REACT_APP_API_DOMAIN}/${record.owner.picture}`}
                        />
                    )}
                    <Box className={classes.content}>
                        <Box component="div">
                            <Typography component='h6' className={classes.title}>
                                {record.message}
                            </Typography>
                        </Box>
                        <Box className={classes.lightTypography}>
                            {record.summary}
                        </Box>
                        <PostDescription record={record} />
                    </Box>
                </Box>
                <Box className={classes.commentsBox}>
                    {(record.commentsCount == 0) && (
                        <NoContent
                            icon={<ForumIllustration />}
                            title='Sé el primero en comentar'
                        />
                    )}
                </Box>
            </Box>
            <PopularPosts isXSmall={isXSmall} />
        </Box>
    )
}

export default ForumShow;
