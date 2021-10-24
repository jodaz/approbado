import * as React from 'react'
// Components
import PrivacySettings from './PrivacySettings'
import DeleteAccount from './DeleteAccount'
import NotificationSettings from './NotificationSettings'
import UpdatePassword from './UpdatePassword'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = ['Privacidad', 'Notificaciones', 'Cambiar contraseña', 'Eliminar cuenta'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'Privacidad') {
        return <PrivacySettings />
    } else if (currentTab === 'Eliminar cuenta') {
        return <DeleteAccount />
    } else if (currentTab === 'Notificaciones') {
        return <NotificationSettings />
    } else if (currentTab === 'Cambiar contraseña') {
        return <UpdatePassword />
    }

    return null;
}

const AccountSettings = () => (
    <TabbedList
        tags={tags}
        defaultTag='Privacidad'
        name='Configuraciones'
    >
        <RenderList />
    </TabbedList>
)

export default AccountSettings
