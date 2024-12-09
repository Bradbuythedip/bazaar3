# Caelus Web Application

A Next.js web application for sustainable fashion design and AI-powered style analysis.

## Features

- AI-powered style questionnaire and analysis
- Image generation for fashion designs
- Sustainable fashion focus
- Material and style recommendations
- Interactive user interface with Material-UI
- Profile management
- Gallery view
- Marketplace integration (Bazaar)

## Tech Stack

- **Framework**: Next.js (React)
- **UI Library**: Material-UI (MUI)
- **Styling**: Emotion
- **Animations**: Framer Motion
- **Language**: TypeScript
- **AI Integration**: OpenAI API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Bradbuythedip/bazaar3.git
cd bazaar3
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a .env.local file:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to .env.local:
```
NEXT_PUBLIC_OPENAI_API_KEY=your-api-key-here
```

## Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Building for Production

Build the application:
```bash
npm run build
# or
yarn build
```

Start the production server:
```bash
npm start
# or
yarn start
```

## Project Structure

- `/components` - React components
  - `AIStyleQuestionnaire.tsx` - AI-powered style analysis component
  - `ImageGenerator.tsx` - AI image generation component
  - `Layout.tsx` - Main layout component
- `/lib` - Utility functions and configurations
  - `gpt.ts` - OpenAI API integration
  - `imageGeneration.ts` - Image generation utilities
  - `theme.ts` - MUI theme configuration
- `/pages` - Next.js pages
  - `intro.tsx` - Introduction page
  - `main-hub.tsx` - Main dashboard
  - `bazaar.tsx` - Marketplace
  - `gallery.tsx` - Image gallery
  - `profile.tsx` - User profile
  - `profile-sort.tsx` - Profile organization
  - `our-initiative.tsx` - About page
- `/public` - Static assets
- `/styles` - Global styles and CSS modules

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_OPENAI_API_KEY` - Your OpenAI API key

## Deployment

This application can be deployed on various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Support for standard Node.js hosting
- Compatible with Docker deployment
- Can be deployed on any platform supporting Next.js

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and not open for public use without permission.

## Support

For support, please email bradbuythedip@gmail.com