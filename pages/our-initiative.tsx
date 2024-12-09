import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/material';
import { motion } from 'framer-motion';

const sustainabilityFacts = [
  {
    title: 'Water Conservation',
    fact: 'Linen uses 88% less water in production than cotton',
    image: '/images/facts/water.jpg',
    description: 'Linen production is naturally more water-efficient, making it one of the most sustainable fabric choices available.',
  },
  // Add more sustainability facts
];

const roadmapItems = [
  {
    year: '2024',
    title: 'Platform Launch',
    description: 'Initial release focusing on connecting designers with consumers and promoting sustainable fabrics.',
  },
  {
    year: '2025 Q1',
    title: 'Community Features',
    description: 'Introduction of community engagement tools and designer challenges.',
  },
  {
    year: '2025 Q2',
    title: 'Web3 Integration',
    description: 'Implementation of blockchain features for transparency and rewards system.',
  },
  {
    year: '2025 Q3',
    title: 'AI Integration',
    description: 'Launch of AI-powered design tools and personalized recommendations.',
  },
];

const OurInitiative = () => {
  return (
    <Box sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(/images/initiative-hero.jpg)',
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Our Sustainable Fashion Initiative
          </Typography>
          <Typography variant="h5">
            Building a future where fashion meets sustainability
          </Typography>
        </Container>
      </Paper>

      {/* Mission Statement */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph align="center">
          At Caelus, we aim to promote the highest quality, sustainable and custom-made clothing
          available in the western world by connecting designers and buyers through a streamlined process.
          We emphasize a clean, futuristic approach to fashion while maintaining our commitment to
          environmental responsibility.
        </Typography>
      </Container>

      {/* Sustainability Facts */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
            Sustainability Impact
          </Typography>
          <Grid container spacing={4}>
            {sustainabilityFacts.map((fact, index) => (
              <Grid item xs={12} md={6} key={fact.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardMedia
                      component="img"
                      height="240"
                      image={fact.image}
                      alt={fact.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {fact.title}
                      </Typography>
                      <Typography variant="h5" color="primary" gutterBottom>
                        {fact.fact}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {fact.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Roadmap */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>
          Our Roadmap
        </Typography>
        <Timeline position="alternate">
          {roadmapItems.map((item, index) => (
            <TimelineItem key={item.year}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < roadmapItems.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h6" component="span">
                    {item.year}
                  </Typography>
                  <Typography>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Join Our Movement
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Together, we can revolutionize the fashion industry and create a more sustainable future.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default OurInitiative;