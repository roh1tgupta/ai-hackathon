import React from "react";
import { styled } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Button, Box} from "@material-ui/core";
import { useInput } from "../../utils/forms";
import Card from "@material-ui/core/Card";

const Field = styled(TextField)({
  margin: "10px 0",
});

const FormTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
});

const FormSubtitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.2rem",
  margin: "20px 0 10px",
});

const PatientForm = () => {
  const { value: firstName, bind: bindFirstName } = useInput("");
  const { value: lastName, bind: bindLastName } = useInput("");
  const { value: dateOfBirth, bind: bindDateOfBirth } = useInput("");
  const { value: phoneNumber, bind: bindPhoneNumber } = useInput("");
  const { value: emailAddress, bind: bindEmailAddress } = useInput("");
  const { value: addressLine1, bind: bindAddressLine1 } = useInput("");
  const { value: addressLine2, bind: bindAddressLine2 } = useInput("");
  const { value: city, bind: bindCity } = useInput("");
  const { value: state, bind: bindState } = useInput("");
  const { value: zipCode, bind: bindZipCode } = useInput("");
  const { value: existingMedicalConditions, bind: bindExistingMedicalConditions } = useInput("");
  const { value: allergies, bind: bindAllergies } = useInput("");
  const { value: medications, bind: bindMedications } = useInput("");
  const { value: diet, bind: bindDiet } = useInput("");
  const { value: exerciseHabits, bind: bindExerciseHabits } = useInput("");
  const { value: sleepPatterns, bind: bindSleepPatterns } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      emailAddress,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      existingMedicalConditions,
      allergies,
      medications,
      diet,
      exerciseHabits,
      sleepPatterns,
    });
  };

  return (
      <Box>
    <Card style={{ width: 700, margin: "auto", padding: "40px" }}>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormTitle>Personal Information</FormTitle>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="First Name" {...bindFirstName} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Last Name" {...bindLastName} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Date of Birth" {...bindDateOfBirth} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Phone Number" {...bindPhoneNumber} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Email Address" {...bindEmailAddress} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormSubtitle>Address Information</FormSubtitle>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Address Lline1" {...bindAddressLine1} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Address Line2" {...bindAddressLine2} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="City" {...bindCity} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="State" {...bindState} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Zip Code" {...bindZipCode} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormSubtitle>Medical History</FormSubtitle>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Existing Medical Condition" {...bindExistingMedicalConditions} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Allergies" {...bindAllergies} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Medications" {...bindMedications} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <FormSubtitle>Life Style</FormSubtitle>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Diet" {...bindDiet} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Exercise Habbit" {...bindExerciseHabits} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field label="Sleep Pattern" {...bindSleepPatterns} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12}>
        <Button variant="contained" color="primary" size="large" fullWidth type="submit">
            Submit
        </Button>
        </Grid>
        
    </Grid>
    </form>
    </Card>
    </Box>
  );
  }
  export default PatientForm;