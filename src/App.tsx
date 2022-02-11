import React from 'react';
import './App.css';

import SudokuTable from './components/table';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <SudokuTable title='Sudoku - Challenge' />
        
        <Grid container spacing={4}>
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
