import * as React from 'react'
// Components
import Admin from '../layouts/Admin'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Registrados',
        pathname: 'clients'
    },
    {
        name: 'Moderadores',
        pathname: 'admins'
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
