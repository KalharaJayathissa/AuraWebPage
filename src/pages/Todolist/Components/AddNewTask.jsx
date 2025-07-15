
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";



export default function AddNewTask({postFunc}) {
  const [inputData, setInputData] = useState({
    module: "",
    task: "",
    resources: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputData((prevInputData) => ({
      ...prevInputData,
      [name]: value,
    }));
  };

  // const tempobj = {    //used for testing
      
  //       "module": "6without id",
  //       "task": "test 2",
  //       "resources": "successful"
  //   };


  //console.log(inputData); //this is for testing

  return (
    <Box
      component="form"
      sx={{ p: 2, bgcolor: "background.paper", borderTop: "1px solid #e0e0e0" }}
      noValidate
      autoComplete="off"
    >
      <h3>Add new task:</h3>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="filled-basic"
            name="module"
            label="Module"
            variant="filled"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="filled-basic"
            name="task"
            label="Task"
            variant="filled"
            fullWidth
            onChange={(e) => {handleInputChange(e);}}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="filled-basic"
            name="resources"
            label="Resources"
            variant="filled"
            onChange={(e) => {handleInputChange(e);}}
          />
        </Grid>

        {/* <Stack direction="row" spacing={8}> */}

        <Button variant="contained" color="success" onClick={() => postFunc(inputData)}>
          Add task
        </Button>

        {/* </Stack> */}
      </Grid>
    </Box>
  );
}
