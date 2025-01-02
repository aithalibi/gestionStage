import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Gestion des Stages', path: '/pfe', icon: <SchoolIcon /> },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gestion des Stages EMSI
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                bgcolor: 'primary.dark',
                color: 'white',
                borderRight: 'none',
              },
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem sx={{ pb: 2, pt: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    EMSI Stage
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <SchoolIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Gestion des Stages" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/profile"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Mon Profil" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/chat"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <ChatIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                bgcolor: 'primary.dark',
                color: 'white',
                borderRight: 'none',
              },
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem sx={{ pb: 2, pt: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                    EMSI Stage
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <SchoolIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Gestion des Stages" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/profile"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Mon Profil" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    component={Link}
                    to="/chat"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <ChatIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Messages" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Drawer>
      </Box>
      <Toolbar />
    </>
  );
};

export default Sidebar;
