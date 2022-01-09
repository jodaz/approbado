import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none',
        borderBottom: '1px solid #D1D1D1',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    lightTypography: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: theme.palette.info.light,
    },
    primaryTypography: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    header: {
        padding: '0rem'
    },
    content: {
        padding: '0 0 0 3.5rem',
        height: '4rem',
        '&:last-child': {
            paddingBottom: 'unset !important'
        }
    }
}));

const NotificationCard = ({ data }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography component="div">
                        <Box className={classes.title} sx={{ fontSize: '1rem'}}>
                            Regina Orellana ha decidido que eres muy guap@ y por eso necesita mandarte un mensaje. Aceptalo! Es broma, pero si quieres no es broma 🤭
                        </Box>
                    </Typography>
                }
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={`${process.env.REACT_APP_API_DOMAIN}/${"public/default/user.png"}`}
                    />
                }
                className={classes.header}
            />
            <CardContent className={classes.content}>
                <></>
            </CardContent>
        </Card>
    );
}

NotificationCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default NotificationCard
