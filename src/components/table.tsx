import React, { Component, useState } from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

    this.state = {
      tableValues: [
        [
        [['0', '0', '0'],
        ['0', '0', '0'],
        ['0', '0', '0']]
        ]
    ],
      value: 0,
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

    // TODO: set the real state
    const setNewValue = (value: number, config: ITableValue) => {
      const tableValues = JSON.parse(JSON.stringify(this.state.tableValues)); // clone
      tableValues[config.rowNumber - 1][config.blogNumber - 1][config.innerX][config.innerY] = value + '';
      console.log('tableValues', tableValues);
    }

    const onCHangeState = (value: any) => {
      // console.log('value.target.id', value.target.id);
      console.log(value.target.value, typeof value.target.value);
      const newValue = Number(value.target.value);

      // [1, 9] => 10 > value > 1
      if (!isNaN(newValue) && newValue > 0 && newValue < 10) {
        console.log('newValue', newValue);
        setNewValue(newValue, getIdObject( value.target.id));
        // this.setState({
        //   ...this.state,
        //   tableValues: [value.target.value],
        // });
      }
    };

    return (<Box key={'small-box-' + id}>
      <TextField
        focused
        value={(rowNumber === 1 && blogNumber === 1) ? this.state.tableValues[rowNumber - 1][blogNumber - 1][innerX][innerY] : ''}
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
        <Grid container spacing={0} margin={2} padding={2}>
          {this.createOuterRow(1)}
          {this.createOuterRow(2)}
          {this.createOuterRow(3)}
        </Grid>
      </>
    );
  }
};

export default SudokuTable;
