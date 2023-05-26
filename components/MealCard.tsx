'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import { Meal } from '@/types/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { addToFavourites, removeFromFavourites } from '@redux/meals';

type Props = {
  meal: Meal;
};

export const MealCard: React.FC<Props> = ({ meal }) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.meals.favourites);

  const { strMeal, strMealThumb, strCategory, idMeal } = meal;

  const handleAddToFavourites = () => {
    dispatch(addToFavourites(meal));
  };

  const handleRemoveFromFavourites = () => {
    dispatch(removeFromFavourites(meal));
  };

  const isFavourite = favourites.some((favourite) => favourite.idMeal === idMeal);

  return (
    <Card sx={{ p: 3, boxSizing: 'border-box', height: '94%' }} elevation={5}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mb={2}
      >
        <Tooltip title={strMeal} placement="bottom-start">
          <Typography
            variant="h6"
            component={'a'}
            href={`/mealdetails/${idMeal}`}
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              cursor: 'pointer',
              ':hover': {
                color: '#2f2f44',
              },
            }}
          >
            {strMeal}
          </Typography>
        </Tooltip>

        {isFavourite ? (
          <FavoriteIcon
            titleAccess='remove from favourites'
            sx={{
              transition: 'color 0.2s',
              cursor: 'pointer',
              ':hover': {
                color: '#2f2f44',
              },
            }}
            onClick={handleRemoveFromFavourites}
          />
        ) : (
          <FavoriteBorderIcon
            titleAccess='add to favourites'
            sx={{
              transition: 'color 0.2s',
              cursor: 'pointer',
              ':hover': {
                color: '#2f2f44',
              },
            }}
            onClick={handleAddToFavourites}
          />
        )}


      </Box>

      <CardMedia
        component={'img'}
        image={strMealThumb}
        alt={strMeal}
        title={strMeal}
        sx={{
          borderRadius: '10px',
          height: '200px',
          mb: 2,
        }}
      />

      <CardContent sx={{ p: 0, pb: 0 }}>
        <Typography mb={2}>{strCategory}</Typography>

        <Button variant="outlined" href={`/mealdetails/${idMeal}`}>
          Details
        </Button>
      </CardContent>
    </Card>
  );
};
