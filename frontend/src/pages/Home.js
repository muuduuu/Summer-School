import './Home.css'
import { Box, Container, Typography, Card, Divider } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/herosection';
import EventTimeline from '../components/EventTimeline';
import AboutEvent from '../components/AboutEvent';

const Home = () => {
  const navigate = useNavigate();

  const handleApplyNowClick = () => {
    navigate('/register');
  };

  return (
    <Box 
      component="main" 
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: 8
      }}
    >
      {/* Hero Section - Full width */}
      <Box sx={{ 
        width: '100%', 
        mb: 6
      }}>
        <HeroSection />
      </Box>
      
      {/* Main Content Container */}
      <Container maxWidth="lg">
        {/* About Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            About Our Summer School
          </Typography>
          <Divider sx={{ mb: 4, mx: 'auto', width: '10%', borderColor: 'primary.main', borderWidth: 2 }} />
          
          <Card elevation={3} sx={{ 
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <AboutEvent />
          </Card>
        </Box>
        
        {/* Event Timeline Section */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            Program Schedule
          </Typography>
          <Divider sx={{ mb: 4, mx: 'auto', width: '10%', borderColor: 'primary.main', borderWidth: 2 }} />
          
          <Card elevation={3} sx={{ 
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}>
            <EventTimeline />
          </Card>
        </Box>
        
        {/* Call to Action Section - Optional */}
        <Box 
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" gutterBottom>
            Ready to join our Summer School?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Applications are now open for the upcoming session.
          </Typography>
          <Box 
            component="button"
            sx={{
              py: 1.5,
              px: 4,
              bgcolor: 'white',
              color: 'primary.main',
              border: 'none',
              borderRadius: 1,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'grey.100',
              }
            }}
            onClick={handleApplyNowClick}
          >
            Apply Now
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;