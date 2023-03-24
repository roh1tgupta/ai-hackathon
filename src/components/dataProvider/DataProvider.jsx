import React, { useReducer } from "react";

const defaultContext = {
  abcd: "",
  file: "",
  predictFluMsg: "",
  username: "",
  dispatch: () => {}
};
export const PortalConext = React.createContext(defaultContext);

export default function PortalDataProvider(props) {
  const [state, dispatch] = useReducer(reducer, defaultContext);

  return (
    <PortalConext.Provider
      value={{
        ...state,
        dispatch: dispatch,
      }}
    >
      {props.children}
    </PortalConext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_FILE_INFO":
      return {
        ...state,
        file: action?.payload,
      };
    case "SET_PREDICT_FLU_MSG":
        return {
          ...state,
          predictFluMsg: action?.payload,
        };
        case "SET_USER_NAME":
          console.log("ation", action)
          return {
            ...state,
            username: action?.payload,
          };
    default:
      return { ...state, ...action };
  }
}
