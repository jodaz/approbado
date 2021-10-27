import UpdatePassword from '@approbado/lib/layouts/UpdatePassword'
import EditProfile from './EditProfile'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'General',
        pathname: 'general',
        component: <EditProfile />
    },
    {
        name: 'Actualizar contraseña',
        pathname: 'update password',
        component: <UpdatePassword />
    },
]

const Profile = () => {
    return (
        <TabbedList
            tags={tags}
            name='Perfil'
        />
    );
}

export default Profile
