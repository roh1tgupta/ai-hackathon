import React from "react";
import { Box, Grid } from "@material-ui/core";
import { PortalConext } from "../dataProvider/DataProvider";

let keyLabelArr = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "weight", label: "Weight (in kgs)" },
  { key: "height", label: "Height (in cms)" },
  { key: "gluco", label: "Glucose Level" },
  { key: "cholestrol", label: "Cholestrol" },
  { key: "physicalActivity", label: "Physical Activities" },
  { key: "alcohol", label: "Consume Alcohols" },
  { key: "smoke", label: "Smoking" },
];

export default function PatientInfo() {
  const { patientInfo } = React.useContext(PortalConext);
  return (
    <>
      <Grid container spacing={2}>
        {keyLabelArr.map(k => {
          return <Grid item md={4} sm={6} xs={12}>
            <Box>
              <span>{k.label}</span>
              <p><b>{patientInfo[k.key] || "NA"}</b>  </p>
            </Box>
          </Grid>
        })}
      </Grid>
    </>
  );
}