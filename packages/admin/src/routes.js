import { Route } from 'react-router-dom';
import Configurations from './configurations/Configurations';
import LevelsCreate from './configurations/LevelsCreate'
import CategoryCreate from './configurations/CategoryCreate'
import CategoryEdit from './configurations/CategoryEdit'
import LevelEdit from './configurations/LevelEdit'
import Authenticate from '@approbado/lib/layouts/Authenticate'
import Profile from './profile'
import { RouteWithoutLayout } from 'ra-core';
import Memberships from './memberships/Memberships';
import PlanCreate from './memberships/PlanCreate';
import PlanEdit from './memberships/PlanEdit';

export default [
    <Route exact path="/configurations" render={() => <Configurations />} />,
    <Route exact path="/memberships" render={() => <Memberships />} />,
    <Route
        path="/memberships/plans/create"
        render={() => <PlanCreate />}
    />,
    <Route
        path="/memberships/plans/:id"
        render={() => <PlanEdit />}
    />,
    <Route
        path="/configurations/levels/create"
        render={() => <LevelsCreate />}
    />,
    <Route
        path="/configurations/categories/create"
        render={() => <CategoryCreate />}
    />,
    <Route
        path="/configurations/categories/:id"
        render={() => <CategoryEdit />}
    />,
    <Route
        path="/configurations/levels/:id"
        render={() => <LevelEdit />}
    />,
    <RouteWithoutLayout
        path='/auth/:auth'
        render={() => <Authenticate />}
    />,
    <Route
        path="/profile"
        render={() => <Profile />}
    />,
];

