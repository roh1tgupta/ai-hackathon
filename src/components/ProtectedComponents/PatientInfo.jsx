import React from "react";
import { Box, Grid } from "@material-ui/core";
import { PortalConext } from "../dataProvider/DataProvider";
import PatientDetailsUI from "./PatientDetailsUi";

export default function PatientInfo() {
  const { patientInfo} = React.useContext(PortalConext)
  return (
    <Box margin="20px 0">
      <Grid container spacing={4}>
        <Grid item md={4} sm={4} xs={12}>
          <Box fontSize="18px" fontWeight="500">
            Patient Details
        </Box>
        </Grid>
        <Grid item md={8} sm={8} xs={12}>
          <Box>
            <PatientDetailsUI />
          </Box>
        </Grid>

        <Grid item md={4} sm={4} xs={12}>
          <Box fontSize="18px" fontWeight="500">
            Test Result
        </Box>
        </Grid>
        <Grid item md={8} sm={8} xs={12}>
          <Box>
            {patientInfo?.result}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}