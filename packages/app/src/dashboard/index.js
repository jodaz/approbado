import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TabbedList from '@approbado/lib/components/TabbedList'
import TestList from './TestList'

const tags = ['Pruebas'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'Pruebas') {
        return <TestList />
    }
    return null;
}

export default function Dashboard() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <TabbedList
                    tags={tags}
                    defaultTag={'Pruebas'}
                    name='Home'
                >
                    <RenderList />
                </TabbedList>
            </Grid>
        </Grid>
    )
}
