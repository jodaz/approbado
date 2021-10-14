import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'
import UpdatePassword from './components/UpdatePassword'
import {
    Route,
    Redirect,
    BrowserRouter as Router
} from 'react-router-dom'

const App = () => (
    <Router basename='/auth'>
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
    </Router>
)

export default App;
