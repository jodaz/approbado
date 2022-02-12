import * as React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import Link from '@material-ui/core/Link';
import configs from '@approbado/lib/configs'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteReportButton from './DeleteReportButton'
import BlacklistButton from './BlacklistButton'
import isEmpty from 'is-empty'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '6px',
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
    },
}))

export default function({ id, post }) {
    const classes = useStyles();

    const { owner } = post

    return (
        <>
            <Box marginBottom='2rem'>
                <Typography variant="h6">Publicado por</Typography>
            </Box>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            src={`${configs.SOURCE}/${owner.picture}`}
                        />
                    }
                    title={owner.names}
                    subheader={owner.user_name}
                    action={
                        <Link
                            to={`/users/${owner.id}/show`}
                            color='info'
                            underline='hover'
                            component={LinkBehavior}
                        >
                            Ver perfil
                        </Link>
                    }
                    classes={{
                        root: classes.headerRoot,
                        content: classes.content,
                        action: classes.action
                    }}
                />
                <Box paddingTop='1rem' display="flex">
                    {isEmpty(owner.blacklisted) && <BlacklistButton {...post} />}
                    <DeleteReportButton id={post.id} />
                </Box>
            </Card>
        </>
    )
}
