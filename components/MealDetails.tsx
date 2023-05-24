'use client';

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchMealDetails } from '@redux/meals';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { parseMeal, parseTags } from '@utils/utils';
import Chip from '@mui/material/Chip';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { MealIngredients } from './MealIngredients';
import { MealInstructions } from './MealInstructions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type Props = {
  id: string;
};

export const MealDetails: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const mealDetails = useAppSelector((state) => state.meals.mealDetails);

  useEffect(() => {
    dispatch(fetchMealDetails(id));
  }, [dispatch, id]);

  const { strMeal, strMealThumb, strArea, strCategory, strInstructions, strTags, strYoutube } = mealDetails || {};

  const { ingredients, measures } = parseMeal(mealDetails);

  const parsedTags = strTags ? parseTags(strTags) : [];

  return (
    <Grid item xs={12} container>
      <Grid item xs={12} container alignItems={'center'} mb={2} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          <Link href="/" sx={{ height: '22px' }}>
            <ArrowBackIosNewIcon
              color="primary"
              fontSize="small"
              titleAccess='go to the Home page'
              sx={{
                mr: 4,
                cursor: 'pointer',
                transition: 'color 0.2s',
                ':hover': {
                  color: '#2f2f44',
                },
              }}
            />
          </Link>

          <Typography variant="h4" color="primary">
            {strMeal}
          </Typography>
        </Box>

        <Link href={'/favourite'} sx={{height: '27.43px'}}>
          <FavoriteBorderIcon
            sx={{
              transition: 'color 0.2s',
              cursor: 'pointer',
              ':hover': {
                color: '#2f2f44',
              },
            }}
            titleAccess='add to Favourite'
          />
        </Link>
      </Grid>

      <Grid item xs={6} container pr={2}>
        <Box
          component={'img'}
          src={strMealThumb}
          alt={strMeal}
          borderRadius={2}
          sx={{ width: '100%', maxHeight: '90%', objectFit: 'cover' }}
          title={strMeal}
          mb={2}
        />

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} mb={2}>
          <Typography variant='h6' color="primary">
            {strCategory}
          </Typography>

          <Typography color="primary">
            {`Area: ${strArea}`}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
          {strTags ? (
            <Box>
              {parsedTags.map((tag: string) => (
                <Chip key={tag} label={tag} sx={{mr: 1}}/>
              ))}
            </Box>
          ) : (
            <Typography>No tags available</Typography>
          )}

          <Link height={'40px'} href={strYoutube} target='_blank' title='Watch the guide'>
            <YouTubeIcon fontSize='large' color='primary' sx={{
              cursor: 'pointer',
              transition: 'color 0.2s',
              ':hover': {
                color: '#2f2f44',
              },
            }}/>
          </Link>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} borderLeft={{ xs: 0, md: 1 }} pt={{ xs: 2, md: 0 }} pl={{ xs: 0, md: 2 }} pr={2}>
        <Typography variant='h6' textAlign={'center'} color={'primary'} mb={2}>
            Ingredients
        </Typography>

        <MealIngredients ingredients={ingredients} measures={measures} />

        <MealInstructions strInstructions={strInstructions} />
      </Grid>
    </Grid>
  );
};
