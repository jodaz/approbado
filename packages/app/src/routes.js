import Authenticate from '@approbado/lib/layouts/Authenticate'
import Account from './account';
import Profile from './profile';
import { RouteWithoutLayout } from 'ra-core';
import { Route } from 'react-router-dom'
import TriviaList from './trivias/TriviaList'
import StartTrivia from './trivias/StartTrivia'
import ErrorLayout from '@approbado/lib/layouts/Error'
import UserProfile from '@approbado/lib/layouts/profile/UserProfile'

export default [
    <RouteWithoutLayout path='/auth' render={() => <Authenticate />} />,
    <Route exact path="/account" render={() => <Account />} />,
    <Route exact path="/users/:id/show" render={() => <UserProfile />} />,
    <Route exact path="/profile" render={() => <Profile />} />,
    <Route exact path="/trivias" render={() => <TriviaList />} />,
    <Route exact path="/trivias/start" render={() => <StartTrivia />} />,
    <RouteWithoutLayout
        path="/error"
        render={() => <ErrorLayout />}
    />,
];
