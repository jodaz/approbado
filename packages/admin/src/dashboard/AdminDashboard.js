import * as React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardButton from './CardButton'
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import { axios } from '@approbado/lib/providers'
import TopUsersList from './TopUsersList'

const initialState = {
    'users': {
        title: 'Usuarios registrados',
        loading: true,
        total: 0,
        linkText: 'Ver usuarios',
        link: '/users'
    },
    'memberships': {
        title: 'Membresías activas',
        loading: true,
        total: 0,
        linkText: 'Ver usuarios suscritos',
        link: '/users'
    },
    'trivias': {
        title: 'Trivias publicadas',
        loading: true,
        total: 0,
        linkText: 'Editar trivias',
        link: '/trivias'
    },
};

const AdminDashboard = () => {
    const [state, setState] = React.useState(initialState);
    const spinnerClasses = useSpinnerStyles();

    const fetchUsers = React.useCallback(async () => {
        const { data: { total } } = await axios.get('users?filter%5Bis_registered%5D=true')

        setState(state => ({
            ...state,
            users: {
                ...state.users,
                loading: false,
                total: total
            }
        }));
    }, []);

    const fetchTrivias = React.useCallback(async () => {
        const { data: { total } } = await axios.get('trivias');

        setState(state => ({
            ...state,
            trivias: {
                ...state.trivias,
                loading: false,
                total: total
            }
        }));
    }, []);

    const fetchMemberships = React.useCallback(async () => {
        const { data: { total } } = await axios.get('memberships')

        setState(state => ({
            ...state,
            memberships: {
                ...state.memberships,
                loading: false,
                total: total
            }
        }));
    }, []);

    React.useEffect(() => {
        fetchUsers();
        fetchMemberships();
        fetchTrivias();
    }, []);

    const { trivias, users, memberships } = state;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item sm={12}>
                    <Typography component='h3' variant={'h6'}>
                        Resumen
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <CardButton {...users} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardButton {...memberships} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardButton {...trivias} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TopUsersList />
            </Grid>
        </Grid>
    )
}

export default AdminDashboard
