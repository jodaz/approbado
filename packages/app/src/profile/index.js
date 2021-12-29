import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import { useDataProvider } from 'react-admin'

const Profile = () => {
    const dataProvider = useDataProvider();
    const { username } = useParams();
    const [state, setState] = React.useState({})

    const fetchProfile = React.useCallback(async () => {
        const data = await dataProvider.getOne(
            'users',
            {
                filter: { user_name: username },
            }
        );
        console.log(data)
        setState(state => ({ ...state, data }));
    }, [useDataProvider]);

    React.useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <Grid container>
            <Grid item sm='4'>

            </Grid>
        </Grid>
    );
}

export default Profile
