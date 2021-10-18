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

const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'))
const PlansList = React.lazy(() => import('./components/PlansList'))

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <LazyLoader >
                        <Login />
                    </LazyLoader>
                </Route>
                <Route path='/register'>
                    <LazyLoader >
                        <Register />
                    </LazyLoader>
                </Route>
                <Route path='/reset-password'>
                    <ResetPassword />
                </Route>
                <Route path='/update-password/:token'>
                    <UpdatePassword />
                </Route>
                <Route exact path='/' render={() => (<Redirect to="/login" />)} />
            </Switch>
            <Switch>
                <LazyLoader >
                    <Route path='/plans' render={() => <PlansList />} />
                </LazyLoader>
            </Switch>
        </Router>
    )
}

export default App;
