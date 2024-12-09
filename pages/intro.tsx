import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const IntroPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store email in localStorage or context for future use
      localStorage.setItem('userEmail', email);
      router.push('/profile-sort');
    }
  };

  return (
    <>
      <Head>
        <title>Welcome to Caelus - Sustainable Fashion Platform</title>
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to right bottom, #1a237e, #0d47a1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome to Caelus
              </Typography>
              
              <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
                Where sustainable fashion meets custom design
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Enter your email to begin"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      sx={{ backgroundColor: 'white' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        height: '100%',
                        background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                      }}
                    >
                      Get Started
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="body1" sx={{ mb: 3 }}>
                Join our community of designers and fashion enthusiasts committed to sustainable style
              </Typography>

              <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      🌿 Sustainable
                    </Typography>
                    <Typography variant="body2">
                      Supporting eco-friendly fashion practices and materials
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      ✨ Custom
                    </Typography>
                    <Typography variant="body2">
                      Unique designs tailored to your personal style
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      🤝 Community
                    </Typography>
                    <Typography variant="body2">
                      Connect with designers and like-minded individuals
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default IntroPage;