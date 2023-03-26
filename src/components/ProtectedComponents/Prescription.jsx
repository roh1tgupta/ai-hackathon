import React from "react";
import { Box, Grid } from "@material-ui/core";

const Prescription = () => {

  return (
    <Box margin="40px 0">
      <Grid container spacing={4}>
        <Grid item md={4} sm={4} xs={12}>
          <Box fontSize="18px" fontWeight="500">
            Prescription
          </Box>
        </Grid>
        <Grid item md={8} sm={8} xs={12}>
          <Box>
            Vegeterian Diet
          </Box>
          <Box margin="20px 0">
            Paracetamole 600mg BD for 6 days
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Prescription;
