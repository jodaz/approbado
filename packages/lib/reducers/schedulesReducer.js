import {
    FETCH_SCHEDULES,
    CLEAR_SCHEDULES
} from '../actions';

const initialState = []

const userReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_SCHEDULES:
            return [
                ...action.payload
            ]
        case CLEAR_SCHEDULES:
            return initialState;
        default:
            return previousState;
    }
}

export default userReducer;

