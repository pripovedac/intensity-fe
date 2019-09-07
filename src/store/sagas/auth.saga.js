import {call, put, takeLatest} from 'redux-saga/effects'
import * as actions from '../actions/auth.action'
import {login, register} from '../../services/api/auth'
import {push} from 'react-router-redux'
import {removeToken, setToken} from '../../services/localstorage'

export function* loginSaga(action) {
    const response = yield call(login, action.payload)
    if (response.ok) {
        const user = yield response.json()
        setToken(user.token)
        yield put(actions.persistUser(user))
        yield put(push('/home'))
    } else {
        const message = yield response.json()
        yield put(actions.abortLogin(message))
    }
}

export function* logoutSaga(action) {
    yield put(actions.accomplishLogout())
    removeToken()
    yield put(push('/login'))
}

export function* registerSaga(action) {
    const response = yield call(register, action.payload)
    if (response.ok) {
        yield put(actions.accomplishRegistration())
        yield put(push('/login'))
    } else {
        const message = yield response.json()
        yield put(actions.abortRegistration(message))
    }
}

export function* watchLoginSaga() {
    yield takeLatest(actions.USER_LOGIN, loginSaga)
}

export function* watchLogoutSaga() {
    yield takeLatest(actions.USER_LOGOUT, logoutSaga)
}

export function* watchRegisterSaga() {
    yield takeLatest(actions.USER_REGISTER, registerSaga)
}

