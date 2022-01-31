import * as React from 'react'
import { AdminUI, Resource } from 'react-admin'
import Layout from './layouts'
import Dashboard from './dashboard'
// Resources
import users from './users'
import reports from './reports'
import trivias from './trivias'
import Login from './layouts/Login'
import { useRedirectIfAuthenticated } from '@approbado/lib/hooks/useRedirectIfAuthenticated'
import Spinner from '@approbado/lib/components/Spinner';
import { history } from '@approbado/lib/providers'
import routes from './routes'
import forums from './forums'

const App = () => {
    // const { redirect, isAuthenticated } = useRedirectIfAuthenticated([
    //     '/login',
    //     '/reset-password',
    //     '/update-password',
    //     '/error'
    // ])

    // React.useEffect(() => {
    //     if (!isAuthenticated && !redirect) {
    //         history.push('/login')
    //     }
    // }, [])

    // if (!isAuthenticated && !redirect) return <Spinner />

    return (
        <AdminUI
            layout={Layout}
            dashboard={Dashboard}
            loginPage={Login}
            customRoutes={routes}
        >
            <Resource {...users} />
            <Resource {...trivias} />
            <Resource {...forums} />
            <Resource {...reports} />
            <Resource name="questions" />
            <Resource name="awards" />
            <Resource name="files" />
            <Resource name="subthemes" />
            <Resource name="profile" />
            <Resource name="update-password" />
            <Resource name="configurations/levels" />
            <Resource name="configurations/categories" />
            <Resource name="memberships/plans" />
            <Resource name="memberships/payments" />
        </AdminUI>
    )
}

export default App;
