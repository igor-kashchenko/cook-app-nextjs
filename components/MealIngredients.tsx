import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props = {
  ingredients: string[];
  measures: string[];
};

export const MealIngredients: React.FC<Props> = ({ingredients, measures }) => (
  <TableContainer component={Paper} elevation={5} sx={{mb: 2}}>
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell sx={{borderRight: 1, width: '25%'}}>Ingredient</TableCell>
          <TableCell align="right" sx={{borderRight: 1, width: '25%'}}>Measure</TableCell>
          <TableCell sx={{borderRight: 1, width: '25%'}}>Ingredient</TableCell>
          <TableCell align="right" sx={{width: '25%'}}>Measure</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ingredients.slice(0, Math.ceil(ingredients.length / 2)).map((ingredient, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row" sx={{borderRight: 1}}>{ingredient}</TableCell>
            <TableCell align="right" sx={{borderRight: 1}}>{measures[index]}</TableCell>
            <TableCell component="th" scope="row" sx={{borderRight: 1}}>
              {ingredients[index + Math.ceil(ingredients.length / 2)]}
            </TableCell>
            <TableCell align="right">{measures[index + Math.ceil(ingredients.length / 2)]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

