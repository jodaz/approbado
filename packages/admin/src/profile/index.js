import TabbedList from '@approbado/lib/components/TabbedList'
import Admin from '../layouts/Admin'

const tags = [
    {
        name: 'General',
        pathname: '/profile/about'
    },
    {
        name: 'Actualizar contraseña',
        pathname: '/profile/security'
    },
]

const Profile = ({ children }) => (
    <Admin>
        <TabbedList
            tags={tags}
            name='Perfil'
        />
        {children}
    </Admin>
);

export default Profile
