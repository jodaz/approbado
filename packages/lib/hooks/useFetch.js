import * as React from 'react'
import { axios } from '@approbado/lib/providers'

const getQueryFromParams = (params = {}) => {
    const query = {};

    if (params["page"] != undefined) {
        query.page = params.page + (-1)
    }
    if ("perPage" in params) {
        query.perPage = params.perPage
    }
    if ("filter" in params) {
        // Add all filter params to query.
        Object.keys(params.filter || {}).forEach((key) => {
            query[`filter[${key}]`] = params.filter[key];
        });
    }

    // Add sort parameter
    if (params.sort && params.sort.field) {
        query.sort = params.sort.field;
        query.order = params.sort.order === 'ASC' ? 'asc' : 'desc';
    }

    return query;
}

const useFetch = (url, params = {}) => {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState([])
    const [hasMore, setHasMore] = React.useState(null)
    const [total, setTotal] = React.useState(null)

    React.useEffect(() => {
        if (hasMore == null || hasMore == true) {
            setLoading(true)
            setError(false)
            console.log("laksfjakfj")
            axios({
                method: 'GET',
                url: url,
                params: getQueryFromParams(params)
            }).then(res => {
                const { total: totalResults, data } = res.data

                if (total == null) {
                    setTotal(totalResults)
                }

                setData(data)
                setHasMore(data.length != totalResults)
                setLoading(false)
            }).catch(e => {
                setError(true)
            })
        }
    }, [params.perPage, params.page, hasMore])

    return { loading, error, data, hasMore, total }
}

export default useFetch
