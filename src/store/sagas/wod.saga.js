import {call, put, takeLatest} from 'redux-saga/effects'
import * as globalActions from '../actions/global.action'
import * as wodActions from '../actions/wod.action'
import * as exerciseActions from '../actions/exercise.action'
import {saveWod} from '../../services/api/wod'

export function* submitWodSaga(action) {
    yield call(saveWod, action.payload)
    yield put(globalActions.setRegularMode())
    yield put(wodActions.cleanNewWod())
    yield put(exerciseActions.cleanNewExercises())
    // todo: handle errors
    // yield put(actions.abortWodSubmit())
}

export function* watchSubmitWodSaga() {
    yield takeLatest(wodActions.WOD_SUBMIT, submitWodSaga)
}
