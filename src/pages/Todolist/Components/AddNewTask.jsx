import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AddNewTask() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Module" variant="outlined" />
      <TextField id="filled-basic" label="Task" variant="filled" />
      <TextField id="standard-basic" label="Resources" variant="standard" />
      
    {/* <Stack direction="row" spacing={8}> */}
 
      
      <Button variant="contained" color="success">
        Add task
      </Button>
      
    {/* </Stack> */}
  


      
    </Box>
  );
}
