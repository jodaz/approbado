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
}))

const ForumShow = props => {
    const showControllerProps = useShowController(props)
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )
    const classes = useStyles({
        isXSmall: isXSmall
    });

    const { record, loaded } = showControllerProps

    const dates = record => {
        const ISODate = new Date(record.created_at.replace(' ', 'T'));
        const shortOptions = {
            month: 'long',
            day: 'numeric'
        }

        const shortDate = new Intl.DateTimeFormat('es-ES', shortOptions).format(ISODate)

        return shortDate
    };

    if (!loaded) return null;

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <BackButton />
                <Box className={classes.root}>
                    {(record.owner) && (
                        <Avatar
                            aria-label="avatar"
                            src={`${process.env.REACT_APP_API_DOMAIN}/public/${record.owner.picture}`}
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
            </Box>
            <PopularPosts isXSmall={isXSmall} />
        </Box>
    )
}

export default ForumShow;
