export const combineReducers = (reducers) => {
  return Object.keys(reducers).reduce((state, key) => {
    state[key] = reducers[key](state[key], action); // add state from every reducer in to root state
    return state;
  }, {});
};
