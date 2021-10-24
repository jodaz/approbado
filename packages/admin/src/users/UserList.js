import * as React from 'react'
// Components
import RegisteredUsersList from './RegisteredUsersList'
import AdminUsersList from './AdminUsersList'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Registrados',
        pathname: 'registered',
        component: <RegisteredUsersList />
    },
    {
        name: 'Moderadores',
        pathname: 'admins',
        component: <AdminUsersList />
    },
]

const UserList = () => (
    <TabbedList
        tags={tags}
        name='Usuarios'
    />
)

export default UserList
