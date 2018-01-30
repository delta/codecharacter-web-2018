import { changeLastUsed, updateLeaderboard } from '../actions';
import { call, put } from 'redux-saga/effects';
import { leaderboardGetPlayers, searchUser } from '../../shellFetch/leaderBoardFetch';
import { challengePlayer } from '../../shellFetch/matchFetch';

export function* leaderboardGetPlayersSaga(action) {
  try {
    let query = {
      start: action.start,
      size: action.size
    };
    const response = yield call(leaderboardGetPlayers, {req: null, query: query});
    yield put(updateLeaderboard(response.usersSelected));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* leaderboardStartChallengeSaga(action) {
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

export function* searchUserSaga(action) {
  try {
    let query = {
      pattern: action.pattern,
      size: action.size
    };
    const response = yield call(searchUser, {req: null, query: query});
    console.log(response);
    yield put(updateLeaderboard(response.users));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}
