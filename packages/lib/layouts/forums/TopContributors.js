import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { Query } from 'react-admin';
import Emoji from '@approbado/lib/components/Emoji'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Spinner from '@approbado/lib/components/Spinner'
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import ReplyIcon from '@approbado/lib/icons/ReplyIcon';

const payload = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'contributionsCount', order: 'DESC'}
};

const useStyles = makeStyles(theme => ({
    card: {
        padding: '1rem 0.4rem',
        display: 'flex'
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
    icon: {
        marginRight: '1rem',
        height: theme.spacing(6),
        width: theme.spacing(6)
    },
    description: {
        display: 'inherit',
        flexDirection: 'column',
    },
    contributionsCount: {
        display: 'inherit',
        marginTop: '0.25rem',
        color: theme.palette.info.light
    }
}))

const AsideBar = ({ isXSmall }) => {
    const classes = useStyles();
    const spinnerClasses = useSpinnerStyles();

    return (
        <Box>
            {!isXSmall && (
                <Box p='0 0 0 2rem'>
                    <Typography component="div">
                        <Box sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
                            Top - Contribuidores
                        </Box>
                    </Typography>
                    <Typography component="div">
                        <Box sx={{ fontWeight: '400', fontSize: '1rem' }}>
                            {'Personas que comentaron debates y compartieron conocimientos en el foro.'}
                        </Box>
                    </Typography>
                    <Query type='getList' resource='users' payload={payload}>
                        {({ data, total, loading, error }) => {
                            if (loading) {
                                return (
                                    <Spinner classes={spinnerClasses}/>
                                );
                            }
                            if (error) { return null; }

                            return (
                                <Box>
                                    {data.map(user =>
                                        <Box className={classes.card}>
                                            <Avatar
                                                className={classes.icon}
                                                src={`${configs.SOURCE}/${user.picture}`}
                                                alt='photo_profile'
                                            />
                                            <Box className={classes.description}>
                                                <Link
                                                    className={classes.username}
                                                    to={`/users/${user.id}/show`}
                                                >
                                                    {user.names}
                                                </Link>
                                                <Box className={classes.contributionsCount}>
                                                    <ReplyIcon />
                                                    {user.contributionsCount} discusiones
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                    {(total == 0) && (
                                        <Box className={classes.description}>
                                            <Typography component={'p'} variant="body1">
                                                No tenemos contribuidores disponibles
                                                {' '}
                                                <Emoji symbol="😔" />
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            );
                        }}
                    </Query>
                </Box>
            )}
        </Box>
    );
}

AsideBar.propTypes = {
    isXSmall: PropTypes.bool
}

export default AsideBar
