import React from "react";
import { Box, Card } from "@material-ui/core";
import PatientForm from "./ProtectedComponents/PatientForm"
import { Route, Redirect } from "react-router-dom";
import Nav from "./ProtectedComponents/Nav";
import Dental from "./ProtectedComponents/Dental";
import Prescription from "./ProtectedComponents/Prescription";
import Vision from "./ProtectedComponents/Vision";

const Dashboard = () => {
  // const handleLogout = async () => {
  //   try {
  //     await Auth.signOut();
  //     Toast("Success!!", "Logged out successfully!", "success");
  //     history.push("/login");
  //   } catch (error) {
  //     Toast("Error!!", error?.message, "danger");
  //   }
  // };
  return (
    <Box margin={2} position="relative" height="100%" width="100%">
      <Nav />
      <Card style={{ margin: "20px 100px", padding: "0 50px", minHeight: "500px" }}>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/patientinfo" />}
        />
        <Route path="/patientinfo">
          <PatientForm />
        </Route>
        <Route path="/dental">
          <Dental />
        </Route>
        <Route path="/prescription">
          <Prescription />
        </Route>
        <Route path="/vision">
          <Vision />
        </Route>
      </Card>
    </Box>
  );
};

export default Dashboard;
