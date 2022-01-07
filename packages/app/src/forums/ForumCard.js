import * as React from 'react';
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import PostDescription from './PostDescription'
import ForumCardMenuOptions from './ForumCardMenuOptions';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #D1D1D1',
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

const ForumCard = ({ data, user }) => {
    const classes = useStyles();
    const history = useHistory();
    const ref = React.createRef();

    const redirect = () => history.push(`/forums/${data.id}/show`)

    return (
        <Card className={classes.root}>
            <CardHeader
                action={<ForumCardMenuOptions record={data} user={user} ref={ref} history={history} />}
                title={
                    <Typography component="div" onClick={redirect}>
                        <Box className={classes.title} sx={{ fontSize: '1rem'}}>
                            {data.message}
                        </Box>
                    </Typography>
                }
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={`${process.env.REACT_APP_API_DOMAIN}/${data.owner.picture}`}
                    />
                }
                className={classes.header}
            />
            <CardContent className={classes.content} onClick={redirect}>
                <PostDescription record={data} />
            </CardContent>
        </Card>
    );
}

ForumCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default ForumCard
