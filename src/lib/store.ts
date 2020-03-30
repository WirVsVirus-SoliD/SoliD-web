import Immutable from "immutable";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable
  } as any // fixme any type due to missing type definition, see
  // https://github.com/zalmoxisus/redux-devtools-extension/pull/731
});

let middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    collapsed(getState, action, logEntry) {
      return !logEntry.error;
    }
  });

  middleware = middleware.concat(logger);
}

export const initStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers", () => {
        const nextReducer = require("../reducers").default;
        store.replaceReducer(nextReducer);
      });
    }
  }
  return store;
};
