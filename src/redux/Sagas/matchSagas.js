import {
  fetchGameLog,
  getLatestMatchId, getMatchStatus, matchFetchAll,
  matchFetchData
} from '../../shellFetch/matchFetch';
import { call, put } from 'redux-saga/effects';
import {
  changeLastMatchId, changeMatchStatus, updateCompilationStatus, updateGameLog,
  updateMatchAllData, updateUnreadNotifications
} from '../actions';

export function* matchFetchAllSaga() {
  try {
    const response = yield call(matchFetchAll,{req: null, query: null});
    console.log(response.matchesModified);
    if (!response.matchesModified && !response.redirect) {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response,
        createdAt: Date.now().toString()
      }]));
    }
    else {
      yield put(updateMatchAllData(response.matchesModified));
    }
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* matchFetchDataSaga(action) {
  try {

    let query = {
      matchId: action.matchId,
    };
    console.log(action);
    const response = yield call(matchFetchData,{req: null, query: query});
    yield put(updateGameLog(response.match.log.data));
    yield put(updateCompilationStatus(''));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* getLatestMatchIdSaga() {
  try {
    let response = yield call(getLatestMatchId,{req: null, query: null});
    yield put(changeLastMatchId(response.match ? response.match.id : -1));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* getMatchStatusSaga(action) {
  try {
    let query = {
      matchId: action.matchId
    };
    let response = yield call(getMatchStatus,{req: null, query: query});
    if (response.status) {
      yield put(changeMatchStatus(response.status));
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* fetchGameLogSaga(action) {
  try {
    let query = {
      matchId: action.matchId
    };
    let response = yield call(fetchGameLog,{req: null, query: query});
    if (response.match && response.match.log) {
      yield put(updateGameLog(response.match.log.data));
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
