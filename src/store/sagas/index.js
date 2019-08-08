import {all, fork} from 'redux-saga/effects'
import {watchLoginSaga, watchRegisterSaga} from './auth.saga'

export default function* root() {
    yield all([
        fork(watchLoginSaga),
        fork(watchRegisterSaga)
    ])
}
