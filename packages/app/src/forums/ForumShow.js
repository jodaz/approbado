import * as React from 'react';
import {
    useShowController
} from 'react-admin'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import BackButton from './BackButton'
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core'
import PopularPosts from './PopularPosts'

const useStyles = makeStyles(props => ({
    root: {
        display: 'flex',
        paddingTop: '2rem',
    },
    container: {
        width: props.isXSmall ? '100%' : '79%'
    },
    header: {
        margin: '2em 0',
        fontWeight: '600'
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

    if (!loaded) return null;

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <BackButton />
                <Box className={classes.header}>
                    <Typography component="div">
                        <Box>
                            {record.message}
                        </Box>
                    </Typography>
                </Box>
            </Box>
            <PopularPosts isXSmall={isXSmall} />
        </Box>
    )
}

export default ForumShow;
