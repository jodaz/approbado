import { eventChannel, END } from 'redux-saga';
import {
    call,
    put,
    take,
    cancelled,
    takeLatest,
    all
} from 'redux-saga/effects';
import {
  START_COUNTER,
  updateCounter,
  setConfigs
} from '../actions';

const countdown = secs =>
    eventChannel(emit => {
        const counter = setInterval(() => {
            secs -= 1;

            emit(secs >= 0 ? secs : END);
        }, 1000);

        return () => clearInterval(counter);
    });

function* startCounterTask(action) {
    const { payload: secs } = action
    const chan = yield call(countdown, secs);

    try {
        while (true) {
            const sec = yield take(chan);
            yield put(updateCounter(sec));

            if (sec == 0) yield put(setConfigs({ view: 'timeout' }))
        }
    } finally {
        if (yield cancelled()) {
            chan.close();
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(START_COUNTER, startCounterTask)
    ])
}

