import React from 'react';
import { Box, Container, Typography, Link, Grid, TextField, Button, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Email, X } from '@mui/icons-material';

function Footer() {
  return (
    <Box sx={{ 
      backgroundColor: '#008080', 
      color: 'white', 
      py: 4, 
      borderTop: '4px solid #004d4d',
      boxShadow: '0px -3px 5px rgba(0,0,0,0.2)',
      mt: 'auto'  // Make sure the footer stays at the bottom
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>About Us</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Health Services Directory helps connect patients with essential healthcare services across the Republic of Ireland.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Quick Links</Typography>
            <Link href="/" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', opacity: 0.9, '&:hover': { textDecoration: 'underline' } }}>Home</Link>
            <Link href="/categories" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', opacity: 0.9, '&:hover': { textDecoration: 'underline' } }}>Categories</Link>
            <Link href="/bookmarks" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', opacity: 0.9, '&:hover': { textDecoration: 'underline' } }}>Bookmarks</Link>
            <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1, textDecoration: 'none', opacity: 0.9, '&:hover': { textDecoration: 'underline' } }}>Contact Us</Link>
          </Grid>

          {/* Contact & Social Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Us</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Email: contact@healthservices.com</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Phone: +353 123 4567</Typography>

            {/* Social Media Icons */}
            <Box sx={{ mt: 2 }}>
              <IconButton href="https://facebook.com" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 }}}><Facebook /></IconButton>
              <IconButton href="https://x.com" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 }}}><X /></IconButton>
              <IconButton href="https://linkedin.com/" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 }}}><LinkedIn /></IconButton>
              <IconButton href="mailto:contact@healthservices.com" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 }}}><Email /></IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Newsletter Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Subscribe to Our Newsletter</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField 
              label="Email Address" 
              variant="outlined" 
              size="small" 
              sx={{ 
                backgroundColor: 'white', 
                borderRadius: 1, 
                width: '300px', 
                input: { padding: '10px' } 
              }} 
            />
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#004d4d', color: 'white', '&:hover': { backgroundColor: '#006666' }}}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.2)', pt: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 Health Services Directory. All rights reserved.
          </Typography>
          <Link href="/terms" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, ml: 1 }}>Terms of Service</Link>
          
          <Link href="/privacy" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, ml: 1 }}>Privacy Policy</Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;