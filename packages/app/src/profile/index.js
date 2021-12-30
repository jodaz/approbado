import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import ProfileExtraInfoCard from '@approbado/lib/components/ProfileExtraInfoCard'
import { makeStyles, fade } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

// Illustrations
import { ReactComponent as Stage1 } from '@approbado/lib/illustrations/Stage1.svg'
import { ReactComponent as Forum } from '@approbado/lib/illustrations/Forum.svg'
import { ReactComponent as Forum2 } from '@approbado/lib/illustrations/Forum2.svg'
import { ReactComponent as Ribbon } from '@approbado/lib/illustrations/Ribbon.svg'

const Spacer = () => <span style={{ height: 0, width: '100%', borderBottom: '0.1rem solid rgba(0, 0, 0, 0.2)' }} />;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    picture: {
        height: '8rem',
        width: '8rem'
    },
    name: {
        fontWeight: 600
    },
    username: {
        fontWeight: 600,
        color: fade(theme.palette.primary.dark, 0.7)
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem'
    }
}));

const Profile = () => {
    const classes = useStyles();
    const { user, isAuth } = useUserState();

    if (!isAuth) return null;

    return (
        <Grid container className={classes.root}>
            <Grid item sm='3' sx={12}>
                <Box className={classes.headerContainer}>
                    <Avatar
                        className={classes.picture}
                        src={`${process.env.REACT_APP_API_DOMAIN}/public/${user.picture}`}
                    />
                    <Typography variant="subtitle1" className={classes.name}>
                        {user.names}
                    </Typography>
                    <Typography variant="body2" className={classes.username}>
                        {user.user_name}
                    </Typography>
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='flex-start' width='100%'>
                    <ProfileExtraInfoCard
                        Image={<Stage1 />}
                        text='Puntos acumulados'
                        amount='4,000'
                    />
                    <Spacer />
                    <ProfileExtraInfoCard
                        Image={<Forum />}
                        text='Debates respondidos'
                        amount='34'
                    />
                    <Spacer />
                    <ProfileExtraInfoCard
                        Image={<Forum2 />}
                        text='Debates iniciados'
                        amount='2'
                    />
                    <Spacer />
                    <ProfileExtraInfoCard
                        Image={<Ribbon />}
                        text='Certificaciones'
                        amount='3'
                    />
                </Box>
            </Grid>
            <Grid item='9'>

            </Grid>
        </Grid>
    );
}

export default Profile
