import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import customReducers from '@approbado/lib/reducers'
import createAdminStore from '@approbado/lib/store'
import { Provider } from 'react-redux'
import { DataProviderContext, Resource } from 'react-admin'
import { dataProvider, history } from '@approbado/lib/providers'
import customSagas from '@approbado/lib/sagas'
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { theme } from '@approbado/lib/styles';

const Index = () => (
    <Provider
        store={createAdminStore({
            dataProvider,
            history,
            customReducers,
            customSagas
        })}
    >
        <DataProviderContext.Provider value={dataProvider}>
            <Resource name='comments' />
            <Resource name='forums' />
            <Resource name='notifications' />
            <Resource name='trivias' />
            <Resource name='files' />
            <Resource name='profile' />
            <Resource name='users' />
            <Resource name='comments' />
            <Resource name='like-posts' />
            <Resource name='report-reasons' />
            <Resource name="configurations/categories" />
            <Resource name="configurations/levels" />

            <ConnectedRouter history={history}>
                <ThemeProvider theme={createTheme(theme)}>
                    <App />
                </ThemeProvider>
            </ConnectedRouter>
        </DataProviderContext.Provider>
    </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
