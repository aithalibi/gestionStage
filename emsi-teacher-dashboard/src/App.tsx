import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from './components/Sidebar';
import PFEManagement from './components/PFEManagement';
import TeacherProfile from './components/TeacherProfile';
import Chat from './components/Chat';
import theme from './theme';

function App() {
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
              height: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#f5f5f5',
            }}
          >
            <Routes>
              <Route path="/" element={<PFEManagement />} />
              <Route path="/pfe" element={<PFEManagement />} />
              <Route path="/profile" element={<TeacherProfile />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
