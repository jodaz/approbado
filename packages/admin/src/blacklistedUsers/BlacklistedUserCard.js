import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import makeStyles from '@material-ui/styles/makeStyles';
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '8px !important',
        padding: '1rem',
        flexDirection: 'column'
    },
    card: {
        background: theme.palette.background.dark,
        border: 'none',
        height: 'content-height',
        alignItems: 'start',
        padding: '0.5rem 1rem 1rem 1rem'
    },
    headerRoot: {
        padding: '0 !important',
        height: '3rem',
        alignItems: 'start',
    },
    content: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    action: {
        margin: 'unset'
    }
}))

const RestrictedUserCard = ({ data }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} key={data.id}>
            <CardHeader
                className={classes.cardHeader}
                title={
                    <Typography variant="subtitle1">
                        {data.names}
                    </Typography>
                }
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={`${configs.SOURCE}/${data.picture}`}
                    />
                }
                subheader={
                    <Box width='content-box'>
                        <Link
                            to={`/blacklisted-users/${data.id}/show`}
                            color='info'
                            underline='hover'
                            component={LinkBehavior}
                        >
                            Ver publicaciones
                        </Link>
                    </Box>
                }
                classes={{
                    root: classes.headerRoot,
                    content: classes.content,
                    action: classes.action
                }}
            />
        </Card>
    );
}

RestrictedUserCard.propTypes = {
    data: PropTypes.object
}

export default RestrictedUserCard
