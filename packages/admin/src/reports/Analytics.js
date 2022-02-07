import * as React from 'react'
import AnalyticsCard from './AnalyticsCard';
import Grid from '@material-ui/core/Grid';
import Spinner from '@approbado/lib/components/Spinner'
import { Query } from 'react-admin';

const payload = id => ({
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'reportsCount', order: 'DESC'},
    filter: { report_id: id }
});

const Analytics = ({ id }) => (
    <Query type='getList' resource='report-reasons' payload={payload(id)}>
        {({ data, total, loading, error }) => {
            if (loading) return <Spinner />
            if (error) { return null; }

            return (
                <Grid container>
                    {data.map(post =>
                        <Grid item xs={12} sm={6} md={4}>
                            <AnalyticsCard {...post} />
                        </Grid>
                    )}
                </Grid>
            );
        }}
    </Query>
);

export default Analytics
