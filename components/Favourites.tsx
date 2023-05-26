'use client';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '@redux/hooks';
import React from 'react';
import { MealCard } from './MealCard';

export const Favourites = () => {
  const favourites = useAppSelector(state => state.meals.favourites);

  return (
    <Grid item xs={12} >
      <Paper sx={{p:2, height: '656px', overflow: 'auto'}} variant='outlined'>
        <Grid container columnSpacing={2}>
          {favourites.map((meal) => (
            <Grid item xs={3} key={meal.idMeal}>
              <MealCard meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};
