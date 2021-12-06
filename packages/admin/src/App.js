import { Admin, Resource } from 'react-admin'
import { dataProvider, authProvider } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
import createAdminStore from '@approbado/lib/store'
// Resources
import users from './users'
import reports from './reports'
import trivias from './trivias'
import Login from './layouts/Login'
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => (
    <Provider
        store={createAdminStore({
                authProvider,
                dataProvider,
                history
        })}
    >
        <AAdmin />
    </Provider>
)

const AAdmin = () => (
	<Admin
		dashboard={Dashboard}
		customRoutes={customRoutes}
		history={history}
		layout={Layout}
		dataProvider={dataProvider}
		loginPage={Login}
		authProvider={authProvider('admin')}
	>
		<Resource {...users} />
		<Resource {...trivias} />
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
	</Admin>
)

export default App;
