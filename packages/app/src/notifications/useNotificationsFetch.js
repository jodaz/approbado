import * as React from 'react'
import { axios } from '@approbado/lib/providers'

export default function useNotificationsFetch(perPage, page) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState([])
    const [hasMore, setHasMore] = React.useState(null)

    React.useEffect(() => {
        if (hasMore == null || hasMore == true) {
            setLoading(true)
            setError(false)

            axios({
                method: 'GET',
                url: '/notifications',
                params: { page: page, perPage: perPage }
            }).then(res => {
                setData(res.data.data)
                setHasMore(res.data.data.length != res.data.total)
                setLoading(false)
            }).catch(e => {
                setError(true)
            })
        }
    }, [page, perPage])

    return { loading, error, data, hasMore }
}
