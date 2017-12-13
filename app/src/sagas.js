import {
  call,
  put,
  takeEvery,
  takeLatest
}                                     from 'redux-saga/effects';
import { action_types }               from './actions';
import { actions }                    from './reducers';

function* authenticateUser(action) {
  try {
    let query = {
      username: action.username,
      password: action.password
    };
    const response = yield call()
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

function* signoutUser() {
  try {
    let query = {
      username: action.username
    }

  }
  catch (err) {
    console.log(err);
    throw err;
  }
}
