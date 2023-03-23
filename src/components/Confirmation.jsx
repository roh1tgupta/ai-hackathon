import React from "react";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import { useInput } from "./../utils/forms";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import PatientPortalHeader from "./PatientPortalHeader"

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
  const { value: code, bind: bindCode } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.confirmSignUp(username, code);
      Toast("Success!!", "Verified Successfully", "success");
      history.push("/signin");
    } catch (error) {
      Toast("Error!!", error?.message, "danger");
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
        Verify Your Account
      </h1>
      <Field label="Username" {...bindUsername} type="string" />
      <Field label="Verification Code" {...bindCode} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={loading}
      >
        {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
        Verify your account
      </Button>
      <DLink to="/signup">Create an account &rarr;</DLink>
    </form>
  );
};

export default Signup;
