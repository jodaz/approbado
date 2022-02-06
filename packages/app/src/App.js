import * as React from 'react'
import { AdminUI, Resource } from 'react-admin'
import { dataProvider } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
// Other resources
import forums from './forums'
import notifications from './notifications'
import comments from './comments'

const AppLayout = () => (
    <AdminUI
        dashboard={Dashboard}
        layout={Layout}
        customRoutes={customRoutes}
        dataProvider={dataProvider}
        loginPage={false}
        disableTelemetry
    >
        <Resource {...comments} />
        <Resource {...forums} />
        <Resource {...notifications} />
        <Resource name='trivias' />
        <Resource name='files' />
        <Resource name='users' />
        <Resource name='comments' />
        <Resource name='report-reasons' />
        <Resource name="configurations/categories" />
        <Resource name="configurations/levels" />
    </AdminUI>
)

export default AppLayout;
