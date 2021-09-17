import * as React from 'react'
// Components
import RegisteredUsersList from './RegisteredUsersList'
import AdminUsersList from './AdminUsersList'
import TabbedList from '../components/TabbedList'

const tags = ['registrados', 'moderadores'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'registrados') {
        return <RegisteredUsersList />
    } else if (currentTab === 'moderadores') {
        return <AdminUsersList />
    }
    return null;
}

const UserList = () => (
    <TabbedList
        tags={tags}
        defaultTag={'registrados'}
        name='Usuarios'
    >
        <RenderList />
    </TabbedList>
)

export default UserList
