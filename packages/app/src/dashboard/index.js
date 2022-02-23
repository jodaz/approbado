import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TabbedList from '@approbado/lib/components/TabbedList'
import TestList from './TestList'
import EmptyMessageComponent from '@approbado/lib/components/EmptyMessageComponent'

const tags = [
    {
        name: 'Pruebas',
        pathname: 'tests',
        component: <TestList />
    },
    {
        name: 'Agenda',
        pathname: 'calendar',
        component: <EmptyMessageComponent
            message='Sin resultados'
        />
    },
    {
        name: 'Puntajes',
        pathname: 'ranking',
        component: <EmptyMessageComponent
            message='Sin resultados'
        />
    },
    {
        name: 'Pruebas realizadas',
        pathname: 'tests-made',
        component: <EmptyMessageComponent
            message='Sin resultados'
        />
    }
]

export default function Dashboard() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <TabbedList
                    tags={tags}
                    name='Home'
                />
            </Grid>
        </Grid>
    )
}
