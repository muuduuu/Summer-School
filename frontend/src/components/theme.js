// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#10b981', // Vibrant emerald
      light: '#34d399',
      dark: '#059669',
    },
    accent: {
      main: '#f43f5e', // Rose pink
      light: '#fb7185',
      dark: '#e11d48',
    },
    background: {
      default: '#0f172a', // Slate dark
      paper: '#1e293b',
      gradient: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      accent: '#6366f1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(145deg, #6366f1 0%, #4f46e5 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(15, 23, 42, 0.1)',
    '0 4px 6px rgba(15, 23, 42, 0.1)',
    '0 10px 15px rgba(15, 23, 42, 0.1)',
    // ... add more shadow levels as needed
  ],
});

export default theme;
