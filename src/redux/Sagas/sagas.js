import { takeEvery }                             from 'redux-saga/effects';
import actionTypes                               from '../action_types';
import * as aiSagas                              from './aiSagas';
import * as codeSagas                            from './codeSagas';
import * as leaderBoardSagas                     from './leaderBoardSagas';
import * as matchSagas                           from './matchSagas';
import * as userProtectedSagas                   from './userProtectedSagas';
import * as userSagas                            from './userSagas';

export default function* codeCharacterSagas() {
  yield takeEvery(actionTypes.GET_AIS, aiSagas.getAIsSaga);
  yield takeEvery(actionTypes.COMPETE_AGAINST_AI, aiSagas.competeAgainstAISaga);
  yield takeEvery(actionTypes.RUN_CODE, codeSagas.codeSubmitSaga);
  yield takeEvery(actionTypes.LOCK_CODE, codeSagas.codeLockSaga);
  yield takeEvery(actionTypes.FETCH_CODE, codeSagas.codeFetchSaga);
  yield takeEvery(actionTypes.GET_CODE_STATUS, codeSagas.getCodeStatusSaga);
  yield takeEvery(actionTypes.EXECUTE_CODE, codeSagas.executeCodeSaga);
  yield takeEvery(actionTypes.GET_COMPILATION_STATUS, codeSagas.getCompilationStatusSaga);
  yield takeEvery(actionTypes.FETCH_LEADERBOARD_DATA, leaderBoardSagas.leaderboardGetPlayersSaga);
  yield takeEvery(actionTypes.START_CHALLENGE, leaderBoardSagas.leaderboardStartChallengeSaga);
  yield takeEvery(actionTypes.FETCH_GAME_LOG, matchSagas.fetchGameLogSaga);
  yield takeEvery(actionTypes.FETCH_MATCH_ALL_DATA, matchSagas.matchFetchAllSaga);
  yield takeEvery(actionTypes.GET_MATCH_DATA, matchSagas.matchFetchDataSaga);
  yield takeEvery(actionTypes.GET_LATEST_MATCH_ID, matchSagas.getLatestMatchIdSaga);
  yield takeEvery(actionTypes.GET_MATCH_STATUS, matchSagas.getMatchStatusSaga);
  yield takeEvery(actionTypes.GET_ALL_NOTIFICATIONS, userProtectedSagas.getAllNotificationsSaga);
  yield takeEvery(actionTypes.GET_UNREAD_NOTIFICATIONS, userProtectedSagas.getUnreadNotificationsSaga);
  yield takeEvery(actionTypes.DELETE_NOTIFICATION, userProtectedSagas.deleteNotificationSaga);
  yield takeEvery(actionTypes.GET_USERS_LENGTH, userProtectedSagas.getUsersLengthSagas);
  yield takeEvery(actionTypes.USER_AUTHENTICATE, userSagas.userLoginSaga);
  yield takeEvery(actionTypes.USER_AUTHENTICATE_CHECK, userSagas.userLoginStatusSaga);
  yield takeEvery(actionTypes.USER_LOGOUT, userSagas.userLogoutSaga);
  yield takeEvery(actionTypes.USER_SIGNUP, userSagas.userSignupSaga);
}
