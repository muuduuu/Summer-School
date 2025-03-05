import React from 'react';
import { Box, Container, Grid2, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'primary.dark', color: 'common.white', py: 3 }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Company
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/" color="inherit" style={{ textDecoration: 'none' }}>Home</Link></li>
              <li><Link href="/about" color="inherit" style={{ textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="/services" color="inherit" style={{ textDecoration: 'none' }}>Services</Link></li>
              <li><Link href="/contact" color="inherit" style={{ textDecoration: 'none' }}>Contact</Link></li>
            </ul>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Resources
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/faq" color="inherit" style={{ textDecoration: 'none' }}>FAQ</Link></li>
              <li><Link href="/help" color="inherit" style={{ textDecoration: 'none' }}>Help</Link></li>
              <li><Link href="/support" color="inherit" style={{ textDecoration: 'none' }}>Support</Link></li>
            </ul>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Legal
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/terms" color="inherit" style={{ textDecoration: 'none' }}>Terms of Service</Link></li>
              <li><Link href="/privacy" color="inherit" style={{ textDecoration: 'none' }}>Privacy Policy</Link></li>
            </ul>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Follow Us
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="https://facebook.com" color="inherit" style={{ textDecoration: 'none' }}>Facebook</Link></li>
              <li><Link href="https://twitter.com" color="inherit" style={{ textDecoration: 'none' }}>Twitter</Link></li>
              <li><Link href="https://instagram.com" color="inherit" style={{ textDecoration: 'none' }}>Instagram</Link></li>
            </ul>
          </Grid2>
        </Grid2>
        <Typography variant="body2" color="inherit" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} ACM student Chapter, Amritapuri. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
