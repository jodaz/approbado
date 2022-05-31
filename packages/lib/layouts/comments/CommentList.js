import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core'
import Spinner from '@approbado/lib/components/Spinner'
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import CommentShow from '@approbado/lib/layouts/comments/CommentShowLayout';
import useFetch from '@approbado/lib/hooks/useFetch'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 0 0 2rem',
    },
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
    }
}))

const CommentList = ({ parent_id }) => {
    const classes = useStyles();
    const spinnerStyles = useSpinnerStyles();
    const {
        loading,
        total,
        data,
        error
    } = useFetch('/comments', {
        perPage: 5,
        page: 1,
        sort: { field: 'created_at', order: 'DESC'},
        filter: { id: parent_id }
    })

    return (
        <Box className={classes.root}>
            {(loading) && <Spinner classes={spinnerStyles}/>}

            {error && <ErrorMessage />}

            <div>
                <Box className={classes.description}>
                    <Typography component={'p'} variant="body1">
                        {total} Respuestas
                    </Typography>
                </Box>
                {(total) && data.map(comment => (
                    <CommentShow {...comment} />
                ))}
            </div>
        </Box>
    );
}

CommentList.propTypes = {
    isXSmall: PropTypes.bool
}

export default CommentList
