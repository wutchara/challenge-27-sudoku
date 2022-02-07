import React from 'react';
import logo from './logo.svg';
import './App.css';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const createSmallBox = (rowNumber: number, blogNumber: number, [innerX, innerY]: number[]) => {
  return (<Box>
    <TextField
      focused
      id={`input-${rowNumber}-${blogNumber}-[${innerX}, ${innerY}]`}
      type="number"
      color='warning'
      InputProps={{
        style: {
          color: 'white'
        },
      }}
    />
    </Box>);
}

const createBigBox = (rowNumber: number, blogNumber: number) => {
  const dimensions = [3, 3];
  const outerRows = [];
  for (let i = 0; i < dimensions[0]; i++) {
    const rows = [];
    for (let j = 0; j < dimensions[1]; j++) {
      rows.push(createSmallBox(rowNumber, blogNumber, [j, i]));
    }
    console.log('rows', rows.length);
    outerRows.push((
      <Grid item xs={4}>
        {rows}
      </Grid>
    ));
  }
  console.log('outerRows', outerRows.length);

  return outerRows;
};

const createBlog = (rowNumber: number, blogNumber: number) => {
  return (
    <Grid container spacing={0} xs={12} border={4} borderColor="red">
      {createBigBox(rowNumber, blogNumber)}
    </Grid>
  );
};

const createOuterRow = (rowNumber: number) => {
  return (<Grid container spacing={0} xs={12} className={'row-' + rowNumber}>
    <Grid item xs={4}>
      {createBlog(rowNumber, 1)}
    </Grid>

    <Grid item xs={4}>
      {createBlog(rowNumber, 2)}
    </Grid>

    <Grid item xs={4}>
      {createBlog(rowNumber, 3)}
    </Grid>
  </Grid>);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Grid container spacing={0} xs={12} margin={2} padding={2}>
          {createOuterRow(1)}
          {createOuterRow(2)}
          {createOuterRow(3)}
        </Grid>
        <Grid container spacing={4} xs={12}>
          <Grid item xs={4}>
            <Button variant="contained" fullWidth color='success'>Resolve</Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant="outlined" fullWidth color='error'>Clear</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
