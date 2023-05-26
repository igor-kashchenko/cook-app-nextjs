'use client';

import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import { Favourites } from './Favourites';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { resetFavourites } from '@redux/meals';

export const FavouritesContainer = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.meals.favourites);

  const handleResetFavourites = () => {
    dispatch(resetFavourites());
  };

  const isSingleFavourite = favourites.length === 1;
  const isNotEmpty = favourites.length !== 0;

  return (
    <Grid item xs={12} container>
      <Grid
        item
        xs={12}
        container
        alignItems={'center'}
        mb={2}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Link href="/" sx={{ height: '22px' }}>
            <ArrowBackIosNewIcon
              color="primary"
              fontSize="small"
              titleAccess="go to the Home page"
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
            Your favourites
          </Typography>
        </Box>
      </Grid>

      {favourites.length > 0 && (
        <Grid item xs={12} container alignItems={'center'} justifyContent={'space-between'} mb={2} pl={2}>
          <Typography color="primary">
            {favourites.length} {isSingleFavourite ? 'meal' : 'meals'}
          </Typography>

          <Button
            variant="outlined"
            onClick={handleResetFavourites}
            sx={{ justifySelf: 'end' }}
          >
            Clear all
          </Button>
        </Grid>
      )}

      {isNotEmpty ? (
        <Favourites />
      ) : (
        <Box display={'flex'} justifyContent={'center'} flexGrow={1}>
          <Typography
            color={'primary'}
            variant="h4"
            mt={2}
          >
            No favourites yet
          </Typography>
        </Box>
      )}
    </Grid>
  );
};
