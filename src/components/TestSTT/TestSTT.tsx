import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import useSpeechToText from '../../hook/useSpeechToText';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeTestField,
  resetTestSTTState,
} from '../../store/reducers/testSTT';
import formatText from '../../utils/textFormatting';

function TestSTT() {
  // ----------------- AFFICHAGE DES COMMANDES DE PONCTUATION -----------------
  const [showList, setShowList] = useState(false);

  const punctuationCommandsFR = {
    "point d'interrogation": '?',
    "point d'exclamation": '!',
    virgule: ',',
    'point virgule': ';',
    'deux points': ':',
    point: '.',
    'ouvrir la parenthèse': '(',
    'fermer la parenthèse': ')',
    'ouvrir les guillemets': '"',
    'fermer les guillemets': '"',
  };

  const handleToggleList = () => {
    setShowList(!showList);
  };

  // ----------------- GESTION DU SPEECH TO TEXT -----------------
  const dispatch = useAppDispatch();
  // le store est mis à jour que lorsque l'écoute est arrêtée ou lors de la frappe au clavier
  const { question } = useAppSelector((state) => state.testSTT.testField);
  // const [textInput, setTextInput] = useState('');

  // transcriptQuestion est déjà une transcription qui se complète au fur et à mesur de la reconnaissance vocale
  // on ajoute transcriptQuestion à la question lorsqu'on arrête d'écouter
  const {
    isListening: isListeningQuestion,
    transcript: transcriptQuestion,
    startListening: startListeningQuestion,
    stopListening: stopListeningQuestion,
  } = useSpeechToText({});

  const handleChangeField = (field: 'question') => (value: string) => {
    dispatch(changeTestField({ field, value }));
  };

  // si on arrête d'écouter, on ajoute la transcription au texte existant dans l'input
  const stopVoicieInput = () => {
    const formattedTranscript = formatText(transcriptQuestion, 'fr');
    // si question et transcription ne sont pas vides, on ajoute un espace entre les deux
    // si question et pas de transcription, on n'ajoute rien
    // si pas de question et transcription, on n'ajoute rien
    const newValue =
      question +
      (formattedTranscript.length
        ? (question.length ? ' ' : '') + formattedTranscript
        : '');
    handleChangeField('question')(newValue);
    // setTextInput(newValue);
    // setTextInput(
    //   (prevVal) =>
    //     prevVal +
    //     (transcriptQuestion.length
    //       ? (prevVal.length ? ' ' : '') + transcriptQuestion
    //       : '')
    // );
    stopListeningQuestion();
  };

  const startStopListeningQuestion = () => {
    if (isListeningQuestion) {
      stopVoicieInput();
    } else {
      startListeningQuestion();
    }
  };

  return (
    <>
      {/* // --------------------- CHAMP DE LA SAISE DE LA QUESTION --------------------- */}
      <TextField
        required
        id="question"
        name="question"
        label="Question"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="start or stop listening"
                onClick={startStopListeningQuestion}
              >
                {isListeningQuestion ? <StopCircleIcon /> : <MicIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        disabled={isListeningQuestion}
        // value={question}
        value={
          // si en train d'écouter, on ajoute la transcription à la question
          isListeningQuestion
            ? question +
              // si la transcription n'est pas vide, on ajoute un espace si la question n'est pas vide
              (transcriptQuestion.length
                ? (question.length ? ' ' : '') +
                  formatText(transcriptQuestion, 'fr')
                : // si pas de transcription, on n'ajoute rien
                  '')
            : // si pas en train d'écouter, on affiche la question
              question
        }
        onChange={(e) => {
          // uniquement pour la frappe au clavier
          // value est modifiée par la transcription vocale mais ne déclenchera pas le onChange
          handleChangeField('question')(e.target.value);
          // setTextInput(e.target.value);
        }}
      />
      {/* // -------------------------- BOUTTON RESET -------------------------- */}
      <Button
        onClick={() => {
          dispatch(resetTestSTTState());
          // setTextInput('');
        }}
      >
        Reset state
      </Button>
      {/* // ----------------- AFFICHAGE DES COMMANDES DE PONCTUATION ----------------- */}
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" gutterBottom>
              Commandes de ponctuation :
            </Typography>
            <IconButton
              onClick={handleToggleList}
              aria-label="show or hide punctuation commands"
            >
              <PreviewIcon />
            </IconButton>
          </Box>
          <Collapse in={showList}>
            <List dense>
              {Object.entries(punctuationCommandsFR).map(
                ([command, symbol], index) => (
                  <ListItem
                    key={command}
                    divider={
                      index !== Object.entries(punctuationCommandsFR).length - 1
                    }
                  >
                    <ListItemText
                      primary={`Pour ajouter " ${symbol} ", dites :`}
                      secondary={command}
                    />
                  </ListItem>
                )
              )}
            </List>
          </Collapse>
        </Paper>
      </Container>
    </>
  );
}

export default TestSTT;