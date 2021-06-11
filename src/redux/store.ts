import { useMemo } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";

import reducers from "./reducers";
import reducersMeta from "./reducersMeta";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const reducer = combineReducers({
  entities: reducers,
  entitiesMeta: reducersMeta,
});

export const epicMiddleware = createEpicMiddleware();

export function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = configureStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState) {
    _store = configureStore({
      ...preloadedState,
    });
  }

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
