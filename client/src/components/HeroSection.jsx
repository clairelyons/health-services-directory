import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import './HeroSection.scss'; // We'll add some additional styling here for customization.

const HeroSection = () => {
  return (
    <Box
      className="hero-section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',  // Adjust height as needed
        backgroundImage: 'url("/path-to-your-image.jpg")',  // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff', // Set white text
        textAlign: 'center'
      }}
    >
      <Container>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to Health Services Directory
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4 }}>
          Find and access community services near you with ease.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            padding: '10px 20px',
            fontSize: '1.2rem',
          }}
        >
          Explore Services
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;