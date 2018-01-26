import { changeLastUsed, updateAIs } from '../actions';
import { call, put } from 'redux-saga/effects';
import { competeAgainstAI, getAIs } from '../../shellFetch/aiFetch';
import { competeSelf } from '../../shellFetch/matchFetch';

export function* getAIsSaga() {
  try  {
    let response = yield call(getAIs, {req: null, query: null});
    yield put(updateAIs(response.ais));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* competeAgainstAISaga(action) {
  try  {
    let query = {
      id: action.id
    };
    if (action.id === -1) {
      yield call(competeSelf, {req: null, query: query});
    }
    else {
      yield call(competeAgainstAI, {req: null, query: query});
    }
    yield put(changeLastUsed(1));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
