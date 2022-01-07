import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import customReducers from '@approbado/lib/reducers'
import createAdminStore from '@approbado/lib/store'
import customRoutes from './routes'
import { Provider } from 'react-redux'
import { AdminContext } from 'react-admin'
import { dataProvider, authProvider, history } from '@approbado/lib/providers'
import customSagas from '@approbado/lib/sagas'

const Index = () => (
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
            customReducers,
            customSagas
        })}
    >
        <AdminContext
            dataProvider={dataProvider}
            history={history}
            authProvider={authProvider('admin')}
            customRoutes={customRoutes}
        >
            <App />
        </AdminContext>
    </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
