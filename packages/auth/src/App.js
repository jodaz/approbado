import { Admin, Resource } from 'react-admin'
import users from './users'
import { dataProvider, authProvider, browserHistory } from './providers'
import Layout from './layouts'
import Login from './layouts/Login'
import customRoutes from './routes'

const App = () => (
	<Admin
		customRoutes={customRoutes}
		history={browserHistory}
		layout={Layout}
		dataProvider={dataProvider}
	>
		<Resource {...users} />
		<Resource name="configurations/levels" />
		<Resource name="trivia-settings" />
		<Resource name="configurations/categories" />
	</Admin>
)

export default App;
