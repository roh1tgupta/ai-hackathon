import React, { useContext } from "react";
import { styled } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Button, Box, Input, InputLabel, Tabs, Tab } from "@material-ui/core";
import { useInput } from "../../utils/forms";
import Card from "@material-ui/core/Card";
import axios from "axios";
import { PortalConext } from "../dataProvider/DataProvider";
import LoadingBox from "../LoadingBox";

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

const PatientForm = (props) => {
  const { dispatch } = useContext(PortalConext);
  const [loading, setIsLoading] = React.useState(false);
  const [files, setFiles] = React.useState();
  const [binFile, setBinFile] = React.useState();
  const { value: firstName, bind: bindFirstName } = useInput("");
  const { value: lastName, bind: bindLastName } = useInput("");
  const { value: age, bind: bindAge } = useInput("");
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

  const fileUrl = files?.[0] && URL.createObjectURL(files[0]);

  let patientInfo = {};
  const onChangeHandler = (e) => {
    setFiles(e.target.files)
    var reader = new FileReader();
    reader.onload = function () { setBinFile(reader.result) };
    reader.readAsDataURL(e.target.files[0]);
  }

  const onChangeHandler1 = (e) => {
    var reader = new FileReader();
    reader.onload = function () { 

      console.log(reader.result);
      // return ;
      let cleansedImage = reader.result.replace(/^data:text\/\w+;base64,/, "");
      let b64string = cleansedImage
      let buffer = Buffer.from(b64string, 'base64');
      axios({
        url: "https://runtime.sagemaker.us-east-2.amazonaws.com/endpoints/sagemaker-xgboost-2023-03-24-10-56-26-886/invocations",
        method: "POST",
        headers: {
          "Content-Type": "text/csv",
        },
        data: buffer
      }).then(data => {
        console.log(data);
      }).catch(err => console.log(err));
      // setBinFile(reader.result) 
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    dispatch({
      type: "SET_FILE_INFO",
      payload: binFile
    })
    let cleansedImage = binFile.replace(/^data:image\/\w+;base64,/, "");
    let b64string = cleansedImage
    let buffer = Buffer.from(b64string, 'base64');
    setIsLoading(true);
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
      dispatch({
        type: "SET_PATIENT_INFO",
        payload: {...patientInfo, result: data?.data }
      });
      console.log(data.data);
      props.setIsNewPatient(false);
    }).catch(err => console.log(err)).finally(() => setIsLoading(false))

    event.preventDefault();
    patientInfo = { 
      lastName,
      age,
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
      // binFile,
      // fileUrl 
    };
    dispatch({
      type: "SET_PATIENT_INFO",
      payload: {
        ...patientInfo,
      }
    })
    console.log(patientInfo);
    
  };

  return (
    <Box margin="25px 0" position="relative">
      { loading && <LoadingBox loading={true} /> }
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
            <Field label="Age" {...bindAge} type="number" fullWidth />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Field label="Phone Number" {...bindPhoneNumber} fullWidth />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Field label="Email Address" {...bindEmailAddress} type="email" fullWidth />
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
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
          {/* <Grid item xs={12}>
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
          </Grid>  */}
          <Grid item xs={12} sm={6}>
            {/* <Field label="Xray Photo" onChange={(e, file) => setFiles(file)} type="file" accept="image/*" fullWidth /> */}
            <Box position="relative" top="18px" borderBottom="1px solid grey" >
              <InputLabel htmlFor="input-with-icon-adornment">
                Upload XRAY
              </InputLabel>
              <input type="file" onChange={onChangeHandler} accept="image/*" required />
              {files && <img height="200px" width="200px" src={fileUrl} />}

              {/* <input type="file" onChange={onChangeHandler1} required /> */}
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
