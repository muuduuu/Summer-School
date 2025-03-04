import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Container } from '@mui/material';
import LogoImage from '../assets/image/blue white am.png';
import '../components/NightSky.css';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      width: '100%', 
      height: { xs: 'calc(100vh - 0px)', sm: '100vh' }, 
      position: 'relative',
      padding: { xs: 0, sm: 2 },
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center', 
      borderRadius: { xs: '0px', sm: '50px' },
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
        zIndex: 1,
      },
    }} className="night-sky">
      <Container maxWidth="xl" sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
        <Box sx={{
          position: 'absolute',
          top: { xs: '5%', sm: '8%', md: '10%' },
          left: { xs: '5%', sm: '8%', md: '10%' },
          animation: 'floatAnimation 3s ease-in-out infinite',
          '@keyframes floatAnimation': {
            '0%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
            '100%': { transform: 'translateY(0px)' },
          },
        }}>
          <img 
            src={LogoImage} 
            alt="ACM Logo" 
            style={{
              width: isMobile ? '200px' : isTablet ? '250px' : '300px',
              height: 'auto',
              filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.3))',
            }}
          />
        </Box>
        <Box sx={{
          position: 'absolute',
          top: { xs: '30%', sm: '35%', md: '60%' },
          right: { xs: '5%', sm: '8%', md: '10%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'flex-end' },
          gap: { xs: 2, sm: 3, md: 4 },
          width: { xs: '90%', sm: 'auto' },
          mx: { xs: 'auto', sm: 0 },
          animation: 'slideIn 1s ease-out forwards',
          '@keyframes slideIn': {
            '0%': {
              transform: 'translateX(100%)',
              opacity: 0,
            },
            '100%': {
              transform: 'translateX(0)',
              opacity: 1,
            },
          },
        }}>
          <Typography 
            variant={isMobile ? 'h6' : isTablet ? 'h5' : 'h4'} 
            sx={{ 
              color: 'white',
              textAlign: { xs: 'center', sm: 'right' },
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              textShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, #fff, #818cf8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ACM Student Chapter presents
          </Typography>
          <Typography 
            variant={isMobile ? 'h4' : isTablet ? 'h3' : 'h2'} 
            sx={{ 
              color: theme.palette.primary.main,
              textAlign: { xs: 'center', sm: 'right' },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              textShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
              background: 'linear-gradient(90deg, #6366f1, #4f46e5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            ACM Summer School
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
