import Login from './components/Login'
import Register from './components/Register'
import {
    Route,
    BrowserRouter as Router
} from 'react-router-dom'

const App = () => (
    <Router>
        <Route path='/login'>
            <Login />
        </Route>
        <Route path='/register'>
            <Register />
        </Route>
    </Router>
)

export default App;
