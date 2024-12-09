import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import ImageGenerator from '../components/ImageGenerator';
import {
  Favorite,
  FavoriteBorder,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// This will be replaced with actual fabric data
const fabricTypes = ['All', 'Linen', 'Cotton', 'Wool', 'Denim', 'Silk'];

const dummyFabrics = [
  {
    id: 1,
    name: 'Organic Linen',
    type: 'Linen',
    image: '/images/fabrics/linen1.jpg',
    description: 'Sustainable organic linen from European flax',
    sustainability: 'Uses 88% less water than cotton',
    origin: 'Belgium',
    bestFor: ['Shirts', 'Dresses', 'Summer wear'],
  },
  // Add more fabric items here
];

const Gallery = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [fabrics, setFabrics] = useState(dummyFabrics);
  const [isAdmin, setIsAdmin] = useState(false); // In production, this would be based on user role

  const handleImageGenerated = (imageUrl: string) => {
    // Add new fabric with generated image
    const newFabric = {
      id: fabrics.length + 1,
      name: 'New Generated Fabric',
      type: selectedType === 'All' ? 'Linen' : selectedType,
      image: imageUrl,
      description: 'AI-generated sustainable fabric',
      sustainability: 'Pending sustainability information',
      origin: 'Custom Creation',
      bestFor: ['Custom pieces'],
    };

    setFabrics([...fabrics, newFabric]);
  };

  const handleTypeChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedType(newValue);
  };

  const toggleFavorite = (fabricId: number) => {
    setFavorites(prev =>
      prev.includes(fabricId)
        ? prev.filter(id => id !== fabricId)
        : [...prev, fabricId]
    );
  };

  const filteredFabrics = dummyFabrics.filter(
    fabric => selectedType === 'All' || fabric.type === selectedType
  );

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Sustainable Fabric Gallery
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="span">
              Filter by Type:
            </Typography>
          </Box>
          {isAdmin && (
            <Box>
              <ImageGenerator
                onImageGenerated={handleImageGenerated}
                type="fabric"
              />
            </Box>
          )}
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedType}
            onChange={handleTypeChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {fabricTypes.map(type => (
              <Tab key={type} label={type} value={type} />
            ))}
          </Tabs>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredFabrics.map((fabric, index) => (
          <Grid item xs={12} sm={6} md={4} key={fabric.id}>
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
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s',
                  },
                }}
                onClick={() => setSelectedFabric(fabric)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={fabric.image}
                  alt={fabric.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">{fabric.name}</Typography>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(fabric.id);
                      }}
                    >
                      {favorites.includes(fabric.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {fabric.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {selectedFabric && (
        <Dialog
          open={Boolean(selectedFabric)}
          onClose={() => setSelectedFabric(null)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{selectedFabric.name}</Typography>
              <IconButton onClick={() => setSelectedFabric(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img
                  src={selectedFabric.image}
                  alt={selectedFabric.name}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                  {selectedFabric.description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Sustainability:
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  {selectedFabric.sustainability}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Origin:
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  {selectedFabric.origin}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Best For:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {selectedFabric.bestFor.map((use: string) => (
                    <Chip
                      key={use}
                      label={use}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    // Handle fabric selection/purchase
                  }}
                >
                  Request Sample
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Gallery;