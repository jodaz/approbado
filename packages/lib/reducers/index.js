import dialogReducer from './dialogReducer';
import triviaReducer from './triviaReducer';
import userReducer from './userReducer';
import schedulesReducer from './schedulesReducer';

export default {
    user: userReducer,
    dialog: dialogReducer,
    trivia: triviaReducer,
    schedules: schedulesReducer
};
