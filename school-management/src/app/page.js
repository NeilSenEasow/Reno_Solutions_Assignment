import Link from 'next/link';
import { FaPlusCircle, FaListAlt } from 'react-icons/fa';
import { Box, Typography, Paper } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        background: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 800 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, color: '#1a202c', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
        >
          Welcome to School Management
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          sx={{ mt: 2, color: '#4a5568' }}
        >
          Your all-in-one solution for managing school data. Quickly add new school entries and view them in a beautifully designed catalog.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, width: '100%', maxWidth: 800 }}>
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            p: 5,
            textAlign: 'center',
            borderRadius: '16px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-10px) scale(1.03)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            },
            cursor: 'pointer',
            border: '1px solid #e2e8f0',
          }}
        >
          <Box component={Link} href="/addSchool" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <FaPlusCircle size={60} style={{ color: '#1976d2', marginBottom: '1.5rem' }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
              Add New School
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Enter school details and store them securely in the database.
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            p: 5,
            textAlign: 'center',
            borderRadius: '16px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-10px) scale(1.03)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            },
            cursor: 'pointer',
            border: '1px solid #e2e8f0',
          }}
        >
          <Box component={Link} href="/showSchools" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <FaListAlt size={60} style={{ color: '#dc004e', marginBottom: '1.5rem' }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
              View All Schools
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Browse the complete list of schools in a sleek catalog format.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
