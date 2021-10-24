import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TabbedList from '@approbado/lib/components/TabbedList'
import TestList from './TestList'

const tags = [
    {
        name: 'Pruebas',
        pathname: 'tests',
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
