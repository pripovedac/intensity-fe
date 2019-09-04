import {changeMemberStatus} from '../../services/api/user'
import {call, put, takeLatest} from 'redux-saga/effects'
import * as memberActions from '../actions/members.action'

export function* updateUserStatus(action) {
    const updatedMember = yield call(changeMemberStatus, action.payload)
    yield put(memberActions.persistMember(updatedMember))
    // todo: handle errors
}

export function* watchStatusChange() {
    yield takeLatest(memberActions.MEMBER_STATUS_CHANGE, updateUserStatus)
}
