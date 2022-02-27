import * as React from 'react'
// Layout and theme
import Dashboard from './dashboard'
import { Switch, Route } from 'react-router-dom';
import Layout from './layouts'
import { Resource } from 'react-admin'
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

// Resources
import users from './users'
import reports from './reports'
import trivias from './trivias'
import forums from './forums'
import comments from './comments'

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
                    <Route path="/memberships/plans/create" render={() => <PlanCreate />} />,
                    <Route path="/memberships/plans/:id" render={() => <PlanEdit />} />,
                    <Route path="/configurations/levels/create" render={() => <LevelsCreate />} />,
                    <Route path="/configurations/categories/create" render={() => <CategoryCreate />} />,
                    <Route path="/configurations/categories/:id" render={() => <CategoryEdit />} />,
                    <Route path="/configurations/levels/:id" render={() => <LevelEdit />} />,
                    <Route path="/profile" render={() => <Profile />} />,
                    <Route path="/trivias/:trivia_id/subthemes/create" render={() => <SubthemeCreate />} />,
                    <Route path="/trivias/:trivia_id/awards/create" render={() => <AwardsCreate />} />,
                    <Route path="/trivias/:trivia_id/files/create" render={() => <FileCreate />} />,
                    <Route path="/trivias/:trivia_id/files/:file_id" render={() => <FileEdit />} />,
                    <Route path="/trivias/:trivia_id/awards/:award_id" render={() => <AwardEdit />} />,
                    <Route path="/trivias/:trivia_id/subthemes/:subtheme_id/show" render={() => <SubthemeShow />} />,
                    <Route path="/reset-password" render={() => <ResetPassword />} />,
                    <Route path="/error" render={() => <ErrorLayout />} />,
                    <Route path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/create" render={() => <QuestionsCreate />} />,
                    <Route path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/upload" render={() => <QuestionsUpload />} />,
                    <Route path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/:question_id" render={() => <QuestionEdit />} />,
                    <Route path="/update-password" render={() => <UpdatePassword />} />,

                    <Resource name="questions" />
                    <Resource name="awards" />
                    <Resource name="files" />
                    <Resource name="subthemes" />
                    <Resource name="profile" />
                    <Resource name="update-password" />
                    <Resource name="blacklisted-users" />
                    <Resource name="configurations/levels" />
                    <Resource name="configurations/categories" />
                    <Resource name="memberships/plans" />
                    <Resource name="memberships/payments" />
                </Switch>
            </Layout>
        </Switch>
    )
}

export default App;
