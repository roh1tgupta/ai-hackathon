import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import { useInput } from "./../utils/forms";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import {Button, Box} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PatientPortalHeader from "./PatientPortalHeader";
import LoadingBox from "./LoadingBox";

const Field = styled(TextField)({
  margin: "10px 0",
});

const DLink = styled(Link)({
  margin: "15px 0",
  textAlign: "right",
});

const Signup = () => {
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const { value: username, bind: bindUsername } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      Toast(
        "Error!!",
        "Password and Confirm Password should be same",
        "danger"
      );
      return;
    }
    try {
      await Auth.signUp({
        username: username,
        password: confirmPassword,
        attributes: {
          email,
        },
      });
      Toast("Success!!", "Signup was successful", "success");
      history.push("/confirmation");
    } catch (error) {
      console.error(error);
      Toast("Error!!", error.message, "danger");
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
        onSubmit={handleSignUp}
      >
        <PatientPortalHeader />
        <h1 style={{ fontSize: "22px", fontWeight: 800 }}>
          {" "}
        New Registration
      </h1>
        <Field label="Username" {...bindUsername} />
        <Field label="Email" {...bindEmail} type="email" />
        <Field label="Password" type="password" {...bindPassword} />
        <Field
          label="Confirm Password"
          type="password"
          {...bindConfirmPassword}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={loading}
        >
        Register
      </Button>
        <DLink to="/signin">Already Registered! Go to login &rarr;</DLink>
      </form>
    </Box>
  );
};

export default Signup;
