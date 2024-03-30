import { useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';

import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import useSpeechToText from '../../hook/useSpeechToText';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeTestField,
  resetTestSTTState,
} from '../../store/reducers/testSTT';

function TestSTT() {
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
    // si question et transcription ne sont pas vides, on ajoute un espace entre les deux
    // si question et pas de transcription, on n'ajoute rien
    // si pas de question et transcription, on n'ajoute rien
    const newValue =
      question +
      (transcriptQuestion.length
        ? (question.length ? ' ' : '') + transcriptQuestion
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
                ? (question.length ? ' ' : '') + transcriptQuestion
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
      <Button
        onClick={() => {
          dispatch(resetTestSTTState());
          // setTextInput('');
        }}
      >
        Reset state
      </Button>
    </>
  );
}

export default TestSTT;
