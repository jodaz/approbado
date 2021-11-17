import { Admin, Resource } from 'react-admin'
import { dataProvider, authProvider, browserHistory } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
import customReducers from '@approbado/lib/reducers'

// Other resources
import forums from './forums'

const App = () => (
	<Admin
		dashboard={Dashboard}
		history={browserHistory}
		layout={Layout}
		customRoutes={customRoutes}
		dataProvider={dataProvider}
		loginPage={false}
		authProvider={authProvider('app')}
        customReducers={customReducers}
	>
        <Resource {...forums} />
        <Resource name='trivias' />
        <Resource name="configurations/categories" />
        <Resource name="configurations/levels" />
	</Admin>
)

export default App;
