import * as React from 'react';
import Grid from '@material-ui/core/Grid'
import UnsetDataComponent from '../components/UnsetDataComponent';
import Typography from '@material-ui/core/Typography'
import GridList from '@approbado/lib/components/GridList'
import CardButton from './CardButton'
import UserCard from './UserCard'
import { useDataProvider, ListBase } from 'react-admin'

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
            <Grid item xs={12}>
                <ListBase
                    resource='users'
                    basePath='users'
                    filterDefaultValues={{ is_registered: true, top: true }}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                {'Usuarios destacados'}
                            </Typography>
                        </Grid>
                        <GridList
                            emptyListMessage={
                                <UnsetDataComponent
                                    message="¡Lo siento! Aún no tenemos usuarios destacados"
                                />
                            }
                            component={<UserCard />}
                        />
                    </Grid>
                </ListBase>
            </Grid>
        </Grid>
    )
}

export default AdminDashboard
