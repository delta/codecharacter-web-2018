import {
  fetchGameLog,
  getLatestMatchId, getMatchStatus, matchFetchAll,
  matchFetchData
} from '../../shellFetch/matchFetch';
import { call, put } from 'redux-saga/effects';
import {
  changeLastMatchId, changeMatchStatus, updateCompilationStatus, updateGameLog,
  updateMatchAllData
} from '../actions';

export function* matchFetchAllSaga() {
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

export function* matchFetchDataSaga(action) {
  try {

    let query = {
      matchId: action.matchId,
    };
    console.log(action);
    const response = yield call(matchFetchData,{req: null, query: query});
    console.log(response, "Inga");
    yield put(updateGameLog(response.match.log.data));
    yield put(updateCompilationStatus(response.status));
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
    yield put(changeMatchStatus(response.status));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* fetchGameLogSaga(action) {
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
