import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import PFEManagement from './components/PFEManagement';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 240px)` },
              ml: { sm: '240px' },
              bgcolor: 'background.default',
            }}
          >
            <Routes>
              {/* Redirection par défaut vers le dashboard PFE */}
              <Route path="/" element={<Navigate to="/pfe" replace />} />
              <Route path="/pfe" element={<PFEManagement />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
