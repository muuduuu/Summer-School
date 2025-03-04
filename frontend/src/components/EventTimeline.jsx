import React from 'react';
import { Card, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, Typography } from '@mui/material';

const EventTimeline = () => {
  return (
    <Card style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white' }}>
      {/* <Typography variant="h5" gutterBottom>Event Timeline</Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Registration Opens (Date)</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Early Bird Deadline (Date)</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
          </TimelineSeparator>
          <TimelineContent>Event Date (Date)</TimelineContent>
        </TimelineItem>
      </Timeline> */}
    </Card>
  );
};

export default EventTimeline;
