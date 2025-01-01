import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  AccountCircle,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Mock user data - À remplacer avec les données de votre backend
const mockUser: UserProfile = {
  name: 'Prof. Mohammed Alami',
  email: 'mohammed.alami@emsi.ma',
  role: 'Enseignant',
  avatar: '', // URL de l'avatar si disponible
};

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implémenter la logique de déconnexion ici
    console.log('Déconnexion...');
    handleClose();
  };

  const handleProfileClick = () => {
    // Implémenter la navigation vers la page de profil
    console.log('Navigation vers le profil...');
    handleClose();
  };

  const handleSettingsClick = () => {
    // Implémenter la navigation vers les paramètres
    console.log('Navigation vers les paramètres...');
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Typography
          variant="body2"
          sx={{
            mr: 1,
            display: { xs: 'none', sm: 'block' },
            color: 'white',
          }}
        >
          {mockUser.name}
        </Typography>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {mockUser.avatar ? (
            <Avatar
              src={mockUser.avatar}
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <AccountCircle sx={{ width: 32, height: 32, color: 'white' }} />
          )}
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {mockUser.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockUser.email}
          </Typography>
          <Typography variant="caption" color="primary">
            {mockUser.role}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Mon Profil
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Paramètres
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
