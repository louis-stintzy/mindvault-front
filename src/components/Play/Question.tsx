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
import { useAppDispatch } from '../../hook/redux';
import { updateCardAttributesAfterAnswer } from '../../store/reducers/cardOne';

interface QuestionProps {
  card: CardData;
}

function Question({ card }: QuestionProps) {
  const dispatch = useAppDispatch();
  const [userAnswer, setUserAnswer] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardId = card.id;
    const isCorrect =
      userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
    console.log('isCorrect', isCorrect);
    const nextCompartment = isCorrect ? card.compartment + 1 : 1;
    const nextDateToAskBeforeFormatting = new Date();

    // Compartiment 1 : tous les jours
    // Compartiment 2 : tous les trois jours
    // Compartiment 3 : toutes les semaines
    // Compartiment 4 : toutes les deux semaines
    // Compartiment 5 : tous les mois
    // Compartiment 6 : tous les trois mois
    // Compartiment 7 : tous les six mois

    const timeToAdd = [0, 1, 3, 7, 15, 30, 90, 180];
    nextDateToAskBeforeFormatting.setDate(
      nextDateToAskBeforeFormatting.getDate() + timeToAdd[nextCompartment]
    );
    const nextDateToAsk = nextDateToAskBeforeFormatting.toISOString();

    dispatch(
      updateCardAttributesAfterAnswer({
        cardId,
        nextCompartment,
        nextDateToAsk,
      })
    );
    setUserAnswer('');
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
