import { Admin, Resource } from 'react-admin'
import users from './users'
import apiProvider from 'ra-laravel-client'

const dataProvider = apiProvider('http://localhost:4000/api')

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource {...users} />
  </Admin>
)

export default App;
