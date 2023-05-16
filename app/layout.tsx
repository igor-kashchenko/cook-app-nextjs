'use client';

import '@styles/global.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Navbar } from '@components/Navbar';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

export const metadata = {
  title: 'Cook App',
  description: 'Find your receipt!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <html lang='en'>
          <body>
            <Box
              sx={{
                height: '100vh',
                py: 2,
                boxSizing: 'border-box',
                backgroundColor: 'background.default',
              }}
            >
              <Container
                maxWidth='xl'
                disableGutters
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <Navbar />

                {children}
              </Container>
            </Box>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
