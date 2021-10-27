import * as React from 'react'
// Components
import PrivacySettings from './PrivacySettings'
import DeleteAccount from './DeleteAccount'
import NotificationSettings from './NotificationSettings'
import UpdatePassword from '@approbado/lib/layouts/UpdatePassword'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Privacidad',
        pathname: 'privacy',
        component: <PrivacySettings />
    },
    {
        name: 'Notificaciones',
        pathname: 'notifications',
        component: <NotificationSettings />
    },
    {
        name: 'Cambiar contraseña',
        pathname: 'update password',
        component: <UpdatePassword />
    },
    {
        name: 'Eliminar cuenta',
        pathname: 'delete account',
        component: <DeleteAccount />
    },
]

const AccountSettings = () => (
    <TabbedList
        tags={tags}
        defaultTag='privacy'
        name='Configuraciones'
    />
)

export default AccountSettings
