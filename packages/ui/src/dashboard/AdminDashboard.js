import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CardButton from './CardButton'
import { useDataProvider } from 'react-admin'

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
    const dataProvider = useDataProvider();

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
                    <Typography component='h3' variant={'h5'}>
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
        </Grid>
    )
}

export default AdminDashboard
