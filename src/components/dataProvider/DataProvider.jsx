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
    let pinfo = localStorage.getItem("p_info");
    if (pinfo) {
      try {
        pinfo = JSON.parse(pinfo);
        dispatch({
          type: "SET_PATIENT_INFO",
          payload: pinfo
        });
      } catch (err) {
        console.error("Error while fetching info from storage", err);
      }
    };
    Auth.currentAuthenticatedUser().then(data => dispatch({
      type: "SET_USER_NAME",
      payload: data?.username
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
      localStorage.setItem("p_info", JSON.stringify(action.payload));
      return {
        ...state,
        patientInfo: { ...action?.payload },
      };
    default:
      return { ...state, ...action };
  }
}
