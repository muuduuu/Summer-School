import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './navbar.css';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: '0 4px 30px rgba(99, 102, 241, 0.1)',
  borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
  height: '64px',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '64px !important',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
    minHeight: '64px !important',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  padding: '6px 16px',
  borderRadius: '8px',
  fontWeight: 500,
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
    transform: 'translateY(-1px)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: '16px 24px',
  '&:hover': {
    background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
  },
  '& .MuiTypography-root': {
    fontSize: '1.1rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
}));

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoggedIn = !!localStorage.getItem("token"); // Check login status

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Dynamic menu items based on login status
  const menuItems = isLoggedIn
    ? [
        { text: 'Home', path: '/' },
        { text: 'About Us', path: '/About' },
        { text: 'User Dashboard', path: '/UserDashboard' },
        { text: 'Admin Dashboard', path: '/AdminDashboard' },
      ]
    : [
        { text: 'Home', path: '/' },
        { text: 'Register', path: '/Register' },
        { text: 'About Us', path: '/About' },
        { text: 'Sign In', path: '/SignIn' }, // Fixed case to match App.js
      ];

  const drawer = (
    <List sx={{ 
      background: theme.palette.background.default,
      height: '100%',
      paddingTop: 2,
    }}>
      {menuItems.map((item) => (
        <StyledListItem
          button 
          key={item.text} 
          component={Link} 
          to={item.path}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </StyledListItem>
      ))}
    </List>
  );

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar sx={{ justifyContent: 'flex-end' }}>
        {isMobile ? (
          <>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                marginLeft: 'auto',
                color: theme.palette.text.primary,
                padding: '8px',
                '&:hover': {
                  background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': { 
                  width: 280,
                  background: theme.palette.background.paper,
                  borderLeft: '1px solid rgba(99, 102, 241, 0.1)',
                },
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <StyledButton
                key={item.text}
                component={Link}
                to={item.path}
              >
                {item.text}
              </StyledButton>
            ))}
          </Box>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Navbar;
