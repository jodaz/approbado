import Authenticate from '@approbado/lib/layouts/Authenticate'
import Account from './account';
import Profile from './profile';
import { RouteWithoutLayout } from 'ra-core';
import { Route } from 'react-router-dom'

export default [
    <RouteWithoutLayout path='/auth' render={() => <Authenticate />} />,
    <Route exact path="/account" render={() => <Account />} />,
    <Route exact path="/profile" render={() => <Profile />} />,
];
