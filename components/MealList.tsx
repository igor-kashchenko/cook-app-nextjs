'use client';

import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { MealCard } from './MealCard';
import { useAppSelector } from '@redux/hooks';
import Typography from '@mui/material/Typography';

export const MealList = () => {
  const meals = useAppSelector(state => state.meals.meals);

  const isNotEmpty = meals.length > 0;
  return (
    <>
      <Grid item xs={9}>
        {isNotEmpty ? (
          <Paper sx={{p:2, minHeight: '93%'}} variant='outlined'>
            <Grid container columnSpacing={2}>
              {meals.map((meal) => (
                <Grid item xs={4} key={meal.idMeal}>
                  <MealCard meal={meal} />
                </Grid>
              ))}
            </Grid>
          </Paper>)
          : (
            <Typography variant='h4' height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              No results.
            </Typography>
          )
        }
      </Grid>
    </>
  );
};
