import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Amplify from "aws-amplify";
import Signup from "./components/Signup";
import Confirmation from "./components/Confirmation";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { COGNITO } from "./configs/aws";
import ProtectedRoute from "./components/ProtectedRoute";
import PortalDataProvider from "./components/dataProvider/DataProvider";

Amplify.configure({
  aws_cognito_region: COGNITO.REGION,
  aws_user_pools_id: COGNITO.USER_POOL_ID,
  aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

const App = () => {
  return (
    <PortalDataProvider>
      <Box style={{ backgroundColor: "rgb(245, 245, 245)", height: "100vh", position: "relative", display: "flex" }}>
        <Router>
          <Switch>
            <Route exact path="/register">
              <Card style={{ width: 500, margin: "auto", padding: "40px" }}><Signup /> </Card>
            </Route>
            <Route exact path="/login">
              <Card style={{ width: 500, margin: "auto", padding: "40px" }}><Login /> </Card>
            </Route>
            <Route path="/confirmation">
              <Card style={{ width: 500, margin: "auto", padding: "40px" }}> <Confirmation /> </Card>
            </Route>
            <Route path="/">
              <ProtectedRoute component={Dashboard} />
            </Route>
          </Switch>
        </Router>
      </Box>
    </PortalDataProvider>
  );
};

export default App;
