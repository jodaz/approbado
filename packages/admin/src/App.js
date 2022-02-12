import * as React from 'react'
import { AdminUI, Resource } from 'react-admin'
import Layout from './layouts'
import Dashboard from './dashboard'
// Resources
import users from './users'
import reports from './reports'
import trivias from './trivias'
import Login from './layouts/Login'
import routes from './routes'
import forums from './forums'
import comments from './comments'

const App = () => {
    return (
        <AdminUI
            layout={Layout}
            dashboard={Dashboard}
            loginPage={Login}
            customRoutes={routes}
            disableTelemetry
        >
            <Resource {...users} />
            <Resource {...trivias} />
            <Resource {...forums} />
            <Resource {...reports} />
            <Resource {...comments} />
            <Resource name="questions" />
            <Resource name="awards" />
            <Resource name="files" />
            <Resource name="subthemes" />
            <Resource name="profile" />
            <Resource name="update-password" />
            <Resource name="blacklisted-users" />
            <Resource name="configurations/levels" />
            <Resource name="configurations/categories" />
            <Resource name="memberships/plans" />
            <Resource name="memberships/payments" />
        </AdminUI>
    )
}

export default App;
