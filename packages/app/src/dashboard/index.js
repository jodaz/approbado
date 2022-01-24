import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TabbedList from '@approbado/lib/components/TabbedList'
import TestList from './TestList'

const tags = [
    {
        name: 'Pruebas',
        pathname: 'tests',
        component: <TestList />
    },
    {
        name: 'Agenda',
        pathname: 'calendar',
        component: <TestList />
    },
    {
        name: 'Puntajes',
        pathname: 'ranking',
        component: <TestList />
    },
    {
        name: 'Pruebas realizadas',
        pathname: 'tests-made',
        component: <TestList />
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
