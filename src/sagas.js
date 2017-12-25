import {
  call,
  put,
  takeEvery,
}                                     from 'redux-saga/effects';
import actionTypes                    from './action_types';
import {
  updateUserLoginStatus,
  updateLeaderboard,
  updateMatchData,
  updateCompilationStatus
}                                     from './actions';
import {
  userLogin,
  userRegister,
  userLogout
}                                     from './shellFetch';
import {
  leaderboardGetPlayers,
  leaderboardStartChallenge
}                                     from './shellFetch/leaderBoardFetch';
import {
  codeSubmit,
  codeLock
}                                     from './shellFetch/codeFetch';

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

function* userLogoutSaga(action) {
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

function* leaderboardGetPlayersSaga(action) {
  try {
    const response = yield call(leaderboardGetPlayers, {req: null, query: null});
    yield put(updateLeaderboard(response));
    console.log(response);
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* leaderBoardStartChallengeSaga(action) {
  try {
    let query = {
      username: action.username,
      opponent: action.opponent
    };
    const response = yield call(leaderboardStartChallenge,{req: null, query: query});
    yield put(updateMatchData(response));
    console.log(response);
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* codeSubmitSaga(action) {
  try {
    let query = {
      username: action.username,
      code: action.code
    };
    const response = yield call(codeSubmit,{req: null, query: query});
    yield put(updateCompilationStatus(response));
    console.log(response);
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* codeLockSaga(action) {
  try {
    let query = {
      username: action.username,
    };
    const response = yield call(codeLock,{req: null, query: query});
    yield put(updateMatchData(response));
    console.log(response);
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export default function* codeCharacterSagas() {
  yield takeEvery(actionTypes.USER_AUTHENTICATE, userLoginSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, userLogoutSaga);
  yield takeEvery(actionTypes.USER_SIGNUP, userSignupSaga);
  yield takeEvery(actionTypes.FETCH_LEADERBOARD_DATA, leaderboardGetPlayersSaga);
  yield takeEvery(actionTypes.START_CHALLENGE, leaderboardStartChallenge);
  yield takeEvery(actionTypes.RUN_CODE, codeSubmitSaga);
  yield takeEvery(actionTypes.LOCK_CODE, codeLockSaga);
}
