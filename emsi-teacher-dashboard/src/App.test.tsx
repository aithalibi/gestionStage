import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import App from './App';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </MemoryRouter>
  );
});
