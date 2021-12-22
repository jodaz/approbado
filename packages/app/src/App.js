import { Admin, Resource } from 'react-admin'
import { dataProvider, authProvider } from '@approbado/lib/providers'
import Layout from './layouts'
import customRoutes from './routes'
import Dashboard from './dashboard'
import customReducers from '@approbado/lib/reducers'
// Other resources
import forums from './forums'
import notifications from './notifications'
import { Provider } from 'react-redux'
import { createBrowserHistory } from "history"
import createAdminStore from '@approbado/lib/store'

const history = createBrowserHistory();

const App = () => (
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
            customReducers
        })}
    >
        <AppLayout />
    </Provider>
)

const AppLayout = () => (
	<Admin
		dashboard={Dashboard}
		history={history}
		layout={Layout}
		customRoutes={customRoutes}
		dataProvider={dataProvider}
		loginPage={false}
		authProvider={authProvider('app')}
        customReducers={customReducers}
	>
        <Resource {...forums} />
        <Resource {...notifications} />
        <Resource name='trivias' />
        <Resource name="configurations/categories" />
        <Resource name="configurations/levels" />
	</Admin>
)

export default App;
