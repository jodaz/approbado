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

const App = () => {
    return (
        <Switch>
            <Route exact path='/login' render={() => <Login />} />
            <Layout>
                <Switch>
                    <Route exact path="/" render={() => <Dashboard />} />
                    <Route exact path="/configurations" render={() => <Configurations />} />,
                    <Route exact path="/memberships" render={() => <Memberships />} />,
                    <Route exact path="/users/:id/show" render={() => <UserProfile />} />,
                    <Route exact path="/reports/users/:id/show" render={() => <BlacklistedUserShow />} />,
                    <Route exact path="/memberships/plans/create" render={() => <PlanCreate />} />,
                    <Route exact path="/memberships/plans/:id" render={() => <PlanEdit />} />,
                    <Route exact path="/configurations/levels/create" render={() => <LevelsCreate />} />,
                    <Route exact path="/configurations/categories/create" render={() => <CategoryCreate />} />,
                    <Route exact path="/configurations/categories/:id" render={() => <CategoryEdit />} />,
                    <Route exact path="/configurations/levels/:id" render={() => <LevelEdit />} />,
                    <Route exact path="/profile" render={() => <Profile />} />,
                    <Route exact path="/reset-password" render={() => <ResetPassword />} />,
                    <Route exact path="/update-password" render={() => <UpdatePassword />} />,
                    <Route exact path="/error" render={() => <ErrorLayout />} />,

                    {/**
                     * Trivias
                     */}
                    <Route exact path='/trivias' render={(routeProps) =>
                        <TriviaList
                            resource="trivias"
                            basePath={routeProps.match.url}
                        />}
                    />,
                    <Route exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/create" render={() => <QuestionsCreate />} />,
                    <Route exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/upload" render={() => <QuestionsUpload />} />,
                    <Route exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/:question_id" render={() => <QuestionEdit />} />,
                    <Route exact path='/trivias/create' render={() => <TriviaCreate />} />,
                    <Route exact path='/trivias/:id/show' render={(routeProps) =>
                        <TriviaShow
                            resource="trivias"
                            basePath={routeProps.match.url}
                            id={decodeURIComponent((routeProps.match).params.id)}
                            {...routeProps}
                        />
                    } />,
                    <Route exact path="/trivias/:trivia_id/subthemes/create" render={() => <SubthemeCreate />} />,
                    <Route exact path="/trivias/:trivia_id/awards/create" render={() => <AwardsCreate />} />,
                    <Route exact path="/trivias/:trivia_id/files/create" render={() => <FileCreate />} />,
                    <Route exact path="/trivias/:trivia_id/files/:file_id" render={() => <FileEdit />} />,
                    <Route exact path="/trivias/:trivia_id/awards/:award_id" render={() => <AwardEdit />} />,
                    <Route exact path="/trivias/:trivia_id/subthemes/:subtheme_id/show" render={(routeProps) =>
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
