import { put, takeLatest } from 'redux-saga/effects'
import { axios } from '@approbado/lib/providers'
import { USER_FETCH_REQUESTED, fetchUserSuccess } from '../actions';
import CONFIG_NAMES from '../configs'

export default function* fetchUser() {
    yield takeLatest(USER_FETCH_REQUESTED, function* () {
        try {
            const response = yield axios.get('/profile');

            yield localStorage.setItem(CONFIG_NAMES.USER, JSON.stringify(response.data))
            yield put(fetchUserSuccess(response.data));
        } catch (e) {
            yield put({ type: "USER_FETCH_FAILED", message: e.message });
        }
    });
}

