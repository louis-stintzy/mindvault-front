import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import BottomNavigationMUI from '../BottomNavigationMUI/BottomNavigationMUI';
import { CardData } from '../../@types/card';

interface QuestionProps {
  card: CardData;
}

function Question({ card }: QuestionProps) {
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(card);
  };

  return (
    <Container component="main" maxWidth="xs" className="question-container">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ------------------------- Title ----------------------------- */}
        <Typography variant="h4" component="h1" gutterBottom>
          Question
        </Typography>
        {/* ------------ Question & Media & Field to Answer ------------ */}
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {card.question ? card.question : 'Card without question...'}
          </Typography>
          {card.attachment ? (
            <img src={card.attachment} alt="media" />
          ) : (
            <img
              src="https://source.unsplash.com/random"
              alt="media"
              width="150px"
            />
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              id="answer"
              name="answer"
              label="Your answer"
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              margin="normal"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <Button variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Box>

      {/* --------------------- Bottom Navigation --------------------- */}
      <BottomNavigationMUI />
    </Container>
  );
}

export default Question;
