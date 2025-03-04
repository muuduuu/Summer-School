import React from 'react';
import { Box, Card, CardContent, Typography, ThemeProvider } from '@mui/material';
import AccordionUsage from './FreqAsk';
import theme from './theme';

export default function AboutEvent() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom align="center" style={{ color: theme.palette.text.primary }}>
          About the Event
        </Typography>

        <Card sx={{ maxWidth: 800, mx: 'auto', mb: 3, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Event Overview
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, color: theme.palette.text.secondary }}>
              Learn about the latest trends in our industry at our annual conference. Join us for a day of insightful talks,
              networking opportunities, and interactive sessions with industry leaders from around the globe.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 800, mx: 'auto', mb: 3, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Key Speakers
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, color: theme.palette.text.secondary }}>
              This year's lineup includes:
            </Typography>
            <ul>
              <li>Dr. Jane Smith - Leading expert in renewable energy solutions.</li>
              <li>John Doe - Renowned software development strategist.</li>
              <li>Emily Roe - Innovator in workplace diversity and inclusion.</li>
            </ul>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 800, mx: 'auto', mb: 3, backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Event Goals
            </Typography>
            <Typography variant="body1" sx={{ mt: 1.5, color: theme.palette.text.secondary }}>
              Our event aims to:
            </Typography>
            <ul>
              <li>Provide a platform for professional networking and collaboration.</li>
              <li>Share cutting-edge research and innovations.</li>
              <li>Discuss industry challenges and solutions.</li>
            </ul>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 800, mx: 'auto', mb: 3, backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h5" sx={{ p: 2, color: theme.palette.text.primary }}>
            Frequently Asked Questions
          </Typography>
          <AccordionUsage />
        </Card>
      </Box>
    </ThemeProvider>
  );
}
