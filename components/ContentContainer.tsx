'use client';

import React from 'react';
import Grid from '@mui/material/Grid';

type Props = {
  children: React.ReactNode;
}

export const ContentContainer: React.FC<Props> = ({ children }) => {
  return (
    <Grid container columnSpacing={2} sx={{m: 0, p: 4 }}>
      {children}
    </Grid>
  );
};
