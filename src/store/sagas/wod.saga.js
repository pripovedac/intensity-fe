import {call, put, takeLatest} from 'redux-saga/effects'
import * as globalActions from '../actions/global.action'
import * as wodActions from '../actions/wod.action'
import * as exerciseActions from '../actions/exercise.action'
import {saveWod, updateWod} from '../../services/api/wod'

export function* submitWodSaga(action) {
    const wod = yield call(saveWod, action.payload)
    const exercises = [...wod.exercises]
    delete wod.exercises
    yield put(wodActions.addActiveWod(wod))
    yield put(exerciseActions.addActiveExercises(exercises))
    yield put(globalActions.setRegularMode())
    yield put(wodActions.cleanNewWod())
    yield put(exerciseActions.cleanNewExercises())
    // todo: handle errors
    // yield put(actions.abortWodSubmit())
}

export function* watchSubmitWodSaga() {
    yield takeLatest(wodActions.WOD_SUBMIT, submitWodSaga)
}

export function* updateWodSaga(action) {
    console.log('Update wod saga: ', action.payload)
    const {payload} = action
    const completeWod = yield call(updateWod, payload, payload.id)
    console.log('complete wod: ', completeWod)
    // todo: same code repeats
    const exercises = [...completeWod.exercises]
    delete completeWod.exercises
    yield put(wodActions.addActiveWod(completeWod.wod))
    yield put(exerciseActions.addActiveExercises(exercises))
    yield put(globalActions.setRegularMode())
    yield put(wodActions.cleanNewWod())
    yield put(exerciseActions.cleanNewExercises())
}

export function* watchUpdateWodSaga() {
    yield takeLatest(wodActions.WOD_UPDATE, updateWodSaga)
}
