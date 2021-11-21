import { createStore, combineReducers, applyMiddleware } from "./createStore";
import { loginReducer } from "./reducer";

const reducers = {
  loginState: loginReducer,
};

const initState = {};
const middlewares = [];
export const store = createStore({
  reducer: combineReducers(reducers),
  initState,
  enhancer: applyMiddleware(middlewares),
});
