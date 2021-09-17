import * as React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';

const AdminDashboard = () => {
    return (
        <Grid container>
            <Grid item sm={12}>
                <Grid container>
                    <Grid item sm={12}>
                        <Typography component='h3' variant={'h5'}>
                            Resumen
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12}>
                <Grid container>
                    <Grid item sm={12}>
                        <Typography component='h3' variant={'h5'}>
                            Usuarios destacados
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminDashboard