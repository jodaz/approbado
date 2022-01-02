import * as React from 'react'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import ProfileLayout from '@approbado/lib/layouts/profile/ProfileLayout'

const Profile = () => {
    const { user, isAuth } = useUserState();

    if (!isAuth) return null;

    return <ProfileLayout data={user} />;
}

export default Profile
