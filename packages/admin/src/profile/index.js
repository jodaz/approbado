import UpdatePassword from './UpdatePassword'
import EditProfile from './EditProfile'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = ['General', 'Seguridad'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'General') {
        return <EditProfile />
    } else if (currentTab === 'Seguridad') {
        return <UpdatePassword />
    }
    return null;
}

const Profile = () => {
    return (
        <TabbedList
            tags={tags}
            defaultTag={'General'}
            name='Perfil'
        >
            <RenderList />
        </TabbedList>
    );
}

export default Profile
