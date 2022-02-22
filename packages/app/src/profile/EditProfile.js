import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ProfileSidebar from '@approbado/lib/layouts/profile/ProfileSidebar'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import PersonalDataForm from './PersonalDataForm'
import TabbedList from '@approbado/lib/components/TabbedList'
import { Form } from 'react-final-form'
import Sessions from './Sessions'
import UserPlan from './UserPlan'

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

const tags = props => ([
    {
        name: 'Datos personales',
        pathname: 'about',
        component: <PersonalDataForm {...props} />
    },
    {
        name: 'Inicio de sesión',
        pathname: 'sessions',
        component: <Sessions {...props} />
    },
    {
        name: 'Planes',
        pathname: 'plans',
        component: <UserPlan {...props} />
    }
])

const EditProfile = () => {
    const classes = useStyles();
    const { user, isAuth } = useUserState();

    const handleSubmit = () => console.log("Hello")

    if (!isAuth) return null;

    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={user}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container className={classes.root}>
                        <Grid item md='3' sm='12'>
                            <ProfileSidebar {...user} />
                        </Grid>
                        <span style={{ width: '4rem'}} />
                        <Grid item md='8' sm='12'>
                            <TabbedList tags={tags({ submitting: submitting })} />
                        </Grid>
                    </Grid>
                </form>
            )}
        />
    )
}

export default EditProfile
