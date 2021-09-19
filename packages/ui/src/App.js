import { Admin, Resource } from 'react-admin'
import { dataProvider, authProvider, browserHistory } from './providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
// Resources
import users from './users'
import trivias from './trivias'

const App = () => (
	<Admin
		dashboard={Dashboard}
		customRoutes={customRoutes}
		history={browserHistory}
		layout={Layout}
		dataProvider={dataProvider}
		loginPage={false}
		authProvider={authProvider}
	>
		<Resource {...users} />
		<Resource {...trivias} />
		<Resource name="profile" />
		<Resource name="update-password" />
		<Resource name="configurations/levels" />
		<Resource name="trivia-settings" />
		<Resource name="configurations/categories" />
	</Admin>
)

export default App;
