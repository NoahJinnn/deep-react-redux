// Pure function
// Return next state

const initState = {
  user: "ntcd",
};

export const loginReducer = (prevState = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ACTION":
      return {
        ...prevState,
        payload,
      };
  }
  return prevState;
};
