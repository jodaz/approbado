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
import Skeleton from "@material-ui/lab/Skeleton";

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

const ForumCard = ({ data, user, rootRef }) => {
    const classes = useStyles();
    const loading = data == null;
    const history = useHistory();
    const ref = React.createRef();

    const redirect = () => history.push(`/forums/${data.id}`)

    return (
        <Card className={classes.root} ref={rootRef}>
            <CardHeader
                action={
                    <>
                        {!loading && (
                            <ForumCardMenuOptions record={data} user={user} ref={ref} />
                        )}
                    </>
                }
                title={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                        <Typography component="div" onClick={redirect}>
                            <Box className={classes.title} sx={{ fontSize: '1rem'}}>
                                {data.message}
                            </Box>
                        </Typography>
                    )
                }
                avatar={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                      />
                    ) : (
                        <Avatar
                            aria-label="recipe"
                            src={`${process.env.REACT_APP_API_DOMAIN}/${data.owner.picture}`}
                        />
                    )
                }
                className={classes.header}
            />
            <>
                {!loading && (
                    <CardContent className={classes.content} onClick={redirect}>
                        <PostDescription record={data} />
                    </CardContent>
                )}
            </>
        </Card>
    );
}

ForumCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default ForumCard
