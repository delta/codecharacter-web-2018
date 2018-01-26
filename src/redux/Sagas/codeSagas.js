import {
  changeCodeStatus,
  changeLastUsed,
  updateCode,
  updateCompilationStatus
} from '../actions';
import { call, put } from 'redux-saga/effects';
import {
  codeCompile,
  codeFetch,
  codeLock,
  getCodeStatus,
  getCompilationStatus
} from '../../shellFetch/codeFetch';
import { executeCode } from '../../shellFetch/matchFetch';

export function* codeSubmitSaga(action) {
  try {
    let query = {
      source: action.code,
    };
    yield put(updateCode(action.code));
    yield call(codeCompile,{req: null, query: query});
    yield put(changeLastUsed(0));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* codeFetchSaga() {
  try {
    const response = yield call(codeFetch,{req: null, query: null});
    yield put(updateCode(response.source));
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* codeLockSaga(action) {
  try {
    let query = {
      source: action.code,
    };
    yield call(codeLock,{req: null, query: query});
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* getCodeStatusSaga(action) {
  try {
    let response = yield call(getCodeStatus, {req: null, query: null});
    yield put(changeCodeStatus(response.status));
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* executeCodeSaga() {
  try {
    yield put(changeLastUsed(1));
    yield call(executeCode, {req: null, query: null});
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export function* getCompilationStatusSaga() {
  try {
    let response = yield call(getCompilationStatus, {req: null, query: null});
    let y = '';
    let x = new Uint8Array(new Buffer(response.error));
    x.map(charCode => {
      y += String.fromCharCode(charCode);
    });
    if (response.error) {
      yield put(updateCompilationStatus(y));
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
