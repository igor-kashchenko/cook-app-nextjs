'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

export const Navbar = () => {
  return (
    <AppBar
      position='static'
      sx={{
        borderRadius: '8px 8px 0 0',
        backgroundColor: 'primary',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4,
        py: 1,
      }}
    >
      <Button color='secondary' href='/'>
        <LunchDiningIcon sx={{mr: 1}} />

        <Typography variant='body2'>
          Cook App
        </Typography>
      </Button>

      <Box display={'flex'}>
        <Button sx={{mr: 2}} href='/mylist' color='secondary'>
          <FavoriteBorderIcon sx={{mr: 1}} />

          <Typography variant='body2'>My list</Typography>
        </Button>

        <Button variant='outlined' color='secondary'>Log out</Button>
      </Box>
    </AppBar>
  );
};
