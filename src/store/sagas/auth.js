import {call, put, takeLatest} from 'redux-saga/effects'
import * as actions from '../actions/index'
import {login} from '../../services/api/auth'

export function* loginSaga(action) {
    const response = yield call(login, action.payload)
    if (response.ok) {
        const user = yield response.json()
        yield put(actions.loginAccomplish(user))
    } else {
        const message = yield response.json()
        yield put(actions.abortLogin(message))
    }
}

export function* watchLoginSaga() {
    yield takeLatest(actions.USER_LOGIN, loginSaga)
}
