import { UNSET_USER, SET_USER } from '../actions';

const initialState = {
    isAuth: false,
    token: '',
    exp: '',
    user: {}
}

const userReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case SET_USER:
            return {
                isAuth: !previousState.isAuth,
                token: action.payload.token,
                user: action.payload.data,
                exp: action.payload.exp,
                ...previousState
            }
        case UNSET_USER:
            return initialState;
        default:
            return previousState;
    }
}

export default userReducer;

