import {
  changeLastUsed, getGameStatus, updateLeaderboard,
  updateUnreadNotifications
} from '../actions';
import { call, put } from 'redux-saga/effects';
import {
  leaderboardGetAllPlayers, leaderboardGetPlayers,
  searchUser
} from '../../shellFetch/leaderBoardFetch';
import { challengePlayer } from '../../shellFetch/matchFetch';

export function* leaderboardGetPlayersSaga(action) {
  try {
    const response = yield call(leaderboardGetAllPlayers, {req: null, query: null});
    if (response.success) {
      yield put(updateLeaderboard(response.ratings));
    }
    else if(!response.redirect){
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response,
        createdAt: Date.now().toString()
      }]));
    }
  }
  catch(err) {
    console.log(err);
    // throw err;
  }
}

export function* leaderboardStartChallengeSaga(action) {
  try {
    let query = {
      opponent: action.opponent
    };
    const response = yield call(challengePlayer, {req: null, query: query});
    if (!response.success) {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response.message,
        createdAt: Date.now().toString()
      }]));
    }
    yield put(getGameStatus());
    yield put(changeLastUsed(0));
  }
  catch(err) {
    console.log(err);
    // throw err;
  }
}

export function* searchUserSaga(action) {
  try {
    let query = {
      pattern: action.pattern,
      size: action.size
    };
    const response = yield call(searchUser, {req: null, query: query});
    if (response.users) {
      yield put(updateLeaderboard(response.users));
    }
    else {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response,
        createdAt: Date.now().toString()
      }]));
    }
  }
  catch(err) {
    console.log(err);
    // throw err;
  }
}
