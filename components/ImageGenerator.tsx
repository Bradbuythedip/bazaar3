import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Close as CloseIcon, Image as ImageIcon, Upload as UploadIcon } from '@mui/icons-material';
import { generateFashionImage, uploadImage } from '../lib/imageGeneration';

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  type: 'garment' | 'fabric' | 'sketch';
}

// API key is loaded from environment variables

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated, type }) => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generationStyle, setGenerationStyle] = useState('realistic');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const imageUrl = await generateFashionImage(
        `${type === 'sketch' ? 'fashion sketch of ' : ''}${prompt} in ${generationStyle} style`,
        process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
      );
      onImageGenerated(imageUrl);
      setOpen(false);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const url = await uploadImage(file);
        setUploadedImage(url);
        onImageGenerated(url);
      } catch (err) {
        setError('Failed to upload image. Please try again.');
        console.error('Error:', err);
      }
    }
  };

  const getStyleOptions = () => {
    const baseStyles = [
      { 
        value: 'realistic-studio', 
        label: 'Studio Photography',
        description: 'Professional studio lighting with clean background'
      },
      { 
        value: 'realistic-editorial', 
        label: 'Editorial Style',
        description: 'Fashion magazine style with artistic composition'
      },
      { 
        value: 'realistic-natural', 
        label: 'Natural Light',
        description: 'Soft, natural lighting with organic feel'
      }
    ];

    const artisticStyles = [
      { 
        value: 'watercolor', 
        label: 'Watercolor Illustration',
        description: 'Soft, flowing artistic style with watercolor effects'
      },
      { 
        value: 'fashion-sketch', 
        label: 'Fashion Sketch',
        description: 'Professional fashion illustration style'
      },
      { 
        value: 'contemporary-art', 
        label: 'Contemporary Art',
        description: 'Modern artistic interpretation with bold elements'
      }
    ];

    const technicalStyles = [
      { 
        value: 'technical-flat', 
        label: 'Technical Flat',
        description: 'Detailed technical drawing with specifications'
      },
      { 
        value: 'construction-detail', 
        label: 'Construction Detail',
        description: 'Focus on construction and assembly details'
      },
      { 
        value: 'pattern-draft', 
        label: 'Pattern Making',
        description: 'Pattern-making style with measurements'
      }
    ];

    const textureStyles = [
      { 
        value: 'macro-detail', 
        label: 'Macro Texture',
        description: 'Close-up view of fabric texture and details'
      },
      { 
        value: 'weave-pattern', 
        label: 'Weave Pattern',
        description: 'Detailed view of fabric construction'
      },
      { 
        value: 'drape-study', 
        label: 'Drape Study',
        description: 'Focus on fabric behavior and movement'
      }
    ];

    // Return different style options based on the type
    switch (type) {
      case 'fabric':
        return [
          ...baseStyles,
          ...textureStyles,
          { 
            value: 'sustainable-story', 
            label: 'Sustainability Story',
            description: 'Showcasing sustainable aspects and production'
          }
        ];
      case 'sketch':
        return [
          ...artisticStyles,
          ...technicalStyles,
          { 
            value: 'zero-waste', 
            label: 'Zero Waste Design',
            description: 'Emphasizing zero-waste pattern cutting'
          }
        ];
      case 'garment':
        return [
          ...baseStyles,
          ...artisticStyles,
          { 
            value: 'ethical-production', 
            label: 'Ethical Production',
            description: 'Highlighting ethical manufacturing details'
          }
        ];
      default:
        return baseStyles;
    }
  };

  const styleOptions = getStyleOptions();

  const getPromptGuidance = () => {
    switch (type) {
      case 'garment':
        return {
          placeholder: 'e.g., A sustainable linen summer dress with flowing silhouette',
          suggestions: [
            'Describe the garment type and silhouette',
            'Specify sustainable materials used',
            'Mention any unique design features',
            'Include color preferences',
            'Note any specific sustainable construction methods'
          ],
          examples: [
            'A zero-waste wrap dress in organic hemp fabric with natural dyes',
            'Modular design blazer in recycled wool with detachable elements',
            'Minimalist linen jumpsuit with adjustable fitting elements'
          ]
        };
      case 'fabric':
        return {
          placeholder: 'e.g., Organic cotton fabric with natural indigo dye pattern',
          suggestions: [
            'Specify the fiber type and composition',
            'Describe the weave or knit pattern',
            'Mention any dyeing or finishing techniques',
            'Include texture characteristics',
            'Note any sustainable certifications'
          ],
          examples: [
            'Heavyweight organic linen with natural slub texture',
            'Peace silk with botanical print using natural dyes',
            'Recycled cotton denim with zero-water washing process'
          ]
        };
      case 'sketch':
        return {
          placeholder: 'e.g., Fashion sketch of a modern sustainable suit design',
          suggestions: [
            'Describe the overall design concept',
            'Specify construction details',
            'Mention sustainable elements',
            'Include material suggestions',
            'Note any innovative features'
          ],
          examples: [
            'Technical sketch of zero-waste pattern cut dress',
            'Artistic illustration of modular coat design',
            'Detailed sketch of biodegradable formal wear'
          ]
        };
      default:
        return {
          placeholder: 'Enter your image description',
          suggestions: [],
          examples: []
        };
    }
  };

  const promptGuidance = getPromptGuidance();

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ImageIcon />}
        onClick={() => setOpen(true)}
        sx={{ mr: 2 }}
      >
        Generate {type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>

      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-image"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="upload-image">
        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadIcon />}
        >
          Upload Image
        </Button>
      </label>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Generate {type.charAt(0).toUpperCase() + type.slice(1)} Image
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Image Description"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={promptGuidance.placeholder}
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" gutterBottom>
              Select Generation Style:
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                {styleOptions.map((style) => (
                  <Grid item xs={12} sm={6} key={style.value}>
                    <Paper
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: generationStyle === style.value ? 'primary.main' : 'transparent',
                        '&:hover': {
                          borderColor: 'primary.light',
                          bgcolor: 'action.hover',
                        },
                        transition: 'all 0.2s',
                        height: '100%',
                      }}
                      onClick={() => setGenerationStyle(style.value)}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        {style.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {style.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Prompt Suggestions:
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 2 }}>
                {promptGuidance.suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <Typography variant="body2" color="text.secondary">
                      {suggestion}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Example Prompts:
              </Typography>
              <Box sx={{ mt: 1 }}>
                {promptGuidance.examples.map((example, index) => (
                  <Chip
                    key={index}
                    label={example}
                    onClick={() => setPrompt(example)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Paper>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleGenerate}
            variant="contained"
            disabled={!prompt || loading}
          >
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageGenerator;