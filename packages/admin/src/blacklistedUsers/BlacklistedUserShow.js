import * as React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import Link from '@material-ui/core/Link';
import { useShowController } from 'react-admin'
import Spinner from '@approbado/lib/components/Spinner'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import RecentReports from '../components/RecentReports'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import RestrictButton from '../components/RestrictButton'

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        padding: '8px 9px 16px 16px',
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '16rem',
        height: '5rem'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '1rem 0'
    },
    reason: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main,
        margin: '6px 0',
        flexGrow: 1,
        lineHeight: '26px',
        display: 'flex'
    },
    count: {
        paddingLeft: '1rem',
        display: 'inherit',
        alignItems: 'flex-start',
        color: theme.palette.info.light,
        height: 'inherit'
    }
}))

const BlacklistedUserShow = () => {
    const classes = useStyles();
    const { id: userId } = useParams();
    const showControllerProps = useShowController({
        id: userId,
        resource: 'blacklisted-users',
        basePath: '/blacklisted-users'
    })

    const { record, loaded } = showControllerProps

    if (!loaded) return <Spinner />;

    const { names, user_name, id, picture } = record

    return (
        <Box>
            <Box marginBottom='2rem'>
                <Typography variant="h5">Reporte de {names}</Typography>
            </Box>
            <Box>
                <Box className={classes.root}>
                    <Box className={classes.reason}>
                        <Avatar
                            aria-label="recipe"
                            src={`${configs.SOURCE}/${picture}`}
                        />
                        <Box display="flex" flexDirection="column" marginRight='1rem'>
                            <Box component="span" sx={{
                                fontWeight: 500
                            }}>
                                {names}
                            </Box>
                            <Box component="span" sx={{
                                fontWeight: 400,
                                fontSize: '0.9rem'
                            }}>
                                @{user_name}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.count}>
                        <Link
                            to={`/users/${id}/show`}
                            color='info'
                            underline='hover'
                            component={LinkBehavior}
                        >
                            Ver perfil
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box margin='1rem 0'>
                <RestrictButton {...record} />
            </Box>
            <Box marginTop="1rem">
                <Typography variant="subtitle1">
                    Publicaciones reportadas
                </Typography>
                <Box marginTop='1rem'>
                    <RecentReports filterDefaultValues={{ reported_user_id: id }} />
                </Box>
            </Box>
        </Box>
    )
}

export default BlacklistedUserShow
