import * as React from 'react'
// Layout and theme
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from '@approbado/lib/components/ProtectedRoute';
import Layout from './layouts/Admin'
// Components
import Dashboard from './dashboard'
import Login from './auth/Login'
import Configurations from './configurations/Configurations';
import LevelsCreate from './configurations/LevelsCreate'
import CategoryCreate from './configurations/CategoryCreate'
import CategoryEdit from './configurations/CategoryEdit'
import LevelEdit from './configurations/LevelEdit'
import Profile from './profile'
import Memberships from './memberships/Memberships';
import PlanCreate from './memberships/PlanCreate';
import PlanEdit from './memberships/PlanEdit';
import ResetPassword from './auth/ResetPassword';
import ErrorLayout from '@approbado/lib/layouts/Error'
import UpdatePassword from './auth/UpdatePassword';
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
import UserList from './users/UserList'
import UserEdit from './users/UserEdit'
import ReportsView from './reports/ReportsView'
import ReportShow from './reports/ReportShow'
import NotFound from './layouts/NotFound'

const App = () => {
    return (
        <Switch>
            <Route exact path='/login' render={() => <Login />} />
            <Route exact path="/reset-password" render={() => <ResetPassword />} />
            <Route exact path="/update-password" render={() => <UpdatePassword />} />

            <ProtectedRoute layout={Layout} exact path="/" component={() => <Dashboard />} />
            <ProtectedRoute layout={Layout} exact path="/reports/users/:id/show" component={() => <BlacklistedUserShow />} />
            <ProtectedRoute layout={Layout} exact path="/profile" component={() => <Profile />} />
            <ProtectedRoute layout={Layout} exact path="/error" component={() => <ErrorLayout />} />

            {/**
             * Reports
             */}
            <ProtectedRoute layout={Layout} exact path='/reports' component={(routeProps) =>
                <ReportsView
                    resource="reports"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path='/reports/:id' component={(routeProps) =>
                <ReportShow
                    resource="reports"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />

            {/**
             * Users
             */}
            <ProtectedRoute layout={Layout} exact path='/users' component={(routeProps) =>
                <UserList
                    resource="users"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path="/users/:id/show" component={() => <UserProfile />} />
            <ProtectedRoute layout={Layout} exact path='/users/:id' component={(routeProps) =>
                <UserEdit
                    resource="users"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />

            {/**
             * Plans and memberships
             */}
            <ProtectedRoute layout={Layout} exact path="/memberships" component={() => <Memberships />} />
            <ProtectedRoute layout={Layout} exact path="/memberships/plans/create" component={() => <PlanCreate />} />
            <ProtectedRoute layout={Layout} exact path="/memberships/plans/:id" component={(routeProps) =>
                <PlanEdit
                    resource="memberships/plans"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />

            {/**
             * Settings
             */}
            <ProtectedRoute layout={Layout} exact path="/configurations" component={() => <Configurations />} />
            <ProtectedRoute layout={Layout} exact path="/configurations/levels/create" component={() => <LevelsCreate />} />
            <ProtectedRoute layout={Layout} exact path="/configurations/categories/create" component={() => <CategoryCreate />} />
            <ProtectedRoute layout={Layout} exact path="/configurations/categories/:id" component={(routeProps) =>
                <CategoryEdit
                    resource="configurations/categories"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
            <ProtectedRoute layout={Layout} exact path="/configurations/levels/:id" component={(routeProps) =>
                <LevelEdit
                    resource="configurations/levels"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />

            {/**
             * Trivias
             */}
            <ProtectedRoute layout={Layout} exact path='/trivias' component={(routeProps) =>
                <TriviaList
                    resource="trivias"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/create" component={() => <QuestionsCreate />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/upload" component={() => <QuestionsUpload />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/:question_id" component={() => <QuestionEdit />} />
            <ProtectedRoute layout={Layout} exact path='/trivias/create' component={() => <TriviaCreate />} />
            <ProtectedRoute layout={Layout} exact path='/trivias/:id/show' component={(routeProps) =>
                <TriviaShow
                    resource="trivias"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/subthemes/create" component={() => <SubthemeCreate />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/awards/create" component={() => <AwardsCreate />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/files/create" component={() => <FileCreate />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/files/:file_id" component={() => <FileEdit />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/awards/:award_id" component={() => <AwardEdit />} />
            <ProtectedRoute layout={Layout} exact path="/trivias/:trivia_id/subthemes/:subtheme_id/show" component={(routeProps) =>
                <SubthemeShow
                    resource="trivias"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
            <Route path='/*' render={() => <NotFound />} />
        </Switch>
    )
}

export default App;
