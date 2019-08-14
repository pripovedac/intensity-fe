import {call, put, takeLatest} from 'redux-saga/effects'
import * as wodActions from '../actions/wod.action'
import * as globalActions from '../actions/global.action'
import {saveWod} from '../../services/api/wod'

export function* submitWodSaga(action) {
    const wodWithExercises = yield call(saveWod, action.payload)
    yield put(globalActions.setRegularMode())
    // todo: handle errors
    // yield put(actions.abortWodSubmit())

}

export function* watchSubmitWodSaga() {
    yield takeLatest(wodActions.WOD_SUBMIT, submitWodSaga)
}
