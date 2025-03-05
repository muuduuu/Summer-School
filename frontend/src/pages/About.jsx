import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid2, 
  Card, 
  CardMedia, 
  Divider,
  Avatar,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const About = () => {
  const teamMembers = [
    {
      name: 'Jane Doe',
      role: 'Program Director',
      image: 'https://source.unsplash.com/random/300x300?person=1',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.'
    },
    {
      name: 'John Smith',
      role: 'Lead Instructor',
      image: 'https://source.unsplash.com/random/300x300?person=2',
      bio: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.'
    },
    {
      name: 'Emily Johnson',
      role: 'Academic Coordinator',
      image: 'https://source.unsplash.com/random/300x300?person=3',
      bio: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.'
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            About Our Summer School
          </Typography>
          <Divider sx={{ my: 3, mx: 'auto', width: '10%', borderColor: 'primary.main', borderWidth: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Transforming education through innovative summer learning experiences
          </Typography>
        </Box>

        {/* Mission Section */}
        <Box mb={10}>
          <Grid2 container spacing={4}>
            <Grid2 item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image="https://source.unsplash.com/random/600x400?classroom"
                alt="Summer school classroom"
                sx={{ borderRadius: 2 }}
              />
            </Grid2>
            <Grid2 item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Box>

        {/* Values Section */}
        <Box mb={10} textAlign="center">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 4 ,color: 'text.primary' }}>
            Our Values
          </Typography>
          
          <Grid2 container spacing={4}>
            <Grid2 item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
                  Academic Excellence
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                </Typography>
              </Card>
            </Grid2>
            
            <Grid2 item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Community Building
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum.
                </Typography>
              </Card>
            </Grid2>
            
            <Grid2 item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <LightbulbIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Innovation & Creativity
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                </Typography>
              </Card>
            </Grid2>
          </Grid2>
        </Box>

        {/* History Section */}
        <Box mb={10}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 4, textAlign: 'center', color: 'text.primary' }}>
            Our History
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
            Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. 
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse in orci enim.
          </Typography>
        </Box>

        {/* Team Section */}
        <Box mb={10}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 4, textAlign: 'center', color: 'text.primary' }}>
            Meet Our Team
          </Typography>
          <Grid2 container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid2 item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                  <Avatar 
                    src={member.image} 
                    alt={member.name}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary.main" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {member.bio}
                  </Typography>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Stats Section */}
        <Box mb={10}>
          <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 6 }}>
            <Container>
              <Grid2 container spacing={4} justifyContent="center">
                <Grid2 item xs={12} md={3} textAlign="center">
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    10+
                  </Typography>
                  <Typography variant="subtitle1">Years of Experience</Typography>
                </Grid2>
                <Grid2 item xs={12} md={3} textAlign="center">
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    5000+
                  </Typography>
                  <Typography variant="subtitle1">Students Educated</Typography>
                </Grid2>
                <Grid2 item xs={12} md={3} textAlign="center">
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    50+
                  </Typography>
                  <Typography variant="subtitle1">Expert Instructors</Typography>
                </Grid2>
                <Grid2 item xs={12} md={3} textAlign="center">
                  <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    25+
                  </Typography>
                  <Typography variant="subtitle1">Programs Offered</Typography>
                </Grid2>
              </Grid2>
            </Container>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default About;