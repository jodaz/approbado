import { put, takeLatest, all, select } from 'redux-saga/effects'
import { axios } from '@approbado/lib/providers'
import {
    setResults,
    FETCH_RESULTS_FAILED,
    GET_RESULTS,
    SET_ANSWER
} from '../actions';

const getTrivia = state => state.trivia;

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

function* getAndSetResults() {
    try {
        const {
            selectedSubthemes,
            configs: {
                level,
                type
            }
        } = yield select(getTrivia)

        const subthemesIds = selectedSubthemes.map(({ id }) => id)
        const awardsIds = selectedSubthemes
            .map(({ award_id }) => award_id)
            .filter((value, index, self) => self.indexOf(value) === index)

        const response = yield axios.post('/trivias/finish', {
            subthemes_ids: subthemesIds,
            level_id: level,
            type: type,
            awards_ids: awardsIds
        })

        const { data: { rights, points } } = response

        yield put(setResults({ rights: rights, points: points }))
    } catch (e) {
        yield put({ type: "FETCH_RESULTS_FAILED", message: e.message });
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(GET_RESULTS, getAndSetResults),
        takeLatest(SET_ANSWER, sendAnswer)
    ])
}
