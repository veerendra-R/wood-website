import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { useMemo } from "react";
import { persistReducer } from "redux-persist";
import loaderSlice from "../reduxtoolkit/loaderSlice";

var exampleInitialState = {};

let store;

const combineReducer = combineReducers({
  loaderflag: loaderSlice.reducer,
});

// Redux persist takes your redux state obj and saves it to persisted storage.then app launch it retrives this persisted state and saves it back to redux.
const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
  blacklist: [
    "signUp",
    "reset",
    "otpReducer",
    "jobs",
    "admin",
    "candidateReducer",
    "dropdownSlice",
    "agency",
    "freelancer",
    "companies",
  ], // the things in the blacklist is not be persisted
};

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "LOGOUT") {
    (state = undefined), (loginUser = undefined);
  }

  return combineReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore(initialState = exampleInitialState) {
  return configureStore({
    reducer: persistedReducer,
    middleware: [thunk], // this lets you call the action  that return a function instead of an an action obj.that fn recives the store's dispatch method which is then used ti dispatch regular synchronus actions inside the functions bofy once aysnc's operations have been completed
    initialState,
  });
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(), //this will returns an object with the current state
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
