import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Collapse,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { generateStyleAnalysis } from '../lib/gpt';

interface StylePreferences {
  styleType: string;
  colorPreferences: string[];
  occasionWear: string[];
  sustainabilityPriority: number;
  comfortLevel: string;
  existingWardrobe: string;
}

const initialPreferences: StylePreferences = {
  styleType: '',
  colorPreferences: [],
  occasionWear: [],
  sustainabilityPriority: 7,
  comfortLevel: 'balanced',
  existingWardrobe: '',
};

const AIStyleQuestionnaire = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState<StylePreferences>(initialPreferences);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const styleTypes = [
    'Minimalist',
    'Bohemian',
    'Classic',
    'Avant-garde',
    'Casual chic',
    'Professional',
  ];

  const colorOptions = [
    'Neutral',
    'Earth tones',
    'Pastels',
    'Bold colors',
    'Monochrome',
    'Jewel tones',
  ];

  const occasionOptions = [
    'Casual everyday',
    'Work/Professional',
    'Special occasions',
    'Active/Outdoor',
    'Evening wear',
  ];

  const handlePreferenceChange = (field: keyof StylePreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayPreference = (field: keyof StylePreferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value],
    }));
  };

  const steps = [
    {
      label: 'Style Type',
      content: (
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">What's your preferred style aesthetic?</FormLabel>
          <RadioGroup
            value={preferences.styleType}
            onChange={(e) => handlePreferenceChange('styleType', e.target.value)}
          >
            {styleTypes.map((style) => (
              <FormControlLabel
                key={style}
                value={style}
                control={<Radio />}
                label={style}
              />
            ))}
          </RadioGroup>
        </FormControl>
      ),
    },
    {
      label: 'Color Preferences',
      content: (
        <Box>
          <FormLabel component="legend">Select your preferred color palettes:</FormLabel>
          <Box sx={{ mt: 2 }}>
            {colorOptions.map((color) => (
              <Chip
                key={color}
                label={color}
                onClick={() => handleArrayPreference('colorPreferences', color)}
                color={preferences.colorPreferences.includes(color) ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>
      ),
    },
    {
      label: 'Occasions',
      content: (
        <Box>
          <FormLabel component="legend">What occasions do you need clothes for?</FormLabel>
          <Box sx={{ mt: 2 }}>
            {occasionOptions.map((occasion) => (
              <Chip
                key={occasion}
                label={occasion}
                onClick={() => handleArrayPreference('occasionWear', occasion)}
                color={preferences.occasionWear.includes(occasion) ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>
      ),
    },
    {
      label: 'Sustainability',
      content: (
        <Box>
          <FormLabel component="legend">
            How important is sustainability in your fashion choices? (1-10)
          </FormLabel>
          <Slider
            value={preferences.sustainabilityPriority}
            onChange={(_, value) => handlePreferenceChange('sustainabilityPriority', value)}
            min={1}
            max={10}
            marks
            valueLabelDisplay="auto"
            sx={{ mt: 4 }}
          />
        </Box>
      ),
    },
    {
      label: 'Comfort',
      content: (
        <FormControl fullWidth>
          <InputLabel>Comfort vs. Style Priority</InputLabel>
          <Select
            value={preferences.comfortLevel}
            onChange={(e) => handlePreferenceChange('comfortLevel', e.target.value)}
            label="Comfort vs. Style Priority"
          >
            <MenuItem value="comfort-focused">Comfort is my top priority</MenuItem>
            <MenuItem value="balanced">Balance of comfort and style</MenuItem>
            <MenuItem value="style-focused">Style is my top priority</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      label: 'Current Wardrobe',
      content: (
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Describe your current wardrobe and any specific needs"
          value={preferences.existingWardrobe}
          onChange={(e) => handlePreferenceChange('existingWardrobe', e.target.value)}
          helperText="Include any specific items you're looking to add or replace"
        />
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const preferencesString = `
        Style Type: ${preferences.styleType}
        Color Preferences: ${preferences.colorPreferences.join(', ')}
        Occasions: ${preferences.occasionWear.join(', ')}
        Sustainability Priority: ${preferences.sustainabilityPriority}/10
        Comfort Level: ${preferences.comfortLevel}
        Current Wardrobe: ${preferences.existingWardrobe}
      `;

      const result = await generateStyleAnalysis(
        preferencesString,
        '', // measurements will be passed from parent component
        'Focus on sustainable and eco-friendly recommendations',
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );

      setAnalysis(result);
    } catch (err) {
      setError('Failed to generate style analysis. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        AI Style Analysis
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4, minHeight: '200px' }}>
        {steps[activeStep].content}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Analysis'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </Box>

      <Collapse in={!!analysis || !!error}>
        <Box sx={{ mt: 4 }}>
          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}
          {analysis && (
            <Paper elevation={1} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Your Personalized Style Analysis
              </Typography>
              <Typography
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                {analysis}
              </Typography>
            </Paper>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AIStyleQuestionnaire;