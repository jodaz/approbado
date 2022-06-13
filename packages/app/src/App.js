import * as React from 'react'
// Other resources
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '@approbado/lib/components/ProtectedRoute';

// Layouts
import DefaultLayout from './layouts/Default'
import GameLayout from './layouts/Game'
import ChatLayout from './layouts/Chat'
import DashboardLayout from './layouts/Dashboard'
import ForumLayout from './layouts/Forum'

// Views
import NotificationsView from './notifications'
import TriviaList from './trivias/TriviaList'
import TriviaGame from './trivias/games'
import PreparingRoom from './trivias/games/PreparingRoom'
import StartTrivia from './trivias/startTrivia'
import ErrorLayout from '@approbado/lib/layouts/Error'
import UserProfile from '@approbado/lib/layouts/profile/UserProfile'
import ProfileEdit from './profile/EditProfile';
import TestList from './tests'
import UserRanking from './ranking'
import CompletedGames from './completedGames'
import ScheduleForm from './schedule'
import Authenticate from '@approbado/lib/layouts/Authenticate'
import Account from './account';
import Profile from './profile';
import ForumShow from '@approbado/lib/layouts/forums/ForumShow'
import ForumEdit from '@approbado/lib/layouts/forums/ForumEdit'
import CommentShow from '@approbado/lib/layouts/comments/CommentShow'
import SelectMessageAlert from './layouts/Chat/SelectMessageAlert'
import Chatbox from './chatbox'
import ForumList from '@approbado/lib/layouts/forums/ForumList';

import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "dd-MM-yyyy", { locale: this.locale });
    }
}

const App = () => (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={esLocale}>
        <Route path='/auth' render={() => <Authenticate />} />

        <Switch>
            {/**
             * Dashboard
             */}
            <Redirect exact from='/' to='/dashboard' />
            <ProtectedRoute
                exact
                path="/dashboard"
                component={() => <TestList />}
                layout={DashboardLayout}
            />
            <ProtectedRoute
                exact
                path="/dashboard/schedules/:id?"
                component={() => <ScheduleForm />}
                layout={DashboardLayout}
            />
            <ProtectedRoute
                exact
                path="/dashboard/ranking"
                component={() => <UserRanking />}
                layout={DashboardLayout}
            />
            <ProtectedRoute
                exact
                path="/dashboard/completed"
                component={() => <CompletedGames />}
                layout={DashboardLayout}
            />

            {/**
             * Account
             */}
            <ProtectedRoute
                exact
                path="/account"
                component={() => <Account />}
                layout={DefaultLayout}
            />
            <ProtectedRoute
                exact
                path="/profile/edit"
                component={() => <ProfileEdit />}
                layout={DefaultLayout}
            />
            <ProtectedRoute
                exact
                path="/profile"
                component={() => <Profile />}
                layout={DefaultLayout}
            />
            <ProtectedRoute
                exact
                path="/error"
                component={() => <ErrorLayout />}
                layout={DefaultLayout}
            />
            <ProtectedRoute
                exact
                path="/users/:id/show"
                component={() => <UserProfile />}
                layout={DefaultLayout}
            />
            <ProtectedRoute
                exact
                path="/notifications"
                component={() => <NotificationsView />}
                layout={DefaultLayout}
            />

            {/**
             * Forum
             */}

            <Switch>
                {/**
                 * Forums
                 */}
                <Redirect exact from='/forums' to='/forums/top' />
                <ProtectedRoute
                    exact
                    path="/forums/top"
                    component={() => <ForumList sort={{ field: 'comments', order: 'DESC' }} />}
                    layout={ForumLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/new"
                    component={() => <ForumList sort={{ field: 'created_at', order: 'DESC' }} />}
                    layout={ForumLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/unanswered"
                    component={() => <ForumList filter={{ unanswered: true }} />}
                    layout={ForumLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/:id"
                    component={() => <ForumShow  />}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/forums/:id/edit"
                    component={() => <ForumEdit />}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact
                    path="/comments/:id/show"
                    component={() => <CommentShow />}
                    layout={Layout}
                />
            </Switch>

            {/**
             * Trivias
             */}
            <ProtectedRoute layout={DefaultLayout} exact path='/trivias' component={(routeProps) =>
                <TriviaList
                    resource="trivias"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute exact path="/trivias/start" component={() => <StartTrivia />} layout={DefaultLayout} />
        </Switch>

        {/**
         * Game
         */}
        <Switch>
            <ProtectedRoute exact path="/game" component={() => <TriviaGame />} layout={GameLayout} />
            <ProtectedRoute exact path="/room/:token" component={() => <PreparingRoom />} layout={GameLayout} />
        </Switch>

        <Switch>
            {/**
             * Chats
             */}
            <ProtectedRoute
                exact
                path="/chats"
                component={() => <SelectMessageAlert />}
                layout={ChatLayout}
            />
            <ProtectedRoute
                exact
                path="/chats/:chat_id"
                component={() => <Chatbox />}
                layout={ChatLayout}
            />
        </Switch>
    </MuiPickersUtilsProvider>
)

export default App;
