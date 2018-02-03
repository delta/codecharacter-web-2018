import {
  changeCodeStatus,
  changeLastUsed,
  updateCode,
  updateCompilationStatus,
  getCodeStatus,
  updateUnreadNotifications
} from '../actions';
import { call, put } from 'redux-saga/effects';
import {
  codeCompile,
  codeFetch,
  codeLock,
  getCodeStatusFetch,
  getCompilationStatus
} from '../../shellFetch/codeFetch';
import { executeCode } from '../../shellFetch/matchFetch';

export function* codeSubmitSaga(action) {
  try {
    let query = {
      source: action.code,
    };

    yield put(updateCode(action.code));
    yield put(changeLastUsed(0));

    let response = yield call(codeCompile,{req: null, query: query});

    if (response.success) {
      yield put(updateUnreadNotifications([{
        type: 'INFORMATION',
        title: 'Compiling...',
        message: 'Your code is being compiled. Hang on tight.',
        createdAt: Date.now().toString()
      }]));
    }
    else {
      yield put(updateUnreadNotifications([{
        type: 'ERROR',
        title: 'Error',
        message: response.message,
        createdAt: Date.now().toString()
      }]));
    }

  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* codeFetchSaga() {
  try {
    const response = yield call(codeFetch,{req: null, query: null});
    if (response.success) {
      yield put(updateCode(response.source));
    }
    else {
      if (response.message === 'Internal server error') {
        yield put(updateUnreadNotifications([{
          type: 'ERROR',
          title: 'Error',
          message: response.message,
          createdAt: Date.now()
            .toString()
        }]));
      }
      else {
        yield put(updateCode(''));
      }
    }
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
    let response = yield call(codeLock,{req: null, query: query});
    if (response.success) {
      yield put(updateUnreadNotifications([{
        type: 'SUCCESS',
        title: 'Code Locked',
        message: 'Your code has been locked, you can now compete with others.',
        createdAt: Date.now().toString()
      }]));
    }
    else {
      if (response.message === 'Code locked failed!') {
        yield put(updateUnreadNotifications([{
          type: 'ERROR',
          title: 'Code Lock Failed',
          message: 'Server Error. Please Try Again later',
          createdAt: Date.now().toString()
        }]));
      }
      else {
        yield put(updateUnreadNotifications([{
          type: 'INFORMATION',
          title: 'Verify Email',
          message: 'Please verify your email to lock code. Check your inbox.',
          createdAt: Date.now().toString()
        }]));
      }
    }
  }
  catch(err) {
    console.log(err);
    throw err;
  }
}

export function* getCodeStatusSaga(action) {
  try {
    let response = yield call(getCodeStatusFetch, {req: null, query: null});
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
