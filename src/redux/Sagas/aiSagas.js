import { changeLastUsed, updateAIs } from '../actions';
import { call, put } from 'redux-saga/effects';
import { competeAgainstAI, getAIs } from '../../shellFetch/aiFetch';
import { competeSelf } from '../../shellFetch/matchFetch';

export function* getAIsSaga() {
  try  {
    let response = yield call(getAIs, {req: null, query: null});
    console.log(response);
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
    let response;
    if (action.id === -1) {
      response = yield call(competeSelf, {req: null, query: query});
    }
    else {
      response = yield call(competeAgainstAI, {req: null, query: query});
    }
    console.log(response, action.id, "Challenging with AI");
    yield put(changeLastUsed(1));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
