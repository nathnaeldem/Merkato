import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#1a1a1a', color: 'white', py: 6, mt: 'auto' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              i-store
            </Typography>
            <Typography variant="body2">
              Built by <a href='http://nathnael-demeke.pro.et'>Nathnael</a> 2024
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@i-store.com<br />
              Phone: (555) 123-4567
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block">About Us</Link>
            <Link href="#" color="inherit" display="block">Products</Link>
            <Link href="#" color="inherit" display="block">Contact</Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;