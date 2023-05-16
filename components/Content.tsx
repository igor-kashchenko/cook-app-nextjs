'use client';

import React from 'react';
import { SearchForm } from './SearchForm';
import Grid from '@mui/material/Grid';

export const Content = () => {
  return (
    <>
      <Grid item xs={3}>
        <SearchForm />
      </Grid>
    </>

  );
};
