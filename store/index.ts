import { AnyAction, configureStore, EnhancedStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Context, createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware, { END } from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { SagaStore, State } from './types';

import globalConfigSlice from './global-config/slice';

export const makeStore: MakeStore<State> = (context: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    logger,
  ];

  const reducer = (state: State, action: AnyAction) => {
    if (action.type === HYDRATE) {
      return {
        ...state,
        ...action.payload,
      };
    } else {
      return rootReducer(state, action);
    }
  };

  // 2: Add an extra parameter for applying middleware:
  const store = configureStore({ reducer, middleware });

  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

export const wrapper = createWrapper<State>(makeStore, { debug: process.env.NODE_ENV !== 'production' })

/**
 * 全局公共异步处理
 */
export const globalEndSagaTaskToPromise = async (store: EnhancedStore): Promise<void> => {
  store.dispatch(globalConfigSlice.actions.load());
  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise();
}
