import './Home.css'
import { Card, Grid2, Typography } from '@mui/material';
import React from 'react';
import HeroSection from '../components/herosection';
import EventTimeline from '../components/EventTimeline';


const Home = () => {
  return (
    <Card style={{ height: '100%' , padding: '20px', borderRadius: '10px', backgroundColor:'black' }} >
      <Grid2 size={12}>
            <Card sx={{ 
              backgroundColor: "black",
              padding: { xs: 0, sm: '20px' }
            }} >
              <HeroSection />
            </Card>
          </Grid2>
      {/* <Card style={{backgroundColor:'black' , color: 'white',padding:'40px', textAlign:'center' }} >
        <Typography variant='h5'>Welcome to the Event Registration</Typography>
        <Typography variant='h7'>Register now to participate in exciting events!</Typography>
      
        <Typography variant='h5'>About the Event</Typography>
        <Typography variant='h7'>Details about the event...</Typography>
        <Typography variant='h5'>Location</Typography>
        <Typography variant='h7'>Location details...</Typography>
      </Card> */}
      <Card style={{marginTop:'50px', paddingTop:'50px', backgroundColor: '#1e1e1e'}} >
      <EventTimeline />
      </Card>
    </Card>
  );
};

export default Home;
