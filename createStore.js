/**
 *
 * @description This implementation is
 * just a rough implement which reflect
 * the idea how the store work
 */
export const createStore = ({ reducer, initState, enhancer }) => {
  let state = initState;

  if (typeof enhancer !== "undefined" && typeof enhancer === "function") {
    return enhancer(createStore)(reducer, state);
  }

  const listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }; // unsubscribe function
  };
  dispatch({ type: "@@redux/INIT" });
  return {
    getState,
    dispatch,
    subscribe,
  };
};

export const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers);

  return (state = {}, action) => {
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
};

export const applyMiddleware = (...middlewares) => {
  return (createStore) =>
    (...args) => {
      const store = createStore(...args);
      let dispatch = () => {
        throw new Error(
          "Dispatching while constructing your middleware is not allowed. " +
            "Other middleware would not be applied to this dispatch."
        );
      };

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
};

const compose = (arr) =>
  arr.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );

/* Middleware signature from Thunk 
const middledWare = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState, extraArgument);
  }
  return next(action);
};
*/
