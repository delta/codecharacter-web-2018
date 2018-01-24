import { userLogin, userLoginStatus, userRegister, userLogout } from '../../shellFetch/userFetch';
import { updateLoginMessage, updateUserLoginStatus } from '../actions';
import { call, put } from 'redux-saga/effects';

export function* userLoginSaga (action) {
  try {
    let query = {
      emailId: action.username,
      password: action.password,
    };
    let response = yield call(userLogin,{req: null, query: query});
    console.log(response);
    yield put(updateUserLoginStatus({username: action.username, loginStatus: response.success}));
    yield put(updateLoginMessage({loginMessage: response.message}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* userLoginStatusSaga (action) {
  try {
    let response = yield call(userLoginStatus,{req: null, query: null});
    yield put(updateUserLoginStatus({username: action.username, loginStatus: response.success}));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* userSignupSaga(action) {
  try {
    let query = {
      emailId: action.emailId,
      username: action.username,
      password: action.password,
    };
    yield call(userRegister,{req: null, query: query});
    yield put(updateUserLoginStatus({username: action.username, loginStatus: true}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* userLogoutSaga(action) {
  try {
    yield call(userLogout);
    yield put(updateUserLoginStatus({username: action.username, loginStatus: false}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}