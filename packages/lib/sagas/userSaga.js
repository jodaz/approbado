import { put, takeLatest, all } from 'redux-saga/effects'
import { axios } from '@approbado/lib/providers'
import { USER_FETCH_REQUESTED, fetchUserSuccess, SET_USER } from '../actions';
import CONFIG_NAMES from '../configs'

function* fetchUser () {
    try {
        const response = yield axios.get('/profile');

        yield localStorage.setItem(CONFIG_NAMES.USER, JSON.stringify(response.data))
        yield put(fetchUserSuccess(response.data));
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

function* setUser(action) {
    try {
        yield localStorage.setItem(CONFIG_NAMES.USER, JSON.stringify(action.payload))
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(USER_FETCH_REQUESTED, fetchUser),
        takeLatest(SET_USER, setUser)
    ])
}
