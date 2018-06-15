import React                                from "react";
import { BrowserRouter }                    from "react-router-dom";
import { Provider }                         from 'react-redux';
import ReactDOM                             from "react-dom";
import App                                  from "./components/App";
import registerServiceWorker                from "./registerServiceWorker";
import { createStore, applyMiddleware }     from 'redux';
import createSagaMiddleware                 from 'redux-saga';
import { codeCharacterReducer }             from './redux/reducers';
import codeCharacterSagas                   from './redux/Sagas/sagas';
import initialState                         from './redux/initialState';
import { persistStore, persistReducer }     from 'redux-persist';
import storage                              from 'redux-persist/es/storage';
import { initializeRendererAssets }         from 'codecharacter-renderer';
import { PersistGate } from 'redux-persist/es/integration/react';


initializeRendererAssets();

const sagaMiddleware = createSagaMiddleware();
// const persistedState = localStorage.getItem('codecharacter') ? JSON.parse(localStorage.getItem('codecharacter')) : initialState;

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig,codeCharacterReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(codeCharacterSagas);

const persistor = persistStore(store);

const onBeforeLift = () => {
};

ReactDOM.render((
  <Provider store={store}>
    <PersistGate
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById("root"));
//registerServiceWorker();

