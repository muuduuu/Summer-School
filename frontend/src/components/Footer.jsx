import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box style={{ marginTop: '30px', padding: '20px', backgroundColor: '#1e1e1e', color: 'white', textAlign: 'center' }}>
      <Typography variant="body1">Connect with us:</Typography>
      <Typography variant="body2">Facebook | Twitter | Instagram</Typography>
      <Typography variant="body2">© 2025 Event Platform</Typography>
    </Box>
  );
};

export default Footer;
