/**
 *
 * @description This implementation is
 * just a rough implement which reflect
 * the idea how the store work
 */
export const createStore = ({ reducer }) => {
  let state = {};
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
