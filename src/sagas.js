import {
  call,
  put,
  takeEvery,
}                                     from 'redux-saga/effects';
import actionTypes                    from './action_types';
import {
  updateUserLoginStatus
}                                     from './actions';
import {
  userLogin,
  userRegister,
  userLogout
}                                     from './shellFetch';

function* userLoginSaga (action) {
  try {
    let query = {
      emailId: action.username,
      password: action.password
    };
    let response = yield call(userLogin,{req: null, query: query});
    yield put(updateUserLoginStatus({emailId: action.emailId, loginStatus: response.success}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* userSignupSaga(action) {
  try {
    let query = {
      emailId: action.emailId,
      username: action.username,
      password: action.password
    };
    const response = yield call(userRegister,{req: null, query: query});
    yield put(updateUserLoginStatus({username: action.username, loginStatus: true}));
    console.log(response);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* userLogoutSaga (action) {
  try {
    const response = yield call(userLogout);
    yield put(updateUserLoginStatus({username: action.username, loginStatus: false}));
    console.log(response);
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export default function* codeCharacterSagas() {
  yield takeEvery(actionTypes.USER_AUTHENTICATE, userLoginSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, userLogoutSaga);
  yield takeEvery(actionTypes.USER_SIGNUP, userSignupSaga);
}
