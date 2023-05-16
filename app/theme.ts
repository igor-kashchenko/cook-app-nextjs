import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Mont, sans-serif',
    fontSize: 16,
  },
  palette: {
    background: {
      default: '#8FB5A5',
      paper: '#F8F8F8',
    },

    primary: {
      main: '#4c4c6d',
    },

    secondary: {
      main: '#E6E6E6',
    },
    text: {
      primary: '#4c4c6d',
    },
  },
});
