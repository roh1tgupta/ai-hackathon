import Box from '@mui/material/Box';
import './App.css';
import React from "react";
import Button from "@material-ui/core/Button";

const TabsArr = [
  { label: "About us", value: "abount" },
  { label: "How it works", value: "how_it_work" }
];
function UploadImage() {
  const [value, setValue] = React.useState("");
  const [file, setFile] = React.useState();
  const [navValue, setNavValue] = React.useState(TabsArr[0].value)
  const changHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const imageSrc = URL.createObjectURL(e.target.files[0]);
      setValue(imageSrc)
    }
  }
  const submit = () => {
    const formData = new FormData();
    formData.append("files", file);
    fetch("url", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: formData,
    })
  }
  return (
    <Box height="100%" justifyContent="center" alignItems="center">
      {/* <Tabs value={navValue} onChange={(e, val) => setNavValue(val)}>
        {TabsArr.map(tab => <Tab label={tab.label} value={tab.value} />)}
      </Tabs> */}

      <Box>
        <input type="file" onchange={changHandler} onChange={changHandler} accept="image/*" />

        {value && <img width="200px" height="200px" src={value} alt="uploaded_image" />}
        <Button color="primary" variant="outlined">
          Upload/Submit
        </Button>
      </Box>

    </Box>


  );
}

export default UploadImage;
