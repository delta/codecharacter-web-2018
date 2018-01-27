import {
  getAllNotifications, getUnreadNotifications, deleteNotification,
  getUsersLength
} from '../../shellFetch/userProtectedFetch';
import { updateAllNotifications, updateUnreadNotifications, updateUsersLength } from '../actions';
import { call, put } from 'redux-saga/effects';

export function* getUnreadNotificationsSaga() {
  try {
    let response = yield call(getUnreadNotifications,{req: null, query: null});
    if (response.notifications) {
      yield put(updateUnreadNotifications(response.notifications));
    }
    else {
      yield put(updateUnreadNotifications([]));
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* getAllNotificationsSaga() {
  try {
    let response = yield call(getAllNotifications,{req: null, query: null});
    if(response.notifications) {
      yield put(updateAllNotifications(response.notifications));
    }
    else {
      yield put(updateAllNotifications([]));
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* deleteNotificationSaga(action) {
  try {
    let query = {
      nId: action.id
    };
    yield call(deleteNotification,{req: null, query: query});
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* getUsersLengthSagas(action) {
  try {
    let response = yield call(getUsersLength, {req: null, query: null});
    console.log(response);
    yield put(updateUsersLength(response.number));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
