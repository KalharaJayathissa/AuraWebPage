import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";


export default function AddNewTask() {
  return (
    <Box
      component="form"
      sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid #e0e0e0'}}
      noValidate
      autoComplete="off"
    >
      <h3>Add new task:</h3>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm ={6} md={3}>
          <TextField id="outlined-basic" label="Module" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm ={6} md={3}>
          <TextField id="filled-basic" label="Task" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm ={6} md={3}>
          <TextField id="standard-basic" label="Resources" variant="standard" />
        </Grid>

        {/* <Stack direction="row" spacing={8}> */}

        <Button variant="contained" color="success">
          Add task
        </Button>

        {/* </Stack> */}
      </Grid>
    </Box>
  );
}
