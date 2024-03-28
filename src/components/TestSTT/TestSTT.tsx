import { useEffect, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import useSpeechToText from '../../hook/useSpeechToText';

function TestSTT() {
  const [textInput, setTextInput] = useState('');

  const {
    isListening: isListeningQuestion,
    transcript: transcriptQuestion,
    startListening: startListeningQuestion,
    stopListening: stopListeningQuestion,
  } = useSpeechToText({});

  const stopVoicieInput = () => {
    setTextInput(
      (prevVal) =>
        prevVal +
        (transcriptQuestion.length
          ? (prevVal.length ? ' ' : '') + transcriptQuestion
          : '')
    );
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
      value={
        isListeningQuestion
          ? textInput +
            (transcriptQuestion.length
              ? (textInput.length ? ' ' : '') + transcriptQuestion
              : '')
          : textInput
      }
      onChange={(e) => setTextInput(e.target.value)}
    />
  );
}

export default TestSTT;
