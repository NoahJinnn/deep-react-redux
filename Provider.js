const context = createContext();
const { Provider } = context;
export const StoreProvider = ({ store, children }) => {
  return <Provider value={store}>{children}</Provider>;
};
