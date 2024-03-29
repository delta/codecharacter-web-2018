import {
  fetchGameLogFetch,
  getLatestMatchId, getMatchStatusFetch, matchFetchAll,
  matchFetchData
} from '../../shellFetch/matchFetch';
import { call, put } from 'redux-saga/effects';
import {
  changeLastMatchId, changeMatchStatus, getCodeStatus, updateCompilationStatus, updateGameDlogs,
  updateGameLog, getMatchStatus, fetchGameLog,
  updateMatchAllData, updateUnreadNotifications, changeIsFetching, changeIsGameFetching,
} from '../actions';

export function* matchFetchAllSaga() {
  try {
    yield put(changeIsFetching(true));
    const response = yield call(matchFetchAll,{req: null, query: null});
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
    yield put(changeIsFetching(false));
  }
  catch(err) {
    console.log(err);
    // throw err;
  }
}

export function* matchFetchDataSaga(action) {
  try {
    let query = {
      matchId: action.matchId,
    };
    const response = yield call(matchFetchData,{req: null, query: query});
    yield put(updateCompilationStatus(''));
    if (response.match && response.match.log) {
      yield put(updateGameLog(response.match.log.data));
    }
  }
  catch(err) {
    console.log(err);
    // throw err;
  }
}

export function* getGameStatusSaga(action) {
  try {

    let response = yield call(getLatestMatchId,{req: null, query: null});
    yield put(changeLastMatchId(response.match ? response.match.id : -1));
    yield put(getCodeStatus());
    if (response.match) {
      yield put(getMatchStatus(response.match.id));
      if(action.trigger) {
        yield put(fetchGameLog(response.match.id));
      }
    }
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* getMatchStatusSaga(action) {
  try {
    if(action.matchId === -1) {
      yield put(changeMatchStatus('IDLE'));
    }
    else {
      let query = {
        matchId: action.matchId
      };
      let response = yield call(getMatchStatusFetch, {
        req: null,
        query: query
      });
      if (response.status) {
        yield put(changeMatchStatus(response.status));
      }
    }
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* fetchGameLogSaga(action) {
  try {
    yield put(changeIsGameFetching(true));
    let query = {
      matchId: action.matchId
    };
    let response = yield call(fetchGameLogFetch,{req: null, query: query});
    var pako = window.pako;

    let player1DLog, player2DLog, gameLog;

    if (response.match && response.match.player1_dlog && response.match.player2_dlog) {
      let x = pako.inflate((response.match.player1_dlog.data));
      player1DLog = '';
      x.map(charCode => {
        player1DLog += String.fromCharCode(charCode);
      });

      x = pako.inflate((response.match.player2_dlog.data));
      player2DLog = '';
      x.map(charCode => {
        player2DLog += String.fromCharCode(charCode);
      });

      gameLog = pako.inflate((response.match.log.data));
    }

    if (response.match && response.match.log) {
      yield put(updateGameLog(gameLog));
      yield put(updateGameDlogs(player1DLog, player2DLog));
    }
    else if(response.err && !response.redirect) {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response.err,
        createdAt: Date.now().toString()
      }]));
    }
    yield put(changeIsGameFetching(false));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
