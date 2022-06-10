import * as React from 'react'
// Layout and theme
import { Switch, Route, Redirect } from 'react-router-dom'
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
import UpdateProfilePassword from '@approbado/lib/layouts/UpdatePassword'
import ProfileEdit from './profile/EditProfile'
import Memberships from './memberships/Memberships';
import PlanCreate from './memberships/PlanCreate';
import PlanEdit from './memberships/PlanEdit';
import ResetPassword from './auth/ResetPassword';
import ErrorLayout from '@approbado/lib/layouts/Error'
import UpdatePassword from './auth/UpdatePassword';
import SubthemeCreate from './subthemes/SubthemeCreate'
import SubthemeShow from './subthemes/SubthemeShow';
import SubthemeEdit from './subthemes/SubthemeEdit';
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
import TriviaShowLayout from './trivias/TriviaShow';
import TriviaList from './trivias/TriviaList';
import UserListLayout from './users/UserListLayout'
import UserEdit from './users/UserEdit'
import UserCreate from './users/UserCreate'
import ReportsView from './reports/ReportsView'
import ReportShow from './reports/ReportShow'
import NotFound from './layouts/NotFound'
import ForumShow from '@approbado/lib/layouts/forums/ForumShow'
import ForumEdit from '@approbado/lib/layouts/forums/ForumEdit'
import ForumsView from '@approbado/lib/layouts/forums/ForumsView'
import CommentShow from '@approbado/lib/layouts/comments/CommentShow'
import LevelList from './configurations/LevelsList';
import CategoryList from './configurations/CategoryList';
import PaymentsList from './memberships/PaymentsList';
import PlansList from './memberships/PlansList';
import AdminUsersList from './users/AdminUsersList'
import RegisteredUsersList from './users/RegisteredUsersList'
import RecentReports from './components/RecentReports'
import RestrictedUsers from './restrictedUsers'
import BlacklistedUsers from './blacklistedUsers'
import TriviaEdit from './trivias/TriviaEdit'
import SubthemesList from './subthemes/SubthemesList'
import AwardsList from './awards/AwardsList'
import FilesList from './files/FilesList'
import QuestionsList from './questions/QuestionsList'

const App = () => {
    return (
        <Switch>
            <Route
                exact
                path='/login'
                render={() => <Login />}
            />
            <Route
                exact
                path="/reset-password"
                render={() => <ResetPassword />}
            />
            <Route
                exact
                path="/update-password"
                render={() => <UpdatePassword />}
            />

            <ProtectedRoute
                layout={Layout}
                exact
                path="/"
                component={() => <Dashboard />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/reports/users/:id/show"
                component={() => <BlacklistedUserShow />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/profile"
                component={() => <Profile />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/error"
                component={() => <ErrorLayout />}
            />
            {/**
             * Account
             */}
            <Redirect exact from='/profile' to='/profile/about' />
            <ProtectedRoute
                layout={Profile}
                exact
                path="/profile/about"
                component={() => <ProfileEdit />}
            />
            <ProtectedRoute
                layout={Profile}
                exact
                path="/profile/security"
                component={() => <UpdateProfilePassword />}
            />

            {/**
             * Reports
             */}
            <Redirect exact from='/reports' to='/reports/recent' />
            <ProtectedRoute
                layout={ReportsView}
                exact
                path="/reports/recent"
                component={() => <RecentReports />}
            />
            <ProtectedRoute
                layout={ReportsView}
                exact
                path="/reports/blacklisted"
                component={() => <BlacklistedUsers />}
            />
            <ProtectedRoute
                layout={ReportsView}
                exact
                path="/reports/restricted"
                component={() => <RestrictedUsers />}
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
            <Redirect exact from='/users' to='/users/clients' />
            <ProtectedRoute
                layout={UserListLayout}
                exact
                path="/users/clients"
                component={() => <RegisteredUsersList />}
            />
            <ProtectedRoute
                layout={UserListLayout}
                exact
                path="/users/admins"
                component={() => <AdminUsersList />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path='/users/create'
                component={() => <UserCreate />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/users/:id/show"
                component={() => <UserProfile />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path='/users/:id'
                component={(routeProps) =>
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
            <Redirect exact from='/memberships' to='/memberships/payments' />
            <ProtectedRoute
                layout={Memberships}
                exact
                path="/memberships/payments"
                component={() => <PaymentsList />}
            />
            <ProtectedRoute
                layout={Memberships}
                exact
                path="/memberships/plans"
                component={() => <PlansList />}
            />
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
            <Redirect exact from='/configurations' to='/configurations/categories' />
            <ProtectedRoute
                layout={Configurations}
                exact
                path="/configurations/levels"
                component={() => <LevelList />}
            />
            <ProtectedRoute
                layout={Configurations}
                exact
                path="/configurations/categories"
                component={() => <CategoryList />}
            />
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
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/create"
                component={() => <QuestionsCreate />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/upload"
                component={() => <QuestionsUpload />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/subthemes/:subtheme_id/questions/:question_id"
                component={() => <QuestionEdit />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path='/trivias/create'
                component={() => <TriviaCreate />}
            />
            <ProtectedRoute
                layout={TriviaShowLayout}
                exact
                path='/trivias/:id'
                component={TriviaEdit}
            />
            <ProtectedRoute
                layout={TriviaShowLayout}
                exact
                path='/trivias/:id/files'
                component={FilesList}
            />
            <ProtectedRoute
                layout={TriviaShowLayout}
                exact
                path='/trivias/:id/questions'
                component={QuestionsList}
            />
            <ProtectedRoute
                layout={TriviaShowLayout}
                exact
                path='/trivias/:id/awards'
                component={AwardsList}
            />
            <ProtectedRoute
                layout={TriviaShowLayout}
                exact
                path='/trivias/:id/subthemes'
                component={SubthemesList}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/subthemes/create"
                component={() => <SubthemeCreate />}
            />
            <ProtectedRoute
                layout={SubthemeShow}
                exact
                path='/trivias/:trivia_id/subthemes/:subtheme_id/questions'
                component={QuestionsList}
            />
            <ProtectedRoute
                layout={SubthemeShow}
                exact
                path='/trivias/:trivia_id/subthemes/:subtheme_id'
                component={SubthemeEdit}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/awards/create"
                component={() => <AwardsCreate />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/files/create"
                component={() => <FileCreate />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/files/:file_id"
                component={() => <FileEdit />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/trivias/:trivia_id/awards/:award_id"
                component={() => <AwardEdit />}
            />

            {/**
             * Forum
             */}
            <ProtectedRoute
                exact
                path="/forums"
                component={() => <ForumsView />}
                layout={Layout}
            />
            <ProtectedRoute
                exact
                path="/forums/:id"
                component={<ForumEdit />}
                layout={Layout}
            />
            <ProtectedRoute
                exact
                path="/forums/:id/show"
                component={<ForumShow />}
                layout={Layout}
            />
            <ProtectedRoute exact path="/comments/:id/show" component={() => <CommentShow />} layout={Layout} />
            <Route path='/*' render={() => <NotFound />} />
        </Switch>
    )
}

export default App;
