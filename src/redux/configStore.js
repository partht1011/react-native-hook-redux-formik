import {createStore, applyMiddleware, compose} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';
const persistConfig = {
  storage: AsyncStorage,
  whitelist: ['auth'],
  key: 'root',
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleWare();

export default () => {
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  let store = createStore(persistedReducer, {}, compose(...enhancers));
  let persistor = persistStore(store);

  store.runSaga = sagaMiddleware.run;
  store.runSaga(sagas);
  return {store, persistor};
};
