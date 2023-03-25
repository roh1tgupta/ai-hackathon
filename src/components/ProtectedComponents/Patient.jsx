import React from "react";
import PatientInfo from "./PatientInfo";
import PatientForm from "./PatientForm";
import { Box } from "@material-ui/core";
import { PortalConext } from "../dataProvider/DataProvider";
import { Link } from "react-router-dom";

export default function Parent() {
  const { patientInfo } = React.useContext(PortalConext);
  const [isNewPatient, setIsNewPatient] = React.useState(true);

  React.useEffect(() => {
    if (patientInfo) {
      setIsNewPatient(false);
    }
  }, [])

  return isNewPatient ? <PatientForm setIsNewPatient={setIsNewPatient} /> : (
    <Box >
      <PatientInfo />
      <Link style={{position:"absolute", right:"50px", bottom: "50px"}} to="#" onClick={() => setIsNewPatient(true)}> New Patient &rarr;</Link>
    </Box>
  );
}