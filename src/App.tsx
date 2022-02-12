import React from 'react';
import './App.css';

import SudokuTable from './components/table';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <SudokuTable title='Sudoku - Challenge' />
      </header>
    </div>
  );
}

export default App;
