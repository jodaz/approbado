import * as React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UserCard from './UserCard'
import Spinner from '@approbado/lib/components/Spinner'
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import useFetch from '@approbado/lib/hooks/useFetch'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'

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
    const {
        loading,
        total,
        data,
        error
    } = useFetch('/users', {
        perPage: 9,
        page: 1,
        sort: { field: 'points', order: 'DESC'},
        filter: { is_registered: true }
    })

    return (
        <Grid container>
            <Grid item xs={12} sm={6} md={4}>
                <Typography component='h3' variant={'h6'}>
                    Usuarios destacados
                </Typography>
            </Grid>

            {(total || loading == false) ? (
                <Grid container>
                    {data.map((user, i) =>
                        <Grid item xs={12} sm={6} md={4}>
                            <UserCard data={user} index={i} />
                        </Grid>
                    )}
                </Grid>
            ) : (
                <ErrorMessage>
                    Aún no tenemos usuarios destacados.
                </ErrorMessage>
            )}

            {(error) && (
                <ErrorMessage>
                    Ha ocurrido un error en su solicitud.
                </ErrorMessage>
            )}

            {(loading) && <Spinner />}
        </Grid>
    )
}

export default AdminDashboard
