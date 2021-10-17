import PlansList from './components/PlansList'
import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'
import UpdatePassword from './components/UpdatePassword'
import {
    Route,
    Redirect,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
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
                <Route path='/plans' render={() => <PlansList />} />
            </Switch>
        </Router>
    )
}

export default App;
