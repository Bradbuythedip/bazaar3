interface ImageGenerationResponse {
  created: number;
  data: {
    url: string;
    b64_json?: string;
  }[];
}

interface StyleGuide {
  lighting?: string;
  composition?: string;
  focus?: string;
  technique?: string;
  additional?: string;
}

const getStyleGuide = (style: string): StyleGuide => {
  const guides: Record<string, StyleGuide> = {
    'realistic-studio': {
      lighting: 'Professional studio lighting setup with even illumination',
      composition: 'Clean, minimal background with focus on subject',
      focus: 'Sharp detail and clear textures',
      technique: 'High-end fashion photography style'
    },
    'realistic-editorial': {
      lighting: 'Dramatic lighting with artistic shadows',
      composition: 'Editorial fashion magazine style composition',
      focus: 'Artistic interpretation while maintaining detail',
      technique: 'Contemporary fashion photography'
    },
    'realistic-natural': {
      lighting: 'Soft, natural daylight',
      composition: 'Organic and environmental context',
      focus: 'Natural texture and color representation',
      technique: 'Documentary-style photography'
    },
    'watercolor': {
      technique: 'Watercolor illustration technique',
      focus: 'Flowing, artistic interpretation',
      additional: 'Soft color transitions and artistic flourishes'
    },
    'fashion-sketch': {
      technique: 'Professional fashion illustration',
      focus: 'Style and movement emphasis',
      additional: 'Gestural lines with detailed rendering'
    },
    'contemporary-art': {
      technique: 'Modern artistic interpretation',
      focus: 'Bold, creative expression',
      additional: 'Innovative composition and style elements'
    },
    'technical-flat': {
      technique: 'Technical fashion flat drawing',
      focus: 'Precise technical details',
      additional: 'Construction specifications and measurements'
    },
    'construction-detail': {
      technique: 'Detailed technical illustration',
      focus: 'Construction methods and assembly',
      additional: 'Close-up views of technical elements'
    },
    'pattern-draft': {
      technique: 'Pattern-making documentation',
      focus: 'Pattern pieces and measurements',
      additional: 'Technical notation and specifications'
    },
    'macro-detail': {
      technique: 'Macro photography',
      focus: 'Extreme close-up of texture details',
      additional: 'Fiber and construction visibility'
    },
    'weave-pattern': {
      technique: 'Technical textile photography',
      focus: 'Weave or knit structure',
      additional: 'Pattern repeat and construction detail'
    },
    'drape-study': {
      technique: 'Fabric behavior documentation',
      focus: 'Movement and drape qualities',
      additional: 'Multiple angles and lighting conditions'
    },
    'sustainable-story': {
      technique: 'Documentary style',
      focus: 'Sustainable production methods',
      additional: 'Environmental context and impact visualization'
    },
    'zero-waste': {
      technique: 'Technical design illustration',
      focus: 'Zero-waste pattern cutting',
      additional: 'Pattern efficiency and sustainability notes'
    },
    'ethical-production': {
      technique: 'Documentary fashion photography',
      focus: 'Ethical production methods',
      additional: 'Craftsmanship and production detail'
    }
  };

  return guides[style] || guides['realistic-studio'];
};

export const generateFashionImage = async (
  prompt: string,
  apiKey: string,
  style: string = 'realistic-studio'
): Promise<string> => {
  const getBasePrompt = () => {
    const sustainabilityContext = `This is for a sustainable fashion platform focusing on eco-friendly materials and ethical production.`;
    const qualityGuide = `Create a high-quality, professional image with excellent lighting and clear details.`;
    
    return `${sustainabilityContext} ${qualityGuide} The image should be:
    - Photographed/rendered in high resolution
    - Set against a clean, neutral background
    - Showing clear texture and material details
    - Emphasizing sustainable and natural qualities`;
  };

  const getFabricPrompt = (basePrompt: string) => {
    return `${basePrompt} The fabric should demonstrate:
    - Natural fiber characteristics and texture
    - Weave pattern and structure
    - Surface details and draping quality
    - Material thickness and weight appearance
    Include a sense of scale and close-up texture detail.`;
  };

  const getGarmentPrompt = (basePrompt: string) => {
    return `${basePrompt} The garment should showcase:
    - Clean construction and finishing
    - Natural draping and movement
    - Sustainable design elements
    - Ethical craftsmanship details`;
  };

  const styleGuide = getStyleGuide(style);
  const stylePrompt = Object.entries(styleGuide)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join('\n');

  let enhancedPrompt = `${prompt}\n\nStyle Requirements:\n${stylePrompt}\n\n${getBasePrompt()}`;
  
  if (prompt.toLowerCase().includes('fabric') || prompt.toLowerCase().includes('material')) {
    enhancedPrompt = `${prompt}\n\nStyle Requirements:\n${stylePrompt}\n\n${getFabricPrompt(getBasePrompt())}`;
  } else if (prompt.toLowerCase().includes('garment') || prompt.toLowerCase().includes('clothing')) {
    enhancedPrompt = `${prompt}\n\nStyle Requirements:\n${stylePrompt}\n\n${getGarmentPrompt(getBasePrompt())}`;
  }

  // Add final quality and consistency requirements
  enhancedPrompt += `\n\nAdditional Requirements:
  - Maintain consistent style throughout the image
  - Ensure professional quality and clarity
  - Emphasize sustainable and ethical aspects
  - Follow the specified technique and focus points
  - Create a cohesive visual narrative`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data: ImageGenerationResponse = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const generateSketch = async (
  description: string,
  style: string,
  apiKey: string
): Promise<string> => {
  const getSketchBasePrompt = (style: string) => {
    const styleGuide = {
      technical: `Create a detailed technical fashion sketch with precise construction details, measurements, and fabric specifications.`,
      artistic: `Create an artistic fashion illustration with flowing lines, dramatic poses, and emphasis on style and movement.`,
      minimal: `Create a clean, minimal fashion sketch focusing on essential design elements and silhouette.`,
      detailed: `Create a comprehensive fashion sketch showing both design aesthetics and technical details.`
    };

    return `${styleGuide[style as keyof typeof styleGuide] || styleGuide.detailed}
    The sketch should:
    - Use professional fashion illustration techniques
    - Show clear design intentions
    - Highlight sustainable design elements
    - Include fabric behavior and draping`;
  };

  const getSketchDetails = (description: string) => {
    const sustainableElements = `
    Emphasize sustainable design elements such as:
    - Zero-waste pattern cutting considerations
    - Modular or transformable components
    - Repair-friendly construction
    - Biodegradable material suggestions
    - Minimal seam construction`;

    const constructionDetails = `
    Include technical details such as:
    - Seam placements
    - Closure methods
    - Fabric grain lines
    - Key measurements
    - Special sustainable construction notes`;

    return `${description}
    ${sustainableElements}
    ${constructionDetails}`;
  };

  const enhancedPrompt = `
    Fashion design sketch: ${getSketchDetails(description)}
    ${getSketchBasePrompt(style)}
    
    Additional requirements:
    - Include front view and at least one detail view
    - Show fabric texture suggestions
    - Include sustainable material callouts
    - Note any zero-waste design elements
    - Highlight modular or adaptable features
    
    Style notes: Professional fashion illustration focusing on sustainable and ethical design elements.`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate sketch');
    }

    const data: ImageGenerationResponse = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating sketch:', error);
    throw error;
  }
};

// Add image upload functionality
export const uploadImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  // In a real application, this would upload to your cloud storage
  // For now, we'll create a local URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};