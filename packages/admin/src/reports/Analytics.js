import * as React from 'react'
import AnalyticsCard from './AnalyticsCard';
import Grid from '@material-ui/core/Grid';
import Spinner from '@approbado/lib/components/Spinner'
import useFetch from '@approbado/lib/hooks/useFetch'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'

const Analytics = ({ id }) => {
    const {
        loading,
        total,
        data,
        error
    } = useFetch('/report-reasons', {
        perPage: 100,
        page: 1,
        sort: { field: 'reportsCount', order: 'DESC' },
        filter: { report_id: id }
    })

    if (loading) return <Spinner />
    if (error) return <ErrorMessage />

    if (!total) return (
        <ErrorMessage>
            Sin registros.
        </ErrorMessage>
    )

    return (
        <Grid container>
            {data.map(post =>
                <Grid item xs={12} sm={6} md={4}>
                    <AnalyticsCard {...post} />
                </Grid>
            )}
        </Grid>
    );
};

export default Analytics
