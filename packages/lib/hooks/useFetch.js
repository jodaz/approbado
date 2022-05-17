import * as React from 'react'
import { axios } from '@approbado/lib/providers'

export default function useFetch(url, perPage, page) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState([])
    const [hasMore, setHasMore] = React.useState(null)
    const [total, setTotal] = React.useState(null)

    React.useEffect(() => {
        if (hasMore == null || hasMore == true) {
            setLoading(true)
            setError(false)

            axios({
                method: 'GET',
                url: url,
                params: { page: page, perPage: perPage }
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
    }, [page, perPage])

    return { loading, error, data, hasMore, total }
}
