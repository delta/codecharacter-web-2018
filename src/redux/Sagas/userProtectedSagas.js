import { getAllNotifications, getUnreadNotifications, deleteNotification } from '../../shellFetch/userProtectedFetch';
import { updateAllNotifications, updateUnreadNotifications } from '../actions';
import { call, put } from 'redux-saga/effects';

export function* getUnreadNotificationsSaga() {
  try {
    let response = yield call(getUnreadNotifications,{req: null, query: null});
    if (response.notifications) {
      console.log(response.notifications);
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

export function* deleteNotificationSaga(action) {
  try {
    let query = {
      nId: action.id
    };
    let response = yield call(deleteNotification,{req: null, query: query});
    console.log(response);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
