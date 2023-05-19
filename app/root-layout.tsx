'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

type Props = {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 2,
        boxSizing: 'border-box',
        backgroundColor: 'background.default',
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          height: 'auto',
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
