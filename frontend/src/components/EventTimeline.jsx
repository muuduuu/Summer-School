import React from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot, 
} from '@mui/lab';
import { Card, Typography, useTheme, useMediaQuery, Box, ThemeProvider } from '@mui/material';
import theme from './theme';

const events = [
  {
    title: "Registration Opens",
    date: "May 1, 2024",
    description: "Early registrations get special discounts and exclusive benefits."
  },
  {
    title: "Early Bird Deadline",
    date: "May 15, 2024",
    description: "Last day to avail early bird discounts."
  },
  {
    title: "Registration Closes",
    date: "May 25, 2024",
    description: "Final day to register for the event."
  },
  {
    title: "Event Begins",
    date: "June 1, 2024",
    description: "First day of classes and orientation."
  },
  {
    title: "Project Submissions",
    date: "June 20, 2024",
    description: "Deadline for final project submissions."
  }
];

const EventTimeline = () => {
  const localTheme = useTheme();
  const isMobile = useMediaQuery(localTheme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <Card 
        sx={{ 
          padding: { xs: '15px', sm: '20px', md: '30px' },
          backgroundColor: localTheme.palette.background.default,
          color: localTheme.palette.text.primary,
          borderRadius: '15px',
          boxShadow: localTheme.shadows[5],
          '&:hover': {
            boxShadow: localTheme.shadows[10],
          },
        }}
      >
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            fontWeight: 600,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color:'white',
          }}
        >
          Event Timeline
        </Typography>

        <Timeline position={isMobile ? "right" : "alternate"}>
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== events.length - 1 && (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      bgcolor: 'background.paper',
                      boxShadow: localTheme.shadows[1],
                    },
                  }}
                >
                  <Typography variant="h6" component="h3" color="primary">
                    {event.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {event.date}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {event.description}
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Card>
    </ThemeProvider>
  );
};

export default EventTimeline;
