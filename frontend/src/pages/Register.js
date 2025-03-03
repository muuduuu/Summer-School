
import { Card, Typography } from '@mui/material';
import React from 'react';

const Register = () => {
  return (
    <Card className="container my-5" style={{ height: '100%', padding: '20px', borderRadius: '10px', backgroundColor: 'black', color:'white' }}>
      <Typography variant='h5'>Register/Sign Up</Typography>
      <Typography variant='p'>Registration form will go here.</Typography>
    </Card>
  );
};

export default Register;
