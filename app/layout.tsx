import '@styles/global.css';
import { Navbar } from '@components/Navbar';
import { ThemeProvider } from './theme-provider';
import { ReduxProvider } from './redux-provider';
import { MainLayout } from './root-layout';

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
    <ReduxProvider>
      <ThemeProvider>
        <html lang='en'>
          <body>
            <MainLayout>
              <Navbar />

              {children}
            </MainLayout>
          </body>
        </html>
      </ThemeProvider>
    </ReduxProvider>
  );
}
