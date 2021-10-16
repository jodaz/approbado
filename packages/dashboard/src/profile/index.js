import UpdatePassword from './UpdatePassword'
import EditProfile from './EditProfile'
import TabbedList from '../components/TabbedList'

const tags = ['general', 'seguridad'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'general') {
        return <EditProfile />
    } else if (currentTab === 'seguridad') {
        return <UpdatePassword />
    }
    return null;
}

const Profile = () => {
    return (
        <TabbedList
            tags={tags}
            defaultTag={'general'}
            name='Perfil'
        >
            <RenderList />
        </TabbedList>
    );
}

export default Profile