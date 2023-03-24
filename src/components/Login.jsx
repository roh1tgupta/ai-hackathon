import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import { useInput } from "./../utils/forms";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import { Button, Box } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PatientPortalHeader from "./PatientPortalHeader";
import LoadingBox from "./LoadingBox";
import { PortalConext } from "./dataProvider/DataProvider";

const Field = styled(TextField)({
  margin: "10px 0",
});

const DLink = styled(Link)({
  margin: "15px 0",
  textAlign: "right",
});

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const { dispatch } = React.useContext(PortalConext)

  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.signIn(email, password);
      let cognitoUser = await Auth.currentAuthenticatedUser();
      dispatch({
        type: "SET_USER_NAME",
        payload: cognitoUser?.username
      })
      history.push("/");
    } catch (error) {
      console.log(error)
      Toast("Error!!", error?.message, "danger");
    }
    setLoading(false);
  };

  return (
    <Box position="relative">
      { loading && <LoadingBox loading="true" />}
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onSubmit={handleSubmit}
      >
        <PatientPortalHeader />

        <h1 style={{ fontSize: "22px", fontWeight: 800 }}>
          {" "}
        Sign In
      </h1>
        <Field label="Email" {...bindEmail} type="email" />
        <Field label="Password" type="password" {...bindPassword} />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={loading}
        >
        Login
      </Button>
        <DLink to="/register">Not Registered! Sign up &rarr;</DLink>
      </form>
    </Box>
  );
};

export default Login;
