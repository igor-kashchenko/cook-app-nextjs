'use client';

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { MealCard } from './MealCard';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchRandomMeals } from '@redux/meals';
import { Typography } from '@mui/material';
import { Status } from '@/types/types';

export const RandomMealList = () => {
  const dispatch = useAppDispatch();
  const randomMeals = useAppSelector(state => state.meals.randomMeals.data);
  const isLoading = useAppSelector(state => state.meals.randomMeals.status) === Status.Loading;

  useEffect(() => {
    dispatch(fetchRandomMeals());
  }, [dispatch]);

  return (
    <>
      <Grid item xs={12} container columnSpacing={2} display={'flex'} mt={2}>
        <Grid item xs={12}>
          <Typography variant='h5' textAlign={'center'} mb={2} color={'primary'}>
            Random meals
          </Typography>
        </Grid>

        {isLoading
          ? (
            <Grid item xs={12} container justifyContent={'center'}>
              <CircularProgress />
            </Grid>
          )
          : randomMeals.map(meal => (
            <Grid item xs={3} key={meal.idMeal}>
              <MealCard meal={meal}/>
            </Grid>
          ))
        }
      </Grid>
    </>
  );
};
