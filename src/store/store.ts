import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import reduxThunk from "redux-thunk";
import { emptySplitApi, setAuthorizationGlobally } from "#rest/emptyApi";

// const serializedState = window.localStorage.getItem("store");
// const preloadedState = serializedState ? JSON.parse(serializedState) : undefined;

// detailed style guide: https://redux.js.org/style-guide/
export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([emptySplitApi.middleware, reduxThunk]),
  // preloadedState: preloadedState,
});


/*
store.subscribe(() => {
  const state = store.getState();
  const imposter = JSON.parse(JSON.stringify(state));
  window.localStorage.setItem("store", JSON.stringify(imposter));
});
*/

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
