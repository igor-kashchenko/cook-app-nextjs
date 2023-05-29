'use client';

import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { MealCard } from './MealCard';
import { useAppSelector } from '@redux/hooks';
import Typography from '@mui/material/Typography';
import { Status } from '@/types/types';
import CircularProgress from '@mui/material/CircularProgress';

export const MealList = () => {
  const meals = useAppSelector(state => state.meals.meals.data);
  const isSearchPerformed = useAppSelector(state => state.meals.isSearchPerformed);
  const isLoading = useAppSelector(state => state.meals.meals.status) === Status.Loading;

  const isNotEmpty = meals?.length > 0;

  return (
    <>
      <Grid item xs={9}>
        {isLoading ? (
          <Grid container justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <CircularProgress />
          </Grid>
        ) : !isSearchPerformed ? (
          <Typography variant='h4' height={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            Search for a meal
          </Typography>
        ) : isNotEmpty ? (
          <Paper sx={{p:2, height: '800px', overflow: 'auto'}} variant='outlined'>
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
              No results
            </Typography>
          )
        }
      </Grid>
    </>
  );
};
