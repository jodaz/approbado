import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../actions';
import { axios } from '@approbado/lib/providers'

export const useSchedulesState = () => {
    const store = useSelector(state => state);

    return store.schedules;
};

export const useSchedulesDispatch = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])

    const handleFetchSchedule = async (id) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/schedules/user/${id}`)

            setData(data)
        } catch (err) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
        setLoading(false)
    }

    React.useEffect(() => dispatch(fetchSchedules(data)), [data])

    return {
        fetchSchedules: async id => {
            await handleFetchSchedule(id)
        },
        loading: loading,
        data: data
    }
}
