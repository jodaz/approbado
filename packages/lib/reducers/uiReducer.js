import {
    TOGGLE_SIDEBAR
} from '../actions';

const initialState = {
    sidebarOpen: true
}

const uiReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                sidebarOpen: !previousState.sidebarOpen
            }
        default:
            return initialState;
    }
}

export default uiReducer;
