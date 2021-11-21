import { createStore, combineReducers } from "./createStore";
import { loginReducer } from "./reducer";

const reducers = {
  loginState: loginReducer,
};

export const store = createStore(combineReducers(reducers));
