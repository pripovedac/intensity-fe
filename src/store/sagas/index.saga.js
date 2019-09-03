import {all, fork} from 'redux-saga/effects'
import {watchLoginSaga, watchLogoutSaga, watchRegisterSaga} from './auth.saga'
import {watchSubmitWodSaga, watchUpdateWodSaga} from './wod.saga'

export default function* root() {
    yield all([
        fork(watchLoginSaga),
        fork(watchLogoutSaga),
        fork(watchRegisterSaga),
        fork(watchSubmitWodSaga),
        fork(watchUpdateWodSaga),
    ])
}
