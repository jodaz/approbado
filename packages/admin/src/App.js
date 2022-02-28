import * as React from 'react'
// Layout and theme
import Dashboard from './dashboard'
import { Switch, Route } from 'react-router-dom';
import Layout from './layouts'
// Components
import Login from './layouts/Login'
import Configurations from './configurations/Configurations';
import LevelsCreate from './configurations/LevelsCreate'
import CategoryCreate from './configurations/CategoryCreate'
import CategoryEdit from './configurations/CategoryEdit'
import LevelEdit from './configurations/LevelEdit'
import Profile from './profile'
import Memberships from './memberships/Memberships';
import PlanCreate from './memberships/PlanCreate';
import PlanEdit from './memberships/PlanEdit';
import ResetPassword from './layouts/ResetPassword';
import ErrorLayout from '@approbado/lib/layouts/Error'
import UpdatePassword from './layouts/UpdatePassword';
import SubthemeCreate from './subthemes/SubthemeCreate'
import SubthemeShow from './subthemes/SubthemeShow';
import AwardsCreate from './awards/AwardsCreate'
import FileCreate from './files/FileCreate'
import FileEdit from './files/FileEdit'
import QuestionsCreate from './questions/QuestionCreate'
import UserProfile from '@approbado/lib/layouts/profile/UserProfile'
import QuestionsUpload from './questions/QuestionsUpload'
import BlacklistedUserShow from './blacklistedUsers/BlacklistedUserShow'
import QuestionEdit from './questions/QuestionEdit'
import AwardEdit from './awards/AwardEdit'
import TriviaCreate from './trivias/TriviaCreate';
import TriviaShow from './trivias/TriviaShow';
import TriviaList from './trivias/TriviaList';

import ProtectedRoute from '@approbado/lib/components/ProtectedRoute';

const App = () => {
    return (
        <Switch>
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path="/reset-password" render={() => <ResetPassword />} />,
            <Route exact path="/update-password" render={() => <UpdatePassword />} />,

            <Layout>
                <Switch>
                    <ProtectedRoute exact path="/" component={() => <Dashboard />} />
                    <ProtectedRoute exact path="/configurations" component={() => <Configurations />} />,
                    <ProtectedRoute exact path="/memberships" component={() => <Memberships />} />,
                    <ProtectedRoute exact path="/users/:id/show" component={() => <UserProfile />} />,
                    <ProtectedRoute exact path="/reports/users/:id/show" component={() => <BlacklistedUserShow />} />,
                    <ProtectedRoute exact path="/memberships/plans/create" component={() => <PlanCreate />} />,
                    <ProtectedRoute exact path="/memberships/plans/:id" component={() => <PlanEdit />} />,
                    <ProtectedRoute exact path="/configurations/levels/create" component={() => <LevelsCreate />} />,
                    <ProtectedRoute exact path="/configurations/categories/create" component={() => <CategoryCreate />} />,
                    <ProtectedRoute exact path="/configurations/categories/:id" component={() => <CategoryEdit />} />,
                    <ProtectedRoute exact path="/configurations/levels/:id" component={() => <LevelEdit />} />,
                    <ProtectedRoute exact path="/profile" component={() => <Profile />} />,
                    <ProtectedRoute exact path="/error" component={() => <ErrorLayout />} />,

                    {/**
                     * Trivias
                     */}
                    <ProtectedRoute exact path='/trivias' component={(routeProps) =>
                        <TriviaList
                            resource="trivias"
                            basePath={routeProps.match.url}
                        />}
                    />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/create" component={() => <QuestionsCreate />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/upload" component={() => <QuestionsUpload />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/:question_id" component={() => <QuestionEdit />} />,
                    <ProtectedRoute exact path='/trivias/create' component={() => <TriviaCreate />} />,
                    <ProtectedRoute exact path='/trivias/:id/show' component={(routeProps) =>
                        <TriviaShow
                            resource="trivias"
                            basePath={routeProps.match.url}
                            id={decodeURIComponent((routeProps.match).params.id)}
                            {...routeProps}
                        />
                    } />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/subthemes/create" component={() => <SubthemeCreate />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/awards/create" component={() => <AwardsCreate />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/files/create" component={() => <FileCreate />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/files/:file_id" component={() => <FileEdit />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/awards/:award_id" component={() => <AwardEdit />} />,
                    <ProtectedRoute exact path="/trivias/:trivia_id/subthemes/:subtheme_id/show" component={(routeProps) =>
                        <SubthemeShow
                            resource="trivias"
                            basePath={routeProps.match.url}
                            id={decodeURIComponent((routeProps.match).params.id)}
                            {...routeProps}
                        />
                    } />,
                </Switch>
            </Layout>
        </Switch>
    )
}

export default App;
