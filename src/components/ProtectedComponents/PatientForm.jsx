import React, { useContext } from "react";
import { styled } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button, Box, Input, InputLabel, Tabs, Tab } from "@material-ui/core";
import { useInput } from "../../utils/forms";
import Card from "@material-ui/core/Card";
import axios from "axios";
import { PortalConext } from "../dataProvider/DataProvider";

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
  const { file: fileFromstore, dispatch } = useContext(PortalConext)
  const [files, setFiles] = React.useState();
  const [binFile, setBinFile] = React.useState();
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


  const onChangeHandler = (e) => {
    setFiles(e.target.files)
    var reader = new FileReader();
    reader.onload = function () { setBinFile(reader.result) };
    reader.readAsDataURL(e.target.files[0]);
  }
  const handleSubmit = (event) => {
    dispatch({
      type: "SET_FILE_INFO",
      payload: binFile
    })
    let cleansedImage = binFile.replace(/^data:image\/\w+;base64,/, "");
    let b64string = cleansedImage
    let buffer = Buffer.from(b64string, 'base64');
    axios({
      url: "https://vbdh00lfoa.execute-api.us-east-1.amazonaws.com/prod/predict-flu",
      method: "POST",
      headers: {
        "Content-Type": "application/x-image",
      },
      data: buffer
    }).then(data => {
      dispatch({
        type: "SET_PREDICT_FLU_MSG",
        payload: data?.data
      });
      console.log(data.data)
    }).catch(err => console.log(err));

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
    <Box margin="25px 0">
      {/* <Card style={{ width: 700, margin: "auto", padding: "40px" }}> */}
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
            <Field label="Date of Birth" {...bindDateOfBirth} type="date" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field label="Phone Number" {...bindPhoneNumber} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field label="Email Address" {...bindEmailAddress} type="email" fullWidth />
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
            <Field label="Zip Code" {...bindZipCode} type="number" fullWidth />
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
          <Grid item xs={12} sm={6}>
            {/* <Field label="Xray Photo" onChange={(e, file) => setFiles(file)} type="file" accept="image/*" fullWidth /> */}
            <Box position="relative" top="10px" >
              <InputLabel htmlFor="input-with-icon-adornment">
                Upload XRAY
              </InputLabel>
              <Input type="file" onChange={onChangeHandler} accept="image/*" />
              {files && <img height="200px" width="200px" src={URL.createObjectURL(files[0])} />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="contained" color="primary" size="large" fullWidth type="submit">
              Submit
        </Button>
          </Grid>

        </Grid>
      </form>
      {/* </Card> */}
    </Box>
  );
}
export default PatientForm;
