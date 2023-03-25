import React from "react";
import { Auth } from "aws-amplify";
import { Route, Redirect } from "react-router-dom";
import { PortalConext } from "./dataProvider/DataProvider";

const ProtectedRoute = ({ component }) => {
  const [isAuthenticated, setLoggedIn] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const { state, dispatch } = React.useContext(PortalConext);
  React.useEffect(async () => {
      let user = null;
      try {
        user = await Auth.currentAuthenticatedUser();
        setLoading(false);
        if (user) {
          console.log(user?.username, state?.username, state)
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        console.log(e, "..in error")
        setLoggedIn(false);
        setLoading(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (!loading ?
    <Route
      render={(props) =>
        isAuthenticated ? (
          React.createElement(component)
        ) : (
            <Redirect to="/login" />
          )
      }
    /> : <div></div>
  );
};

export default ProtectedRoute;
