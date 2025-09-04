import './globals.css';
import { Inter } from 'next/font/google';
import ThemeProvider from '../../components/ThemeProvider';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'School Management App',
  description: 'A simple application to manage school data.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textDecoration: 'none' }}>
                  <Button color="inherit" component={Link} href="/">
                    School App
                  </Button>
                </Typography>
                <Button color="inherit" component={Link} href="/addSchool">
                  Add School
                </Button>
                <Button color="inherit" component={Link} href="/showSchools">
                  Show Schools
                </Button>
              </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, mt: { xs: '64px', sm: '64px' } }}>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
