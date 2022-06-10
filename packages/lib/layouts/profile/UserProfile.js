import * as React from 'react'
import ProfileLayout from './ProfileLayout'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { axios } from '@approbado/lib/providers';

const UserProfile = () => {
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/users/${id}`)

        setRecord(data)
    }, [])

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (!Object.entries(record).length) return <Spinner />;

    return <ProfileLayout data={record} />;
}

export default UserProfile
