import {
  getAllNotifications, getUnreadNotifications, deleteNotification,
  getUsersLength, getUserProfile, changeUserName
} from '../../shellFetch/userProtectedFetch';
import {
  updateAllNotifications, updateUnreadNotifications,
  updateUsersLength,
  updateProfileData, changeProfileName
} from '../actions';
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
    yield put(updateUsersLength(response.number));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* getProfileDataSaga(action) {
  try {
    let query = {
      id: action.id
    };
    console.log(action);
    let response = yield call(getUserProfile, {req: null, query: query});
    yield put(updateProfileData(response.user));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* changeProfileNameSaga(action) {
  try {
    let query = {
      name: action.name
    };
    console.log(action);
    let response = yield call(changeUserName, {req: null, query: query});
    console.log(response);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
