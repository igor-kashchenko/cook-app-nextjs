'use client';

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { MealCard } from './MealCard';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchRandomMeals } from '@redux/meals';
import { Typography } from '@mui/material';

export const RandomMealList = () => {
  const dispatch = useAppDispatch();
  const randomMeals = useAppSelector(state => state.meals.randomMeals);

  useEffect(() => {
    dispatch(fetchRandomMeals());
  }, [dispatch]);


  return (
    <>
      <Grid item xs={12} container columnSpacing={2} display={'flex'} mt={2}>
        <Grid item xs={12}>
          <Typography variant='h5' textAlign={'center'} mb={2}>
            Random meals
          </Typography>
        </Grid>

        {randomMeals.map(meal => (
          <Grid item xs={3} key={meal.idMeal}>
            <MealCard meal={meal}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
