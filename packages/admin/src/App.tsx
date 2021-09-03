import { Admin, Resource } from 'react-admin'
import users from './users'
import apiProvider from 'ra-laravel-client'
import Layout from './layouts'

const dataProvider = apiProvider('http://localhost:4000/api')

const App = () => (
	<Admin
		layout={Layout}
		dataProvider={dataProvider}
	>
		<Resource {...users} />
	</Admin>
)

export default App;
