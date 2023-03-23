import React from "react";
import { Box } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import PatientForm from "./ProtectedComponents/PatientForm"
import { Route, Redirect } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  
  // const handleLogout = async () => {
  //   try {
  //     await Auth.signOut();
  //     Toast("Success!!", "Logged out successfully!", "success");
  //     history.push("/signin");
  //   } catch (error) {
  //     Toast("Error!!", error?.message, "danger");
  //   }
  // };
  return (
    <Box margin={2} position="relative" height="100%" width="100%">
      <PatientForm />
      <Route path="/">
        <Redirect to="/patientform" >
        <PatientForm />
        </Redirect>
      </Route>
    </Box>
  );
};

export default Dashboard;
