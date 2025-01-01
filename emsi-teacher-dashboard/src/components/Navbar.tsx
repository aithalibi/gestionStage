import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import Profile from './Profile';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EMSI - Gestion des Stages
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Profile />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
