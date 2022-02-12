import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { Query } from 'react-admin';
import { makeStyles } from '@material-ui/core'
import Spinner from '@approbado/lib/components/Spinner'
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import CommentShow from '@approbado/lib/layouts/comments/CommentShowLayout';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 0 0 2rem',
        // [theme.breakpoints.up('sm')]: {
        //     padding: '0 0 0 2rem'
        // }
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

    return (
        <Box className={classes.root}>
            <Query type='getList' resource='comments' payload={{
                pagination: { page: 1, perPage: 5 },
                sort: { field: 'created_at', order: 'DESC'},
                filter: { id: parent_id }
            }}>
                {({ data, total, loading, error }) => {
                    if (loading) {
                        return (
                            <Spinner classes={spinnerStyles}/>
                        );
                    }

                    if (error) { return null; }

                    return (
                        <div>
                            <Box className={classes.description}>
                                <Typography component={'p'} variant="body1">
                                    {total} Respuestas
                                </Typography>
                            </Box>
                            {data.map(comment => (
                                <CommentShow {...comment} />
                            ))}
                        </div>
                    );
                }}
            </Query>
        </Box>
    );
}

CommentList.propTypes = {
    isXSmall: PropTypes.bool
}

export default CommentList
