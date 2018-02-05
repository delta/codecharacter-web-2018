import {
  changeAIid, changeIsGameFetching, changeLastUsed, getGameStatus, updateAIs,
  updateUnreadNotifications
} from '../actions';
import { call, put } from 'redux-saga/effects';
import { competeAgainstAI, getAIs } from '../../shellFetch/aiFetch';
import { competeSelf } from '../../shellFetch/matchFetch';

export function* getAIsSaga() {
  try  {
    let response = yield call(getAIs, {req: null, query: null});
    if(response.ais) {
      yield put(updateAIs(response.ais));
    }
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}

export function* competeAgainstAISaga(action) {
  try  {
    let query = {
      id: action.id
    };
    let response;
    if (action.id === -1) {
      response = yield call(competeSelf, {req: null, query: query});
    }
    else {
      response = yield call(competeAgainstAI, {req: null, query: query});
    }
    if (!response.success) {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response.message,
        createdAt: Date.now().toString()
      }]));
    }
    else {
      yield put(getGameStatus());
      yield put(changeLastUsed(1));
    }
  }
  catch (err) {
    console.log(err);
    // throw err;
  }
}
