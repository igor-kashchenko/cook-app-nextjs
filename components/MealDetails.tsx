'use client';

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { fetchMealDetails } from '@redux/meals';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { parseTags } from '@utils/utils';
import Chip from '@mui/material/Chip';
import YouTubeIcon from '@mui/icons-material/YouTube';

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

  const parsedTags = strTags ? parseTags(strTags) : [];

  return (
    <Grid item xs={12} container>
      <Grid item xs={12} container alignItems={'center'} mb={2}>
        <Link href="/" sx={{ height: '22px' }}>
          <ArrowBackIosNewIcon
            color="primary"
            fontSize="small"
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
      </Grid>

      <Grid item xs={6} container px={2}>
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

      <Grid item xs={6} borderLeft={1} px={2}>
        <Typography variant={'body2'} color={'primary'}>
          {strInstructions}
        </Typography>
      </Grid>
    </Grid>
  );
};
