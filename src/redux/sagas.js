import {
  call,
  put,
  takeEvery,
  takeLatest
}                                                from 'redux-saga/effects';
import actionTypes                               from './action_types';
import {
  updateUserLoginStatus,
  updateLeaderboard,
  updateMatchAllData,
  updateCompilationStatus,
  updateLoginMessage,
  updateCode,
  changeCodeStatus,
  changeLastUsed,
  changeLastMatchId,
  changeMatchStatus,
  updateGameLog,
  updateUnreadNotifications,
  updateAllNotifications
}                                                from './actions';
import {
  userLogin,
  userRegister,
  userLogout,
  userLoginStatus,
}                                                from '../shellFetch/userFetch';
import {
  leaderboardGetPlayers,
  leaderboardStartChallenge,
}                                                from '../shellFetch/leaderBoardFetch';
import {
  codeSubmit,
  codeLock,
  codeFetch, codeCompile, getCodeStatus,
}                                               from '../shellFetch/codeFetch';
import {
  challengePlayer,
  matchFetchAll,
  matchFetchData,
  getLatestMatchId,
  getMatchStatus,
  fetchGameLog
}                                                from '../shellFetch/matchFetch';
import {
  getAllNotifications,
  getUnreadNotifications
}                                                from '../shellFetch/userProtectedFetch';

function* userLoginSaga (action) {
  try {
    let query = {
      emailId: action.username,
      password: action.password,
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

function* leaderboardStartChallengeSaga(action) {
  console.log(action);
  try {
    let query = {
      opponent: action.opponent
    };
    const response = yield call(challengePlayer, {req: null, query: query});
    console.log(response);
    yield put(changeLastUsed(1));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* codeSubmitSaga(action) {
  try {
    let query = {
      source: action.code,
    };
    yield put(updateCode(action.code));
    const response = yield call(codeCompile,{req: null, query: query});
    console.log(response);
    yield put(changeLastUsed(0));
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

function* matchFetchAllSaga() {
  try {
    const response = yield call(matchFetchAll,{req: null, query: null});
    console.log(response, "Hello");
    yield put(updateMatchAllData(response.matches));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

function* matchFetchDataSaga(action) {
  try {

    let query = {
      matchId: action.matchId,
    };
    console.log(action);
    const response = yield call(matchFetchData,{req: null, query: query});
    console.log(response, "Inga");
    yield put(updateCompilationStatus(response.status));
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

function* getCodeStatusSaga(action) {
  try {
    let response = yield call(getCodeStatus, {req: null, query: null});
    yield put(changeCodeStatus(response.status));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* getLatestMatchIdSaga() {
  try {
    let response = yield call(getLatestMatchId,{req: null, query: null});
    yield put(changeLastMatchId(response.match ? response.match.id : -1));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* getMatchStatusSaga(action) {
  try {
    let query = {
      matchId: action.matchId
    };
    let response = yield call(getMatchStatus,{req: null, query: query});
    yield put(changeMatchStatus(response.status));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* fetchGameLogSaga(action) {
  try {
    console.log(action);
    let query = {
      matchId: action.matchId
    };
    let response = yield call(fetchGameLog,{req: null, query: query});
    console.log(response, "Match Response");
    if (response.match) {
      yield put(updateGameLog(response.match.log.data));
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* getUnreadNotificationsSaga() {
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

function* getAllNotificationsSaga() {
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

export default function* codeCharacterSagas() {
  yield takeEvery(actionTypes.USER_AUTHENTICATE, userLoginSaga);
  yield takeEvery(actionTypes.USER_AUTHENTICATE_CHECK, userLoginStatusSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, userLogoutSaga);
  yield takeEvery(actionTypes.USER_SIGNUP, userSignupSaga);
  yield takeEvery(actionTypes.FETCH_LEADERBOARD_DATA, leaderboardGetPlayersSaga);
  yield takeEvery(actionTypes.START_CHALLENGE, leaderboardStartChallengeSaga);
  yield takeLatest(actionTypes.RUN_CODE, codeSubmitSaga);
  yield takeEvery(actionTypes.LOCK_CODE, codeLockSaga);
  yield takeEvery(actionTypes.FETCH_CODE, codeFetchSaga);
  yield takeEvery(actionTypes.FETCH_MATCH_ALL_DATA, matchFetchAllSaga);
  yield takeEvery(actionTypes.GET_MATCH_DATA, matchFetchDataSaga);
  yield takeEvery(actionTypes.GET_CODE_STATUS, getCodeStatusSaga);
  yield takeEvery(actionTypes.GET_LATEST_MATCH_ID, getLatestMatchIdSaga);
  yield takeEvery(actionTypes.GET_MATCH_STATUS, getMatchStatusSaga);
  yield takeEvery(actionTypes.GET_ALL_NOTIFICATIONS, getAllNotificationsSaga);
  yield takeEvery(actionTypes.GET_UNREAD_NOTIFICATIONS, getUnreadNotificationsSaga);
  yield takeEvery(actionTypes.FETCH_GAME_LOG, fetchGameLogSaga);
}
