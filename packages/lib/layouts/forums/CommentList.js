import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { Query, Loading, Error } from 'react-admin';
import Emoji from '@approbado/lib/components/Emoji'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Spinner from '@approbado/lib/components/Spinner'

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
    rootSpinner: {
        height: '25vh'
    },
    loader: {
        height: '2rem !important',
        width: '2rem !important'
    },
    description: {
        paddingTop: '1rem',
        display: 'flex',
        fontSize: '0.9rem'
    }
}))

const CommentList = ({ parent_id }) => {
    const classes = useStyles();

    return (
        <Box p='0 0 0 2rem'>
            <Query type='getList' resource='comments' payload={{
                pagination: { page: 1, perPage: 5 },
                sort: { field: 'created_at', order: 'DESC'},
                filter: { id: parent_id }
            }}>
                {({ data, total, loading, error }) => {
                    if (loading) {
                        return (
                            <Spinner classes={{
                                root: classes.rootSpinner,
                                loader: classes.loader
                            }}/>
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
