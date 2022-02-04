import * as React from 'react'
import ResetPassword from './components/ResetPassword'
import UpdatePassword from './components/UpdatePassword'
import {
    Route,
    Redirect,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom'
import LazyLoader from '@approbado/lib/components/LazyLoader'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { theme } from '@approbado/lib/styles';

const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'))
const PlansList = React.lazy(() => import('./components/PlansList'))

const App = () => {
    return (
        <ThemeProvider theme={createTheme(theme)}>
            <Router>
                <Switch>
                    <Route exact path='/login'>
                        <LazyLoader loader={true}>
                            <Login />
                        </LazyLoader>
                    </Route>
                    <Route path='/register'>
                        <LazyLoader loader={true}>
                            <Register />
                        </LazyLoader>
                    </Route>
                    <Route path='/reset-password'>
                        <ResetPassword />
                    </Route>
                    <Route path='/update-password'>
                        <UpdatePassword />
                    </Route>
                    <Route exact path='/' render={() => (<Redirect to="/login" />)} />
                </Switch>
                <Switch>
                    <LazyLoader loader={true}>
                        <Route path='/plans' render={() => <PlansList />} />
                    </LazyLoader>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

export default App;
