import React, { useContext } from "react";
import { styled } from "@material-ui/core/styles";
import { Grid,  } from "@material-ui/core";
import { Button, Box,  InputLabel, TextField, Select, MenuItem, FormControl } from "@material-ui/core";
import { useInput } from "../../utils/forms";
import axios from "axios";
import { PortalConext } from "../dataProvider/DataProvider";
import LoadingBox from "../LoadingBox";

const Field = styled(TextField)({
  margin: "10px 0",
});

const PatientForm = (props) => {
  const { dispatch } = useContext(PortalConext);
  const [loading, setIsLoading] = React.useState(false);
  const [files, setFiles] = React.useState();
  const [binFile, setBinFile] = React.useState();
  const { value: name, bind: bindName } = useInput("");
  const { value: age, bind: bindAge } = useInput("");
  const { value: height, bind: bindHeight } = useInput("");
  const { value: weight, bind: bindWeight } = useInput("");
  const { value: gluco, bind: bindGluco } = useInput("");
  const { value: cholestrol, bind: bindCholestrol } = useInput("");
  const { value: gender, bind: bindGender } = useInput("");
  const { value: smoke, bind: bindSmoke } = useInput("");
  const { value: alcohol, bind: bindAlcohol } = useInput("");
  const { value: physicalActivity, bind: bindPhysicalActivity } = useInput("");

  const fileUrl = files?.[0] && URL.createObjectURL(files[0]);

  let patientInfo = {};
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
        payload: { ...patientInfo, result: data?.data }
      });
      props.setIsNewPatient(false);
    }).catch(err => console.log(err)).finally(() => setIsLoading(false))

    event.preventDefault();
    patientInfo = {
      name,
      age,
      gluco,
      gender,
      smoke,
      physicalActivity,
      alcohol,
      cholestrol,
      height,
      weight
    };
    dispatch({
      type: "SET_PATIENT_INFO",
      payload: {
        ...patientInfo,
      }
    })
  };

  return (
    <Box margin="25px 0" position="relative">
      { loading && <LoadingBox loading={true} />}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field label="Name" {...bindName} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field label="Age" {...bindAge} type="number" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field label="Height in cms" {...bindHeight} type="number" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field label="Weight in kgs" {...bindWeight} type="number" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Glucose Level</InputLabel>
              <Select
                label="Glucose Level"
                {...bindGluco}
              >
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"Above Normal"}>Above Normal</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Cholestrol Level</InputLabel>
              <Select
                label="Smoke?"
                {...bindCholestrol}
              >
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"Above Normal"}>Above Normal</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
              <Select
                label="Gender"
                {...bindGender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Consume Alcohol? </InputLabel>
              <Select
                label="Consume Alcohol?"
                {...bindAlcohol}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Physically Active?</InputLabel>
              <Select
                label="Phycially Active"
                {...bindPhysicalActivity}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">Smoke?</InputLabel>
              <Select
                label="Smoke?"
                {...bindSmoke}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box position="relative" top="18px" borderBottom="1px solid grey" >
              <InputLabel htmlFor="input-with-icon-adornment">
                Upload XRAY
              </InputLabel>
              <input type="file" onChange={onChangeHandler} accept="image/*" required />
              {files && <img height="200px" width="200px" src={fileUrl} alt="xray_img" />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="contained" style={{marginTop: "20px"}} color="primary" size="large" fullWidth type="submit">
              Submit
        </Button>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
}
export default PatientForm;
