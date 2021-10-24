import * as React from 'react'
// Components
import RegisteredUsersList from './RegisteredUsersList'
import AdminUsersList from './AdminUsersList'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = ['Registrados', 'Moderadores'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'Registrados') {
        return <RegisteredUsersList />
    } else if (currentTab === 'Moderadores') {
        return <AdminUsersList />
    }
    return null;
}

const UserList = () => (
    <TabbedList
        tags={tags}
        defaultTag={'Registrados'}
        name='Usuarios'
    >
        <RenderList />
    </TabbedList>
)

export default UserList
