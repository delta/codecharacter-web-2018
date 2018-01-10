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
  updateCompilationStatus,
  updateLoginMessage,
  updateCode
}                                     from './actions';
import {
  userLogin,
  userRegister,
  userLogout,
  userLoginStatus
} from './shellFetch/userFetch';
import {
  leaderboardGetPlayers,
  leaderboardStartChallenge
}                                     from './shellFetch/leaderBoardFetch';
import {
  codeSubmit,
  codeLock, codeFetch
} from './shellFetch/codeFetch';

function* userLoginSaga (action) {
  try {
    let query = {
      emailId: action.username,
      password: action.password
    };
    let response = yield call(userLogin,{req: null, query: query});
    yield put(updateUserLoginStatus({username: action.username, loginStatus: response.success}));
    yield put(updateLoginMessage({loginMessage: response.message}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* userLoginStatusSaga (action) {
  try {
    let response = yield call(userLoginStatus,{req: null, query: null});
    yield put(updateUserLoginStatus({username: action.username, loginStatus: response.success}));
  }
  catch(err) {
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
    yield call(userRegister,{req: null, query: query});
    yield put(updateUserLoginStatus({username: action.username, loginStatus: true}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* userLogoutSaga(action) {
  try {
    yield call(userLogout);
    yield put(updateUserLoginStatus({username: action.username, loginStatus: false}));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* leaderboardGetPlayersSaga() {
  try {
    const response = yield call(leaderboardGetPlayers, {req: null, query: null});
    yield put(updateLeaderboard(response));
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
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* codeSubmitSaga(action) {
  try {
    let query = {
      source: action.code
    };
    yield put(updateCode(action.code));
    const response = yield call(codeSubmit,{req: null, query: query});
    yield put(updateCompilationStatus(response.message));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* codeFetchSaga() {
  try {
    const response = yield call(codeFetch,{req: null, query: null});
    yield put(updateCode(response.source));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* codeLockSaga(action) {
  try {
    let query = {
      source: action.code,
    };
    yield call(codeLock,{req: null, query: query});
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export default function* codeCharacterSagas() {
  yield takeEvery(actionTypes.USER_AUTHENTICATE, userLoginSaga);
  yield takeEvery(actionTypes.USER_AUTHENTICATE_CHECK, userLoginStatusSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, userLogoutSaga);
  yield takeEvery(actionTypes.USER_SIGNUP, userSignupSaga);
  yield takeEvery(actionTypes.FETCH_LEADERBOARD_DATA, leaderboardGetPlayersSaga);
  yield takeEvery(actionTypes.START_CHALLENGE, leaderboardStartChallenge);
  yield takeEvery(actionTypes.RUN_CODE, codeSubmitSaga);
  yield takeEvery(actionTypes.LOCK_CODE, codeLockSaga);
  yield takeEvery(actionTypes.FETCH_CODE, codeFetchSaga);
}
