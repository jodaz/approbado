import { Admin, Resource } from 'react-admin'
import users from './users'
import apiProvider from 'ra-laravel-client'
import Layout from './layouts'
import { createBrowserHistory as createHistory } from 'history';

const history = createHistory()
const dataProvider = apiProvider('http://localhost:4000/api')

const App = () => (
	<Admin
		history={history}
		layout={Layout}
		dataProvider={dataProvider}
	>
		<Resource {...users} />
	</Admin>
)

export default App;
