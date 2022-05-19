import {
    FETCH_NOTIFICATIONS,
    CLEAR_NOTIFICATIONS,
    DELETE_NOTIFICATION
} from '../actions';

const initialState = {
    items: [],
    total: null
}

const notificationsReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return {
                items: [...action.payload],
                total: action.payload.length
            }
        case DELETE_NOTIFICATION:
            return {
                items: [...previousState.items.filter(({ id }) => id != action.payload.id)],
                total: previousState.total - 1
            }
        case CLEAR_NOTIFICATIONS:
            return initialState;
        default:
            return previousState;
    }
}

export default notificationsReducer;
