import React from "react";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Toast } from "./../utils/notifications";
import { Auth } from "aws-amplify";
import LockIcon from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      Toast("Success!!", "Logged out successfully!", "success");
      history.push("/signin");
    } catch (error) {
      Toast("Error!!", error?.message, "danger");
    }
  };

  return (
    <>
      <LockIcon /> <p>This is a private (auth protected) page. </p>
      
      
      <Button variant="contained" color="default" onClick={handleLogout}>
        <ExitToAppIcon /> Logout
      </Button>
    </>
  );
};

export default Dashboard;
