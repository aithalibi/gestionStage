import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Vert foncé
      light: '#4caf50', // Vert clair
      dark: '#1b5e20', // Vert très foncé
    },
    secondary: {
      main: '#81c784', // Vert pastel
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2e7d32',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1b5e20',
          color: '#ffffff',
        },
      },
    },
  },
});

export default theme;
