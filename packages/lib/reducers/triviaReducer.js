import { UNSET_TRIVIA, SET_TRIVIA } from '../actions';

const initialState = {
    selected: false,
    trivia: {}
}

const dialogReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case SET_TRIVIA:
            return {
                selected: true,
                trivia: action.payload
            }
        case UNSET_TRIVIA:
            return initialState;
        default:
            return previousState;
    }
}

export default dialogReducer;

