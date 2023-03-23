import React from "react";
import { Auth } from "aws-amplify";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const [isAuthenticated, setLoggedIn] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  console.log("reached here in private route")
  React.useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        console.log(user, "...user..")
        setLoading(false);
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        console.log(e, "..in error")
        setLoggedIn(false);
        setLoading(false);
      }
    })();
  }, []);

  return ( !loading ?
    <Route
      render={(props) =>
        isAuthenticated ? (
          React.createElement(component)
        ) : (
          <Redirect to="/signin" />
        )
      }
    /> : <div></div>
  );
};

export default ProtectedRoute;
