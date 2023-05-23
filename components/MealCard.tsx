'use client';

import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CardMedia from '@mui/material/CardMedia';
import { Meal } from '@/types/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';

type Props = {
  meal: Meal;
};

export const MealCard: React.FC<Props> = ({ meal }) => {
  const { strMeal, strMealThumb, strCategory, idMeal } = meal;


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

        <Link href={'/favourite'} sx={{height: '27.43px'}}>
          <FavoriteBorderIcon
            sx={{
              transition: 'color 0.2s',
              cursor: 'pointer',
              ':hover': {
                color: '#2f2f44',
              },
            }}
          />
        </Link>

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
