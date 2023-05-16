'use client';

import React, { createContext } from 'react';
import { ThemeProvider as Provider} from '@mui/material';
import { theme } from './theme';

export const ThemeContext = createContext({});

type Props = {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  );
};
