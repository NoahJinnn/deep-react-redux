export const storeContext = createContext();
const { Provider } = storeContext;
export const StoreProvider = ({ store, children }) => {
  return <Provider value={store}>{children}</Provider>;
};
