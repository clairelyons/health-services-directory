import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './navbar.scss';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuItems = ['Home', 'Categories', 'Search', 'Bookmarks', 'Profile'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#008080' }}>
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.8rem', fontWeight: 'bold' }}>
        SláinteHub
        </Typography>

        {/* Hamburger Menu Icon (for mobile) */}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Drawer for Mobile */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ zIndex: 1300 }} // Add zIndex to bring the drawer above the header
        >
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {/* Close Icon */}
            <IconButton onClick={toggleDrawer(false)} sx={{ float: 'right', margin: '1rem' }}>
              <CloseIcon />
            </IconButton>
            {/* Menu Items */}
            <List>
              {menuItems.map((text) => (
                <ListItem button key={text} sx={{ '& .MuiListItemText-root': { fontWeight: 'bold', fontSize: '1.5rem' } }}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;