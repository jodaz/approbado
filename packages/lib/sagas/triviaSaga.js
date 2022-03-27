import { put, takeLatest, all } from 'redux-saga/effects'
import { axios } from '@approbado/lib/providers'
import { SET_ANSWER } from '../actions';

function* sendAnswer(action) {
    try {
        const {
            payload: {
                is_right,
                answer
            }
        } = action

        yield axios.post('/answers', {
            is_right: is_right,
            option_id: answer.id
        });
    } catch (e) {
        yield put({ type: "USER_FETCH_FAILED", message: e.message });
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(SET_ANSWER, sendAnswer),
    ])
}
