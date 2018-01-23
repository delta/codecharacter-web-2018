import { changeLastUsed, updateLeaderboard } from '../actions';
import { call, put } from 'redux-saga/effects';
import { leaderboardGetPlayers } from '../../shellFetch/leaderBoardFetch';
import { challengePlayer } from '../../shellFetch/matchFetch';

export function* leaderboardGetPlayersSaga() {
  try {
    const response = yield call(leaderboardGetPlayers, {req: null, query: null});
    yield put(updateLeaderboard(response));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* leaderboardStartChallengeSaga(action) {
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
