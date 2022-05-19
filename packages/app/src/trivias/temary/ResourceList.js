import * as React from 'react'
import Resource from './Resource'
import Spinner from '@approbado/lib/components/Spinner'
import useFetch from '@approbado/lib/hooks/useFetch'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'

const ResourceList = ({ id }) => {
    const {
        loading,
        total,
        data,
        error
    } = useFetch('/files', {
        perPage: 100,
        page: 1,
        sort: { field: 'created_at', order: 'DESC' },
        filter: { trivia_id: id }
    })

    if (loading) return <Spinner />;

    if (error) return <ErrorMessage />;

    if (!total) {
        return (
            <ErrorMessage>
                Sin recursos disponibles.
            </ErrorMessage>
        )
    }

    return (
        <div>
            {data.map(item => (
                <Resource
                    {...item}
                />
            ))}
        </div>
    );
}

export default ResourceList;
