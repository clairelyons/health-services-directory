import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

function HamburgerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div className="hamburger-menu">
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '250px',
            padding: '1rem',
            backgroundColor: 'white',
          },
        }}
      >
        <div role="presentation" style={{ padding: '1rem' }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <List>
            {['Home', 'Categories', 'Search', 'Bookmarks', 'Profile'].map((text, index) => (
              <ListItem
                button
                key={text}
                sx={{
                  padding: '20px 0', // Increase padding for larger items
                  fontSize: '1.5rem', // Increase font size
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    color: '#008080', // Hover color
                  },
                }}
              >
                <ListItemText primary={<Typography sx={{ fontSize: '1.5rem' }}>{text}</Typography>} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default HamburgerMenu;