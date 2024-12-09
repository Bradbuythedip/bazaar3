import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ImageGenerator from '../components/ImageGenerator';
import { motion } from 'framer-motion';
import AIStyleQuestionnaire from '../components/AIStyleQuestionnaire';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openMeasurements, setOpenMeasurements] = useState(false);
  const [openAIQuestionnaire, setOpenAIQuestionnaire] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Dummy data - to be replaced with actual user data
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    type: 'Designer', // or 'Consumer'
    measurements: {
      chest: 40,
      waist: 34,
      hips: 42,
      inseam: 32,
    },
    favorites: [
      {
        id: 1,
        name: 'Organic Linen',
        image: '/images/fabrics/linen1.jpg',
      },
      // Add more favorites
    ],
    sketches: [
      {
        id: 1,
        title: 'Summer Collection 2025',
        image: '/images/sketches/sketch1.jpg',
        date: '2024-12-01',
      },
      // Add more sketches
    ],
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              {/* Profile Image Placeholder */}
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  bgcolor: 'grey.200',
                  margin: '0 auto',
                  mb: 2,
                }}
              />
              <Button variant="outlined" sx={{ mb: 2 }}>
                Change Photo
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {userProfile.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {userProfile.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Account Type: {userProfile.type}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenMeasurements(true)}
              sx={{ mt: 2 }}
            >
              Update Measurements
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Favorites" />
          <Tab label="Sketches" />
          <Tab label="AI Style Analysis" />
          {userProfile.type === 'Designer' && <Tab label="My Designs" />}
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          {userProfile.favorites.map((favorite) => (
            <Grid item xs={12} sm={6} md={4} key={favorite.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={favorite.image}
                  alt={favorite.name}
                />
                <CardContent>
                  <Typography variant="h6">{favorite.name}</Typography>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={4}>
          {userProfile.sketches.map((sketch) => (
            <Grid item xs={12} sm={6} md={4} key={sketch.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={sketch.image}
                  alt={sketch.title}
                />
                <CardContent>
                  <Typography variant="h6">{sketch.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(sketch.date).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <ImageGenerator
            onImageGenerated={(url) => {
              const newSketch = {
                id: userProfile.sketches.length + 1,
                title: 'AI Generated Design',
                image: url,
                date: new Date().toISOString().split('T')[0],
              };
              userProfile.sketches.push(newSketch);
              // In production, this would update the backend
            }}
            type="sketch"
          />
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Upload Existing Sketch
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box>
          <Typography variant="h5" gutterBottom>
            AI Style Analysis & Recommendations
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Get personalized sustainable fashion recommendations based on your preferences and measurements
          </Typography>
          
          {aiAnalysis ? (
            <>
              <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Your Current Style Analysis
                </Typography>
                <Typography
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                  }}
                >
                  {aiAnalysis}
                </Typography>
              </Paper>
              <Button
                variant="outlined"
                onClick={() => setOpenAIQuestionnaire(true)}
              >
                Update Style Analysis
              </Button>
            </>
          ) : (
            <AIStyleQuestionnaire />
          )}
        </Box>
      </TabPanel>

      {userProfile.type === 'Designer' && (
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            My Designs
          </Typography>
          {/* Add designs grid here */}
        </TabPanel>
      )}

      {/* Measurements Dialog */}
      <Dialog
        open={openMeasurements}
        onClose={() => setOpenMeasurements(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Measurements</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chest (inches)"
                  type="number"
                  defaultValue={userProfile.measurements.chest}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Waist (inches)"
                  type="number"
                  defaultValue={userProfile.measurements.waist}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hips (inches)"
                  type="number"
                  defaultValue={userProfile.measurements.hips}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Inseam (inches)"
                  type="number"
                  defaultValue={userProfile.measurements.inseam}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMeasurements(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenMeasurements(false)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;