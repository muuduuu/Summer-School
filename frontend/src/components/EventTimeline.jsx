import React from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, 
} from '@mui/lab';
import { Card, Typography, useTheme, useMediaQuery, Box } from '@mui/material';

const events = [
  {
    title: "Registration Opens",
    date: "May 1, 2024",
    description: "Early registrations get special discounts and exclusive benefits"
  },
  {
    title: "Early Bird Deadline",
    date: "May 15, 2024",
    description: "Last day to avail early bird discounts"
  },
  {
    title: "Registration Closes",
    date: "May 25, 2024",
    description: "Final day to register for the summer school"
  },
  {
    title: "Summer School Begins",
    date: "June 1, 2024",
    description: "First day of classes and orientation"
  },
  {
    title: "Project Submissions",
    date: "June 20, 2024",
    description: "Deadline for final project submissions"
  }
];

const EventTimeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      sx={{ 
        padding: { xs: '15px', sm: '20px', md: '30px' },
        backgroundColor: '#1e1e1e',
        color: 'white',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
        },
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          mb: 4,
          fontWeight: 600,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Event Timeline
      </Typography>

      <Timeline 
        position={isMobile ? "right" : "alternate"}
        sx={{ 
          p: { xs: 0, sm: 2 },
          '& .MuiTimelineItem-root:before': {
            flex: { xs: 0, sm: 1 }
          }
        }}
      >
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot 
                sx={{ 
                  bgcolor: 'primary.main',
                  boxShadow: '0 0 10px rgba(33, 150, 243, 0.5)',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.2)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              />
              {index !== events.length - 1 && (
                <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-5px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    color: 'primary.main',
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    fontWeight: 600,
                  }}
                >
                  {event.title}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'grey.400',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  {event.date}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'grey.300',
                    mt: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {event.description}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Card>
  );
};

export default EventTimeline;
