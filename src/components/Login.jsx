import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import { useInput } from "./../utils/forms";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import PatientPortalHeader from "./PatientPortalHeader";

const Field = styled(TextField)({
  margin: "10px 0",
});

const DLink = styled(Link)({
  margin: "15px 0",
  textAlign: "right",
});

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let ab = await Auth.signIn(email, password);
      console.log(ab)
      let abcd = await Auth.currentAuthenticatedUser();
      console.log(abcd, "..rohit abcd")
      Toast("Success!!", "Login Successfully", "success");
      history.push("/");
    } catch (error) {
      console.log(error)
      Toast("Error!!", "jelo", "danger");
    }
    setLoading(false);
  };

  return (
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
        Sign in to an existing account
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
        {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
        Login
      </Button>
      <DLink to="/signup">Not Registered! Sign up &rarr;</DLink>
    </form>
  );
};

export default Login;
