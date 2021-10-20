import { Admin, Resource } from 'react-admin'
import { dataProvider, authProvider, browserHistory } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
// Resources
import users from './users'
import trivias from './trivias'
import Login from './layouts/Login'

const App = () => (
	<Admin
		dashboard={Dashboard}
		customRoutes={customRoutes}
		history={browserHistory}
		layout={Layout}
		dataProvider={dataProvider}
		loginPage={Login}
		authProvider={authProvider('admin')}
	>
		<Resource {...users} />
		<Resource {...trivias} />
		<Resource name="profile" />
		<Resource name="update-password" />
		<Resource name="configurations/levels" />
		<Resource name="configurations/categories" />
		<Resource name="memberships/plans" />
		<Resource name="memberships/payments" />
	</Admin>
)

export default App;
