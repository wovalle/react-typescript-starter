import { History } from 'history';
import { createStoreParams } from './index';
import { createStore, applyMiddleware, Store, compose } from 'redux';
import { logger } from '../middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import * as services from '../services';
import rootReducer, { RootState } from '../reducers';

const thunkWithServices = thunk.withExtraArgument(services);

export interface createStoreParams {
  history: History;
  initialState?: RootState;
}

function configureStoreDev(params: createStoreParams): Store<RootState> {

  const middlewares = [
    reduxImmutableStateInvariant(),
    thunkWithServices,
  ];
  // add support for Redux dev tools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, params.initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  )) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

function configureStoreProd(params: createStoreParams): Store<RootState> {
  const middlewares = [
    thunkWithServices,
  ];

  return createStore(rootReducer, params.initialState,
    compose(applyMiddleware(...middlewares)),
  );
}

const configureStore =
  process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
