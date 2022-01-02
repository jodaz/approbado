import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import ProfileSidebar from './ProfileSidebar'
import TabbedList from '@approbado/lib/components/TabbedList'
import AboutMe from './AboutMe'
import Certifications from './Certifications'
import Publications from './Publications'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'start'
        }
    }
}));

const tags = user => ([
    {
        name: 'Sobre mí',
        pathname: 'about',
        component: <AboutMe {...user} />
    },
    {
        name: 'Publicaciones',
        pathname: 'publications',
        component: <Publications {...user} />
    },
    {
        name: 'Certificaciones',
        pathname: 'certifications',
        component: <Certifications {...user} />
    }
])

const Profile = ({ data }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item md='3' sm='12'>
                <ProfileSidebar {...data} />
            </Grid>
            <span style={{ width: '4rem'}} />
            <Grid item md='8' sm='12'>
                <TabbedList tags={tags(data)} />
            </Grid>
        </Grid>
    );
}

export default Profile
