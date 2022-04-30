import * as React from 'react'
// Other resources
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from '@approbado/lib/components/ProtectedRoute';

// Layouts
import DefaultLayout from './layouts/Default'
import GameLayout from './layouts/Game'

// Views
import TriviaList from './trivias/TriviaList'
import TriviaGame from './trivias/games'
import StartTrivia from './trivias/startTrivia'
import ErrorLayout from '@approbado/lib/layouts/Error'
import UserProfile from '@approbado/lib/layouts/profile/UserProfile'
import ProfileEdit from './profile/EditProfile';
import Dashboard from './dashboard'
import Authenticate from '@approbado/lib/layouts/Authenticate'
import Account from './account';
import Profile from './profile';
import ForumShow from '@approbado/lib/layouts/forums/ForumShow'
import ForumEdit from '@approbado/lib/layouts/forums/ForumEdit'
import ForumsView from '@approbado/lib/layouts/forums/ForumsView'
import NotificationsView from './notifications/NotificationsView'
import CommentShow from '@approbado/lib/layouts/comments/CommentShow'

const App = () => (
    <>
        <Route path='/auth' render={() => <Authenticate />} />

        <Switch>
            <ProtectedRoute exact path="/" component={() => <Dashboard />} layout={DefaultLayout} />

            {/**
             * Account
             */}
            <ProtectedRoute exact path="/account" component={() => <Account />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/profile/edit" component={() => <ProfileEdit />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/profile" component={() => <Profile />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/error" component={() => <ErrorLayout />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/users/:id/show" component={() => <UserProfile />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/notifications" component={() => <NotificationsView />} layout={DefaultLayout} />

            {/**
             * Forum
             */}
            <ProtectedRoute exact path="/forums" component={() => <ForumsView />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/forums/:id" component={() => <ForumEdit />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/forums/:id/show" component={() => <ForumShow />} layout={DefaultLayout} />
            <ProtectedRoute exact path="/comments/:id/show" component={() => <CommentShow />} layout={DefaultLayout} />

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

        <Switch>
            <ProtectedRoute exact path="/game" component={() => <TriviaGame />} layout={GameLayout} />
        </Switch>
    </>
)

export default App;
