import {all, fork} from 'redux-saga/effects'
import {watchLoginSaga} from './auth'

export default function* root() {
    yield all([
        fork(watchLoginSaga),
    ])
}
