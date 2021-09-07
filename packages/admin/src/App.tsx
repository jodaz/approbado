import { Admin, Resource } from 'react-admin'
import users from './users'
import { dataProvider, authProvider } from './providers'
import Layout from './layouts'
import Login from './layouts/Login'
import { createBrowserHistory as createHistory } from 'history';

// Other providers
export const history = createHistory()

const App = () => (
	<Admin
		history={history}
		layout={Layout}
		authProvider={authProvider}
		dataProvider={dataProvider}
		loginPage={Login}
	>
		<Resource {...users} />
	</Admin>
)

export default App;
