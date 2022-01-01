import { UNSET_USER, SET_USER, USER_FETCH_SUCCEEDED } from '../actions';

const initialState = {
    isAuth: false,
    token: '',
    exp: '',
    user: {},
    refreshToken: '',
    loading: false
}

const userReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case SET_USER:
            return {
                loading: !previousState.loading,
                isAuth: !previousState.isAuth,
                token: action.payload.token,
                user: action.payload.data,
                exp: action.payload.exp,
                ...previousState
            }
        case USER_FETCH_SUCCEEDED:
            return {
                ...previousState,
                user: action.payload
            }
        case UNSET_USER:
            return initialState;
        default:
            return previousState;
    }
}

export default userReducer;

