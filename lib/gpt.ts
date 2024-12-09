interface GPTResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const generateFashionSuggestions = async (
  userInput: string,
  apiKey: string
): Promise<string> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a fashion expert AI assistant helping users with sustainable fashion choices. 
          Focus on eco-friendly materials, sustainable practices, and personalized style recommendations. 
          Keep responses concise but informative.`
        },
        {
          role: 'user',
          content: userInput
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate fashion suggestions');
  }

  const data: GPTResponse = await response.json();
  return data.choices[0]?.message?.content || '';
};

export const generateStyleAnalysis = async (
  userPreferences: string,
  measurements: string,
  sustainableChoices: string,
  apiKey: string
): Promise<string> => {
  const prompt = `
    User Preferences: ${userPreferences}
    Measurements: ${measurements}
    Sustainable Choices: ${sustainableChoices}

    Please provide a detailed style analysis including:
    1. Recommended sustainable fabrics based on preferences
    2. Suggested clothing styles that would be flattering
    3. Sustainable fashion tips personalized to the user
    4. Color palette recommendations
    Keep the response focused on sustainable fashion and practical advice.
  `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional fashion consultant specializing in sustainable fashion and personal styling.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate style analysis');
  }

  const data: GPTResponse = await response.json();
  return data.choices[0]?.message?.content || '';
};