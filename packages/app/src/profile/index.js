import EditProfile from './EditProfile'
import TabbedList from '@approbado/lib/components/TabbedList'
import Grid from '@material-ui/core/Grid'

const tags = [
    {
        name: 'Datos personales',
        pathname: 'general',
        component: <EditProfile />
    }
]

const Profile = () => {
    return (
        <Grid container>
            <Grid item sm='4'>

            </Grid>
            <Grid item sm='8'>
                <TabbedList
                    tags={tags}
                />
            </Grid>
        </Grid>
    );
}

export default Profile
