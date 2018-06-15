import {
  getAllNotifications, getUnreadNotifications, deleteNotification,
  getUsersLength, getUserProfile, changeUserProfile, getUserViewProfile
} from '../../shellFetch/userProtectedFetch';
import {
  updateAllNotifications, updateUnreadNotifications,
  updateUsersLength,
  updateProfileData, changeProfile, updateProfileViewData, changeIsFetching, getProfileData
} from '../actions';
import { call, put } from 'redux-saga/effects';

export function* getUnreadNotificationsSaga() {
  try {
    let response = yield call(getUnreadNotifications,{req: null, query: null});
    if(!response.success && !response.redirect) {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response.message,
        createdAt: Date.now().toString()
      }]));
    }
    else {
      if (response.notifications) {
        yield put(updateUnreadNotifications(response.notifications));
      }
      else {
        yield put(updateUnreadNotifications([]));
      }
    }
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* getAllNotificationsSaga() {
  try {
    yield put(changeIsFetching(true));
    let response = yield call(getAllNotifications,{req: null, query: null});
    if(response.notifications) {
      yield put(updateAllNotifications(response.notifications));
    }
    else {
      yield put(updateAllNotifications([]));
    }
    yield put(changeIsFetching(false));
  }
  catch (err) {
    console.log(err);
    // throw err;
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
    // throw err;
  }
}

export function* getUsersLengthSagas(action) {
  try {
    let response = yield call(getUsersLength, {req: null, query: null});
    if (response.length) {
      yield put(updateUsersLength(response.length));
    }
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* getProfileDataSaga(action) {
  try {
    yield put(changeIsFetching(true));
    let query = {
      id: action.id
    };
    let response = yield call(getUserProfile, {req: null, query: query});
    if (response.user) {
      yield put(updateProfileData(response.user));
    }
    yield put(changeIsFetching(false));
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* getProfileViewDataSaga(action) {
  try {
    yield put(changeIsFetching(true));
    let query = {
      name: action.name
    };
    let response = yield call(getUserViewProfile, {req: null, query: query});
    if (response.user) {
      yield put(updateProfileViewData(response.user));
    }
    else {
      yield put(updateProfileViewData(null));
    }
    yield put(changeIsFetching(false));
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* changeProfileSaga(action) {
  try {
    let query = {
      name: action.name,
      nationality: action.nationality
    };
    yield call(changeUserProfile, {req: null, query: query});
    yield put(getProfileData(action.id));
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}
