import * as React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardButton from './CardButton'
import UserCard from './UserCard'
import { useDataProvider, Query } from 'react-admin'
import Spinner from '@approbado/lib/components/Spinner'
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'

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

const payload = {
    pagination: { page: 1, perPage: 9 },
    sort: { field: 'top', order: 'DESC'},
    filter: { is_registered: true }
};

const AdminDashboard = () => {
    const [state, setState] = React.useState(initialState);
    const dataProvider = useDataProvider();
    const spinnerClasses = useSpinnerStyles();

    const fetchUsers = React.useCallback(async () => {
        const { total } = await dataProvider.getList(
            'users',
            {
                filter: { is_registered: true },
                pagination: { page: 1, perPage: 100 },
            }
        );

        setState(state => ({
            ...state,
            users: {
                ...state.users,
                loading: false,
                total: total
            }
        }));
    }, [dataProvider]);

    const fetchTrivias = React.useCallback(async () => {
        const { total } = await dataProvider.getList(
            'trivias',
            {
                pagination: { page: 1, perPage: 100 },
                filter: { active: true },
            }
        );

        setState(state => ({
            ...state,
            trivias: {
                ...state.trivias,
                loading: false,
                total: total
            }
        }));
    }, [dataProvider]);

    const fetchMemberships = React.useCallback(async () => {
        const { total } = await dataProvider.getList(
            'memberships',
            {
                pagination: { page: 1, perPage: 100 },
            }
        );

        setState(state => ({
            ...state,
            memberships: {
                ...state.memberships,
                loading: false,
                total: total
            }
        }));
    }, [dataProvider]);

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
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography component='h3' variant={'h6'}>
                            Usuarios destacados
                        </Typography>
                    </Grid>
                    <Query type='getList' resource='users' payload={payload}>
                        {({ data, total, loading, error }) => {
                            if (error) { return null; }

                            if (loading) {
                                return (
                                    <Spinner classes={spinnerClasses} />
                                );
                            }

                            return (
                                <Grid container>
                                    {data.map(user =>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <UserCard data={user} />
                                        </Grid>
                                    )}
                                    {(total == 0) && (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography component={'p'} variant="body1">
                                                No tenemos debates disponibles
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            );
                        }}
                    </Query>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminDashboard
