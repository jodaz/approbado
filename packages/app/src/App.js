import * as React from 'react'
import { AdminUI, Resource } from 'react-admin'
import { dataProvider } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
// Other resources
import forums from './forums'
import notifications from './notifications'
import { useAuthState, useAuthDispatch } from '@approbado/lib/hooks/useAuthState'

const AppLayout = () => {
    const { authenticated } = useAuthState();
    const { fetchUser } = useAuthDispatch();

    React.useEffect(() => {
        if (!authenticated) fetchUser();
    }, [authenticated]);

    return (
        <AdminUI
            dashboard={Dashboard}
            layout={Layout}
            customRoutes={customRoutes}
            dataProvider={dataProvider}
            loginPage={false}
        >
            <Resource {...forums} />
            <Resource {...notifications} />
            <Resource name='trivias' />
            <Resource name="configurations/categories" />
            <Resource name="configurations/levels" />
        </AdminUI>
    )
}

export default AppLayout;
