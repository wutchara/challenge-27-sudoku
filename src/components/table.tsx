import React, { Component, useState } from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';

interface TitleProps {
  title: string;
}


/**
 * [ 0 1 2]
 * [ 3 4 5]
 * [ 6 7 8]
 */
interface IState {
  value?: number;// TODO: for test only
  tableValues: string[][][][];
  loading: boolean;
}

interface ITableValue {
  rowNumber: number;
  blogNumber: number;
  innerX: number;
  innerY: number;
}

class SudokuTable extends Component<TitleProps, IState> {
  constructor(props: TitleProps) {
    super(props);

    this.state = this.resetState();
  }

  private resetState() {
    // create table values
    const tableValues = [];
    for (let row = 0; row < 3; row++) {
      const tableValue = [];
      for (let col = 0; col < 3; col++) {
        const tableValueRow = [];
        for (let col = 0; col < 3; col++) {
          tableValueRow.push(['', '', '']);
        }
        tableValue.push(tableValueRow);
      }
      tableValues.push(tableValue);
    }
    console.log('tableValues', tableValues);

    return {
      tableValues,
    //   [
    //     [
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //     ],
    //     [
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //     ],
    //     [
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //       [
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //         ['0', '0', '0'],
    //       ],
    //     ],
    // ],
      value: 0,
      loading: true,
    };
  }

  private createSmallBox(rowNumber: number, blogNumber: number, [innerX, innerY]: number[]) {
    const id = `input-${rowNumber}-${blogNumber}-[${innerX}, ${innerY}]`;

    const getIdObject = (idStr: string): ITableValue => {
      const spitedId = idStr.replace('input-', '').split('-');
      const index = spitedId[2].replace(' ', '').replace('[', '').replace(']', '').split(',');

      return {
        rowNumber: +spitedId[0],
        blogNumber: +spitedId[1],
        innerX: +index[0],
        innerY: +index[1],
      };
    };

    // set the real state
    const setNewValue = (value: number, config: ITableValue) => {
      const tableValues = JSON.parse(JSON.stringify(this.state.tableValues)); // clone
      const rowIndex = config.rowNumber - 1;
      const blogIndex = config.blogNumber - 1;
      tableValues[rowIndex][blogIndex][config.innerX][config.innerY] = value + '';
      console.log('tableValues', tableValues);
      this.setState({
        ...this.state,
        tableValues,
      });
      console.log('rowIndex', rowIndex);
      console.log('blogIndex', blogIndex);
      console.log('tableValues[rowIndex][blogIndex]', tableValues[rowIndex][blogIndex]);
    }

    const onCHangeState = (value: any) => {
      // console.log('value.target.id', value.target.id);
      console.log(value.target.value, typeof value.target.value);
      const newValue = Number(value.target.value);

      // TODO: display error
      // [1, 9] => 10 > value > 1
      if (!isNaN(newValue) && newValue > 0 && newValue < 10) {
        console.log('newValue', newValue);
        setNewValue(newValue, getIdObject( value.target.id));
      }
    };

    return (<Box key={'small-box-' + id}>
      <TextField
        focused
        value={this.state.tableValues[rowNumber - 1][blogNumber - 1][innerX][innerY]}
        id={id}
        // type="number"
        color='warning'
        InputProps={{
          style: {
            color: 'white'
          },
        }}
        onChange={onCHangeState}
      />
      </Box>);
  }
  
  private createBigBox(rowNumber: number, blogNumber: number) {
    const dimensions = [3, 3];
    const outerRows = [];
    for (let i = 0; i < dimensions[0]; i++) {
      const rows = [];
      for (let j = 0; j < dimensions[1]; j++) {
        rows.push(this.createSmallBox(rowNumber, blogNumber, [j, i]));
      }
      outerRows.push((
        <Grid item xs={4} key={'blog-row-' + rowNumber + '-' + blogNumber + '-' + i}>
          {rows}
        </Grid>
      ));
    }
  
    return outerRows;
  };
  
  private createBlog(rowNumber: number, blogNumber: number) {
    return (
      <Grid container spacing={0} border={4} borderColor="red">
        {this.createBigBox(rowNumber, blogNumber)}
      </Grid>
    );
  };
  
  private createOuterRow(rowNumber: number) {
    return (<Grid container spacing={0} className={'row-' + rowNumber}>
      <Grid item xs={4}>
        {this.createBlog(rowNumber, 1)}
      </Grid>
  
      <Grid item xs={4}>
        {this.createBlog(rowNumber, 2)}
      </Grid>
  
      <Grid item xs={4}>
        {this.createBlog(rowNumber, 3)}
      </Grid>
    </Grid>);
  };

  private handleClearBtn(event: any) {
    console.log('handleClearBtn', event);
    this.setState(this.resetState());
    this.setLoadingDelay();
  }

  private handleResolveBtn(event: any) {
    console.log('handleResolveBtn', event);
  }

  private setLoadingState(isLoading: boolean) {
    this.setState({
      ...this.state,
      loading: isLoading,
    });
  }

  private setLoadingDelay() {
    setTimeout(() => {
      this.setLoadingState(!this.state.loading);
    }, 3000); // wait 3 seconds
  }

  componentDidMount() {
    this.setLoadingDelay();
  }

  render() {
    const { title } = this.props;

    return (
      <>
        <h1>{title}</h1>
        {JSON.stringify(this.state)}
        <Button 
          type="button"
          onClick={() => this.setState({
            ...this.state,
            value: (this.state?.value || 0) + 1,
          })}
        >
          Set another value!: { this.state.value }
        </Button>
        <Fade
          in={this.state.loading}
          style={{
            transitionDelay: this.state.loading ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <Stack sx={{ width: '90%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        </Fade>
        
        
        <Grid container spacing={0} margin={2} padding={2}>
          {this.createOuterRow(1)}
          {this.createOuterRow(2)}
          {this.createOuterRow(3)}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Button variant="contained" fullWidth color='success' onClick={this.handleResolveBtn}>Resolve</Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant="outlined" fullWidth color='error' onClick={(e) => this.handleClearBtn(e)}>Clear</Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default SudokuTable;
