import React from "react";
import { Box, Grid, Divider, makeStyles, createStyles, Typography } from "@material-ui/core";
import { PortalConext } from "../dataProvider/DataProvider";

let keyLabelArr = [
  {key: "firstName", label: "First Name"},
  {key: "lastName", label: "Last Name"},
  {key: "age", label: "Age"},
  {key: "existingMedicalConditions", label: "Existing Medical Condition"},
  {key: "allergies", label: "Allergies"},
  {key: "exerciseHabits", label: "Exercise Habits"},
];

export default function PatientInfo() {
  const { patientInfo } = React.useContext(PortalConext);
  console.log(patientInfo)
  return (
    <>
      <Grid container spacing={2}>
        {keyLabelArr.map(k => {
          console.log(k, k.label, patientInfo[k.key])
          return <Grid item md={6} sm={6} xs={12}>
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