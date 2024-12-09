import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    title: 'Gallery',
    description: 'Browse our curated collection of sustainable fabrics',
    image: '/images/gallery.jpg',
    link: '/gallery',
  },
  {
    title: 'Bazaar',
    description: 'Shop unique designs or list your creations',
    image: '/images/bazaar.jpg',
    link: '/bazaar',
  },
  {
    title: 'Profile',
    description: 'Manage your preferences and view favorites',
    image: '/images/profile.jpg',
    link: '/profile',
  },
  {
    title: 'Our Initiative',
    description: 'Learn about our commitment to sustainable fashion',
    image: '/images/initiative.jpg',
    link: '/our-initiative',
  },
];

const MainHub = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        Welcome to Your Fashion Journey
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={6} key={feature.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    component={Link}
                    href={feature.link}
                    variant="contained"
                    fullWidth
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to get started?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Explore our sustainable fabric collection or browse unique designs in the Bazaar.
        </Typography>
        <Button
          component={Link}
          href="/gallery"
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
        >
          Browse Gallery
        </Button>
        <Button
          component={Link}
          href="/bazaar"
          variant="outlined"
          size="large"
        >
          Visit Bazaar
        </Button>
      </Box>
    </Box>
  );
};

export default MainHub;