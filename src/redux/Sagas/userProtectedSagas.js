import { getAllNotifications, getUnreadNotifications } from '../../shellFetch/userProtectedFetch';
import { updateAllNotifications, updateUnreadNotifications } from '../actions';
import { call, put } from 'redux-saga/effects';

export function* getUnreadNotificationsSaga() {
  try {
    let response = yield call(getUnreadNotifications,{req: null, query: null});
    console.log(response);
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
    console.log(response, "Getting all notifications");
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
