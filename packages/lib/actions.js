export const UNSET_DIALOG = 'UNSET_DIALOG';
export const SET_DIALOG = 'SET_DIALOG';
export const UNSET_TRIVIA = 'UNSET_TRIVIA';
export const SET_TRIVIA = 'SET_TRIVIA';
export const UNSET_USER = 'UNSET_USER';
export const SET_USER = 'SET_USER'
export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED'
export const USER_FETCH_SUCCEEDED = 'USER_FETCH_SUCCEEDED'
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED'
export const SET_SUBTHEMES = 'SET_SUBTHEMES';
export const UNSET_SUBTHEMES = 'UNSET_SUBTHEMES';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const UNSET_QUESTIONS = 'UNSET_QUESTIONS';
export const PASS_QUESTION = 'PASS_QUESTION';
export const SET_ANSWER = 'SET_ANSWER';
export const UNSET_ANSWER_STATUS = 'UNSET_ANSWER_STATUS';
export const SET_CONFIGS = 'SET_CONFIGS';
export const UNSET_CONFIGS = 'UNSET_CONFIGS';
export const GET_RESULTS = 'GET_RESULTS';
export const SET_RESULTS = 'SET_RESULTS';
export const FETCH_RESULTS_FAILED = 'FETCH_RESULTS_FAILED';
export const START_COUNTER = 'START_COUNTER';
export const UPDATE_COUNTER = 'UPDATE_COUNTER';
export const FETCH_SCHEDULES = 'FETCH_SCHEDULES';
export const CLEAR_SCHEDULES = 'CLEAR_SCHEDULES';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const SET_ROOM = 'SET_ROOM';

export const unsetSchedule = data => ({
    type: DELETE_SCHEDULE,
    payload: data
});

export const fetchSchedules = data => ({
    type: FETCH_SCHEDULES,
    payload: data
});

export const setConfigs = data => ({
    type: SET_CONFIGS,
    payload: data
});

export const startCounter = secs => ({
    type: START_COUNTER,
    payload: secs
});

export const setStatus = data => ({
    type: SET_STATUS,
    payload: data
});

export const setAnswer = data => ({
    type: SET_ANSWER,
    payload: data
});

export const unsetAnswerStatus = () => ({
    type: UNSET_ANSWER_STATUS
});

export const passQuestion = () => ({
    type: PASS_QUESTION
});

export const setQuestions = data => ({
    type: SET_QUESTIONS,
    payload: data
});

export const unsetQuestions = data => ({
    type: UNSET_QUESTIONS,
    payload: data
});

export const unsetSubtheme = data => ({
    type: UNSET_SUBTHEMES,
    payload: data
});

export const setSubtheme = data => ({
    type: SET_SUBTHEMES,
    payload: data
});

export const unsetTrivia = () => ({
    type: UNSET_TRIVIA
});

export const setTrivia = data => ({
    type: SET_TRIVIA,
    payload: data
});

export const unsetUser = () => ({
    type: UNSET_USER
});

export const setResults = data => ({
    type: SET_RESULTS,
    payload: data
});

export const getResults = () => ({
    type: GET_RESULTS
});

export const setUser = data => ({
    type: SET_USER,
    payload: data
});

export const unsetDialog = (name) => ({
    type: UNSET_DIALOG,
    payload: name
});

export const setDialog = (name) => ({
    type: SET_DIALOG,
    payload: name
});

export const fetchUser = () => ({
    type: USER_FETCH_REQUESTED
});

export const fetchUserSuccess = data => ({
    type: USER_FETCH_SUCCEEDED,
    payload: data
});

export const updateCounter = secs => ({
    type: UPDATE_COUNTER,
    payload: secs
});
