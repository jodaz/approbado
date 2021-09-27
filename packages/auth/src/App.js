import Login from './components/Login'
import Register from './components/Register'
import {
    Route,
    BrowserRouter as Router
} from 'react-router-dom'

const App = () => {
    console.log("OK")
    return (
        <Router basename='/auth'>
            <Route exact path='/login'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
        </Router>
    )
}

export default App;
