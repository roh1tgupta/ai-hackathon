import React from "react";
import { Box, Card, Tabs, Tab } from "@material-ui/core";
import PatientPortalHeader from "../PatientPortalHeader";
import { Auth } from "aws-amplify";
import { useHistory, Link } from "react-router-dom";
import { PortalConext } from "../dataProvider/DataProvider";

const tabs = [
  { value: "patientinfo", label: "Upload Patient Info" },
  { value: "vision", label: "Vision" },
  { value: "dental", label: "Dental" },
  { value: "prescription", label: "Prescriptions" }
]
export const Nav = () => {
  const history = useHistory();
  const [value, setValue] = React.useState("patientinfo");
  const { username } = React.useContext(PortalConext);
  const handleChange = (e, value) => {
    setValue(value);
    history.push(`/${value}`);
  }
  const handleLogout = async () => {
    await Auth.signOut();
    history.push("/login");
  }
  return (
    <>
      <nav >
        <Card style={{ margin: "0 100px", padding: "0 50px" }}>
          <Box display="flex" justifyContent="space-between" margin="20px 0">
            <Box><PatientPortalHeader /> </Box>
            <Box fontSize="20px" textAlign="center" >
              <Box fontSize="12px">Hi <b>{username}</b> </Box>
              <Link to="#" onClick={handleLogout} >Logout</Link>
            </Box>
          </Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#3f51b5",
                },
              }}
            >
              {tabs?.map((tab) =>
                <Tab
                  value={tab.value}
                  key={tab.value}
                  label={tab.label}
                />)}
            </Tabs>
          </Box>
        </Card>
      </nav>
    </>
  );
};

export default Nav;
