import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';

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
      id={`bazaar-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Dummy data - to be replaced with actual data
const listings = [
  {
    id: 1,
    title: 'Handcrafted Linen Dress',
    designer: 'Jane Doe',
    price: 299,
    image: '/images/listings/dress1.jpg',
    description: 'Custom-made linen dress with natural dyes',
    materials: ['Organic Linen'],
    size: 'M',
  },
  // Add more listings
];

const bounties = [
  {
    id: 1,
    title: 'Sustainable Summer Dress',
    budget: '200-300',
    description: 'Looking for a custom summer dress made from organic linen',
    requirements: ['Linen', 'Natural dyes', 'Size S'],
    status: 'Open',
  },
  // Add more bounties
];

const Bazaar = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openNewBounty, setOpenNewBounty] = useState(false);
  const [openNewListing, setOpenNewListing] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateBounty = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle bounty creation
    setOpenNewBounty(false);
  };

  const handleCreateListing = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle listing creation
    setOpenNewListing(false);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Caelus Bazaar
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Marketplace" />
          <Tab label="Bounties" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={() => setOpenNewListing(true)}
          >
            Create New Listing
          </Button>
        </Box>

        <Grid container spacing={4}>
          {listings.map((listing, index) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={listing.image}
                    alt={listing.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {listing.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      By {listing.designer}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ my: 1 }}>
                      ${listing.price}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {listing.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {listing.materials.map((material) => (
                        <Chip
                          key={material}
                          label={material}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                      ))}
                      <Chip label={`Size ${listing.size}`} size="small" />
                    </Box>
                    <Button variant="contained" fullWidth>
                      Purchase
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={() => setOpenNewBounty(true)}
          >
            Create New Bounty
          </Button>
        </Box>

        <Grid container spacing={4}>
          {bounties.map((bounty, index) => (
            <Grid item xs={12} sm={6} key={bounty.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {bounty.title}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Budget: ${bounty.budget}
                    </Typography>
                    <Typography variant="body1" sx={{ my: 2 }}>
                      {bounty.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {bounty.requirements.map((req) => (
                        <Chip
                          key={req}
                          label={req}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={bounty.status !== 'Open'}
                    >
                      Accept Bounty
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* New Bounty Dialog */}
      <Dialog
        open={openNewBounty}
        onClose={() => setOpenNewBounty(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Bounty</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateBounty} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Budget Range"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Requirements"
              multiline
              rows={2}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewBounty(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateBounty}>
            Create Bounty
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Listing Dialog */}
      <Dialog
        open={openNewListing}
        onClose={() => setOpenNewListing(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Listing</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateListing} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              select
              label="Size"
              required
              sx={{ mb: 2 }}
            >
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </TextField>
            {/* Add image upload functionality */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewListing(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateListing}>
            Create Listing
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bazaar;