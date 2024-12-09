import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Fade,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const questions = [
  {
    question: "What brings you to Caelus today?",
    options: [
      "I want to create and sell sustainable fashion designs",
      "I'm looking to purchase unique, sustainable clothing",
      "I'm interested in both designing and purchasing"
    ],
    weight: {
      designer: [5, 0, 3],
      consumer: [0, 5, 2]
    }
  },
  {
    question: "What is your current relationship with fashion?",
    options: [
      "I'm a professional fashion designer/creator",
      "I create clothes as a hobby or side business",
      "I'm passionate about sustainable fashion but don't create clothes",
      "I'm looking to build a more sustainable wardrobe"
    ],
    weight: {
      designer: [5, 4, 1, 0],
      consumer: [0, 1, 4, 5]
    }
  },
  {
    question: "How would you describe your fashion expertise?",
    options: [
      "I have formal fashion education/training",
      "I'm self-taught in fashion design",
      "I understand fashion but don't create clothes",
      "I'm learning about sustainable fashion"
    ],
    weight: {
      designer: [5, 4, 1, 0],
      consumer: [0, 1, 4, 5]
    }
  },
  {
    question: "What aspects of sustainable fashion interest you most?",
    options: [
      "Creating designs using sustainable materials",
      "Working with eco-friendly production methods",
      "Finding unique, sustainably-made pieces",
      "Supporting sustainable fashion creators"
    ],
    weight: {
      designer: [5, 5, 1, 0],
      consumer: [0, 1, 5, 5]
    }
  },
  {
    question: "How do you plan to interact with the Caelus platform?",
    options: [
      "Showcase and sell my sustainable designs",
      "Accept custom clothing commissions",
      "Purchase custom-made sustainable clothing",
      "Browse and buy ready-made sustainable pieces"
    ],
    weight: {
      designer: [5, 5, 0, 0],
      consumer: [0, 0, 5, 5]
    }
  },
  {
    question: "What is your experience with fabric selection?",
    options: [
      "I regularly work with various sustainable fabrics",
      "I have some experience choosing fabrics for projects",
      "I understand fabric basics but need guidance",
      "I'm new to learning about sustainable fabrics"
    ],
    weight: {
      designer: [5, 4, 1, 0],
      consumer: [0, 1, 4, 5]
    }
  },
  {
    question: "How do you want to contribute to sustainable fashion?",
    options: [
      "Creating sustainable designs for others",
      "Teaching others about sustainable fashion",
      "Supporting sustainable designers",
      "Promoting sustainable fashion through my choices"
    ],
    weight: {
      designer: [5, 4, 1, 1],
      consumer: [1, 1, 5, 5]
    }
  }
];

const ProfileSort = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[activeStep] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (activeStep === questions.length - 1) {
      // Calculate scores based on weights
      let designerScore = 0;
      let consumerScore = 0;

      answers.forEach((answer, questionIndex) => {
        const optionIndex = questions[questionIndex].options.indexOf(answer);
        if (optionIndex !== -1) {
          designerScore += questions[questionIndex].weight.designer[optionIndex];
          consumerScore += questions[questionIndex].weight.consumer[optionIndex];
        }
      });

      // Determine user type based on weighted scores
      const userType = designerScore > consumerScore ? 'designer' : 'consumer';
      
      // Store detailed results
      const results = {
        type: userType,
        scores: {
          designer: designerScore,
          consumer: consumerScore
        },
        answers: answers
      };
      
      localStorage.setItem('userProfile', JSON.stringify(results));
      
      router.push('/main-hub');
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      py: 4,
      background: 'linear-gradient(to right bottom, #1a237e, #0d47a1)'
    }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
              Let's Get to Know You
            </Typography>
            
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
              Help us understand your fashion journey better
            </Typography>

            <Box sx={{ width: '100%', mb: 4 }}>
              <LinearProgress 
                variant="determinate" 
                value={(activeStep / (questions.length - 1)) * 100}
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                  }
                }}
              />
              <Typography 
                variant="body2" 
                align="right" 
                sx={{ mt: 1, color: 'text.secondary' }}
              >
                Question {activeStep + 1} of {questions.length}
              </Typography>
            </Box>

            <Stepper 
              activeStep={activeStep} 
              sx={{ 
                mb: 4,
                display: { xs: 'none', md: 'flex' }  // Hide on mobile
              }}
            >
              {questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 4, minHeight: '300px' }}>
              <Fade key={activeStep} in={true} timeout={500}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {questions[activeStep].question}
                  </Typography>

                  <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
                    <RadioGroup
                      value={answers[activeStep] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                    >
                      {questions[activeStep].options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <FormControlLabel
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{ 
                              mb: 2,
                              display: 'block',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                borderRadius: 1,
                              },
                            }}
                          />
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Fade>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={!answers[activeStep]}
                >
                  {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfileSort;