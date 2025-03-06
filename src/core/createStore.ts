import { createStore, applyMiddleware, compose, Reducer, Middleware } from 'redux';
import effect from '../middlewares/effect';
import XRedux from './xredux';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

export default function (
  this: XRedux,
  reducer: Reducer = state => state,
  initialState: any = {},
  externalMiddlewares: Array<Middleware> = [],
) {
  const middlewares = [
    ...externalMiddlewares,
    effect(this),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* istanbul ignore next */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__         // eslint-disable-line
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({   // eslint-disable-line
        shouldHotReload: false,
      })
      : compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers),
  );
  return store;
}
