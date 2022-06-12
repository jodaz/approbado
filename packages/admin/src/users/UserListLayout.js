import * as React from 'react'
// Components
import Admin from '../layouts/Admin'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Registrados',
        pathname: '/users/clients'
    },
    {
        name: 'Moderadores',
        pathname: '/users/admins'
    },
]

const UserListLayout = ({ children }) => (
    <Admin>
        <TabbedList
            tags={tags}
            name='Usuarios'
        />
        {children}
    </Admin>
)

export default UserListLayout
