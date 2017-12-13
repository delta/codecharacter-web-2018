import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
