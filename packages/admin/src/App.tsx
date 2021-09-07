import { Admin, Resource } from 'react-admin'
import users from './users'
import { dataProvider, authProvider } from './providers'
import Layout from './layouts'
import Login from './layouts/Login'
import customRoutes from './routes'
import { createBrowserHistory as createHistory } from 'history';

// Other providers
export const history = createHistory()

const App = () => (
	<Admin
		customRoutes={customRoutes}
		history={history}
		layout={Layout}
		dataProvider={dataProvider}
	>
		<Resource {...users} />
	</Admin>
)

export default App;
