import {
    FETCH_NOTIFICATIONS,
    CLEAR_NOTIFICATIONS,
    DELETE_NOTIFICATION
} from '../actions';

const initialState = []

const notificationsReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return [
                ...action.payload
            ]
        case DELETE_NOTIFICATION:
            return [
                ...previousState.filter(({ id }) => id != action.payload.id)
            ]
        case CLEAR_NOTIFICATIONS:
            return initialState;
        default:
            return previousState;
    }
}

export default notificationsReducer;
