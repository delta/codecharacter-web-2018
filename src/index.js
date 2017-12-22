import React                                from "react";
import { BrowserRouter }                    from "react-router-dom";
import { Provider }                         from 'react-redux';
import ReactDOM                             from "react-dom";
import App                                  from "./components/App";
import registerServiceWorker                from "./registerServiceWorker";
import { createStore, applyMiddleware }     from 'redux';
import createSagaMiddleware                 from 'redux-saga';
import { codeCharacterReducer }             from './reducers';
import codeCharacterSagas                   from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  codeCharacterReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(codeCharacterSagas);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
