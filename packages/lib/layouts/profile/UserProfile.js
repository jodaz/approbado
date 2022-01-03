import * as React from 'react'
import { useShowController } from 'react-admin'
import ProfileLayout from './ProfileLayout'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'

const UserProfile = props => {
    const { id } = useParams()
    const showControllerProps = useShowController({
        id: id,
        basePath: 'users',
        resource: 'users'
    })

    const { record, loading } = showControllerProps

    if (loading) return <Spinner />;

    return <ProfileLayout data={record} />;
}

export default UserProfile
