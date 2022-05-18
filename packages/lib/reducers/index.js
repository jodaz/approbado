import dialogReducer from './dialogReducer';
import triviaReducer from './triviaReducer';
import userReducer from './userReducer';
import schedulesReducer from './schedulesReducer';
import notificationsReducer from './notificationsReducer';

export default {
    user: userReducer,
    dialog: dialogReducer,
    trivia: triviaReducer,
    schedules: schedulesReducer,
    notifications: notificationsReducer
};
