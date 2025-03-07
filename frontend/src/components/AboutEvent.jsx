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
              ACM Summer School aims to introduce coding culture amongst school students and cultivate their interest in computer science. The main vision is to promote innovation through technical skill building.
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
              <li>To Be Revealed</li>
              <li>To Be Revealed</li>
              <li>To Be Revealed</li>
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
