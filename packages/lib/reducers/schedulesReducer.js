import {
    FETCH_SCHEDULES,
    CLEAR_SCHEDULES,
    DELETE_SCHEDULE
} from '../actions';

const initialState = []

const schedulesReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_SCHEDULES:
            return [
                ...action.payload
            ]
        case DELETE_SCHEDULE:
            return [
                ...previousState.filter(({ id }) => id != action.payload.id)
            ]
        case CLEAR_SCHEDULES:
            return initialState;
        default:
            return previousState;
    }
}

export default schedulesReducer;

