import React from "react";
import { useSelector } from "./hooks";
import { StoreProvider } from "./Provider";
import { store } from "./redux";

export default function App() {
  return (
    <StoreProvider store={store}>
      <Component></Component>
    </StoreProvider>
  );
}

const Component = () => {
  const { user } = useSelector((state) => state.loginState);
  return <div>Demo Redux from scratch {user}</div>;
};
