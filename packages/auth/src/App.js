import Login from './components/Login'
import Register from './components/Register'
import ResetPassword from './components/ResetPassword'
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
        <Route exact path='/' render={() => (<Redirect to="/login" />)} />
    </Router>
)

export default App;
