import React, { useReducer } from "react";
import { Auth } from "aws-amplify";

const defaultContext = {
  abcd: "",
  file: "",
  patientInfo: null,
  predictFluMsg: "",
  username: "",
  dispatch: () => { }
};
export const PortalConext = React.createContext(defaultContext);

export default function PortalDataProvider(props) {
  const [state, dispatch] = useReducer(reducer, defaultContext);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser().then(data => data?.username && dispatch({
      type: "SET_USER_NAME",
      payload: data.username
    })).catch(err => console.error(err));
  }, [])
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
      return {
        ...state,
        username: action?.payload,
      };
    case "SET_PATIENT_INFO":
      return {
        ...state,
        patientInfo: { ...action?.payload },
      };
      case "SET_STATE":
      return {
        ...defaultContext,
        ...action.payload,
      };
    default:
      return { ...state, ...action };
  }
}
