import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Dashboard() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item sm={12}>
                    <Typography component='h3' variant={'h5'}>
                        Resumen
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
