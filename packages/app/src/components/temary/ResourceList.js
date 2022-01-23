import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Resource from './Resource'
import { Query } from 'react-admin';
import Spinner from '@approbado/lib/components/Spinner'

const payload = id => ({
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'created_at', order: 'DESC'},
    filter: { trivia_id: id }
});

const ResourceList = ({ id }) => (
    <Query type='getList' resource='files' payload={payload(id)}>
        {({ data, total, loading, error }) => {
            if (loading) return <Spinner />;

            if (error) return null;

            if (!total) {
                return (
                    <Typography variant="subtitle1">
                        Sin recursos
                    </Typography>
                )
            }

            return (
                <div>
                    {!data.map((item, key) => (
                        <Resource
                            key={key}
                            {...item}
                        />
                    ))}
                </div>
            );
        }}
    </Query>
)

export default ResourceList;
