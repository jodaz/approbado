import { Admin } from 'react-admin'
import { dataProvider, authProvider, browserHistory } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'

const App = () => (
	<Admin
		dashboard={Dashboard}
		history={browserHistory}
		layout={Layout}
		customRoutes={customRoutes}
		dataProvider={dataProvider}
		loginPage={false}
		authProvider={authProvider('app')}
	>
        <></>
	</Admin>
)

export default App;
