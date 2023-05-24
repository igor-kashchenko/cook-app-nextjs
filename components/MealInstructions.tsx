import Typography from '@mui/material/Typography';
import React from 'react';

type Props = {
  strInstructions: string | undefined;
}

export const MealInstructions: React.FC<Props> = ({ strInstructions }) => (
  <>
    {strInstructions?.split('\n').map((paragraph, index, array) => (
      <Typography variant={'body2'} color={'primary'} sx={{whiteSpace: 'pre-wrap', mb: index !== array.length - 1 ? 2 : 0}} key={index}>
        {paragraph}
      </Typography>
    ))}
  </>
);

