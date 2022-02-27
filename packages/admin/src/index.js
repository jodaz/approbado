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
            <Resource name="configurations/levels" intent="registration" />
            <Resource name="configurations/categories" intent="registration" />
            <Resource name='trivias' intent='registration' />
            <Resource name='files' intent='registration' />
            <Resource name='awards' intent='registration' />
            <Resource name='subthemes' intent='registration' />
            <Resource name='questions' intent='registration' />
            <Resource name='profile' intent='registration' />
            <Resource name='users' intent='registration' />
            <Resource name='forums' intent='registration' />
            <Resource name='comments' intent='registration' />
            <Resource name='report-reasons' intent='registration' />
            <Resource name="configurations/categories" intent='registration' />
            <Resource name="configurations/levels" intent='registration' />
            <Resource name="blacklisted-users" intent="registration" />
            <Resource name="memberships/payments" intent="registration" />
            <Resource name="memberships/plans" intent="registration" />

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
