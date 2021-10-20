export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    const store = useContext(storeContext);
    const states = mapStateToProps(store.getState());
    const dispatchs = mapDispatchToProps(store.dispatch);
    return <Component {...states} {...dispatchs} />;
  };
};
