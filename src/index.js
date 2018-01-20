import React                                from "react";
import { BrowserRouter }                    from "react-router-dom";
import { Provider }                         from 'react-redux';
import ReactDOM                             from "react-dom";
import App                                  from "./components/App";
import registerServiceWorker                from "./registerServiceWorker";
import { createStore, applyMiddleware }     from 'redux';
import createSagaMiddleware                 from 'redux-saga';
import { codeCharacterReducer }             from './redux/reducers';
import codeCharacterSagas                   from './redux/sagas';
import initialState                         from './redux/initialState';

const sagaMiddleware = createSagaMiddleware();
const persistedState = localStorage.getItem('codecharacter') ? JSON.parse(localStorage.getItem('codecharacter')) : initialState;

const store = createStore(
  codeCharacterReducer,
  persistedState,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(codeCharacterSagas);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={ store}>
      <App/>
    </Provider>
  </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
