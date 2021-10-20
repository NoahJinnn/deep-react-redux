export const useSelector = (getState) => {
  const store = useContext(storeContext);
  return getState(store.getState());
};

export const useDispatch = () => {
  const store = useContext(storeContext);
  return store.dispatch;
};
