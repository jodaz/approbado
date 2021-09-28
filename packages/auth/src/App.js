import Login from './components/Login'
import Register from './components/Register'
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
        <Redirect to="/login" />
    </Router>
)

export default App;
