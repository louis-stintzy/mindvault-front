import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

// import MicIcon from '@mui/icons-material/Mic';
// import StopCircleIcon from '@mui/icons-material/StopCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import { grey } from '@mui/material/colors';
import useSpeechToText from '../../hook/useSpeechToText';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeTestField,
  resetTestSTTState,
} from '../../store/reducers/testSTT';
// import formatText from '../../utils/textFormatting';
import TextFieldWithSTT from './TextFieldWithSTT';

function TestSTTandTTS() {
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

  // ----------------- GESTION DU TEXT TO SPEECH -----------------
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const speakText = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    const selectedVoice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === selectedVoiceName);
    if (!selectedVoice) {
      console.error('Voice not found');
    } else {
      utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    }
  };

  // ----------------- GESTION DU SPEECH TO TEXT -----------------
  const dispatch = useAppDispatch();
  // le store est mis à jour que lorsque l'écoute est arrêtée ou lors de la frappe au clavier
  const { questionLanguage, question } = useAppSelector(
    (state) => state.testSTT.testField
  );
  // const [textInput, setTextInput] = useState('');

  // transcriptQuestion est déjà une transcription qui se complète au fur et à mesur de la reconnaissance vocale
  // on ajoute transcriptQuestion à la question lorsqu'on arrête d'écouter
  // const {
  //   isListening: isListeningQuestion,
  //   transcript: transcriptQuestion,
  //   startListening: startListeningQuestion,
  //   stopListening: stopListeningQuestion,
  // } = useSpeechToText({});

  const handleChangeField =
    (field: 'questionLanguage' | 'answerLanguage' | 'question' | 'answer') =>
    (value: string) => {
      dispatch(changeTestField({ field, value }));
    };

  // si on arrête d'écouter, on ajoute la transcription au texte existant dans l'input
  // const stopVoicieInput = () => {
  //   const formattedTranscript = formatText(transcriptQuestion, 'fr');
  // si question et transcription ne sont pas vides, on ajoute un espace entre les deux
  // si question et pas de transcription, on n'ajoute rien
  // si pas de question et transcription, on n'ajoute rien
  //   const newValue =
  //     question +
  //     (formattedTranscript.length
  //       ? (question.length ? ' ' : '') + formattedTranscript
  //       : '');
  //   handleChangeField('question')(newValue);
  //   stopListeningQuestion();
  // };

  // const startStopListeningQuestion = () => {
  //   if (isListeningQuestion) {
  //     stopVoicieInput();
  //   } else {
  //     startListeningQuestion();
  //   }
  // };

  return (
    <>
      {/* // --------------------- CHAMP DE LA SAISE DE LA QUESTION --------------------- */}
      <Container component="main" maxWidth="xs">
        {/* <TextField
          required
          id="question"
          name="question"
          label="Question"
          placeholder="Posez votre question ici..."
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
        /> */}
        {/* // -------------------------- BOUTTON RESET -------------------------- */}
        {/* <Button
          onClick={() => {
            dispatch(resetTestSTTState());
            // setTextInput('');
          }}
        >
          Reset state
        </Button> */}

        {/* // ----------------- AFFICHAGE DES COMMANDES DE PONCTUATION ----------------- */}

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

        {/* // -------------------------- TextFieldWithSTT Component -------------------------- */}
        <TextFieldWithSTT
          field="question"
          id="question"
          name="question"
          label="Question"
          // todo : manque placeholder
          lang={questionLanguage}
          onSelectLang={(fieldSelected, languageSelected) => {
            handleChangeField(fieldSelected)(languageSelected);
          }}
          multiline
          rows={5}
          value={question}
          onChangeValue={(field, language) =>
            handleChangeField(field)(language)
          }
        />
      </Container>
      {/* // -------------------------- TEXTE A LIRE -------------------------- */}
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 2, p: 2, height: '400px' }}>
          <Typography variant="h6" gutterBottom>
            Question to read :
          </Typography>
          <Typography variant="body1" gutterBottom>
            {question}
          </Typography>
        </Paper>
        {/* // -------------------------- CHOIX DE LA VOIX -------------------------- */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: '0.875rem', color: grey[600], flexGrow: 1 }}
          >
            Choose a voice
          </Typography>
          <FormControl sx={{ width: 'auto' }}>
            <Select
              value={selectedVoiceName}
              onChange={(e) => setSelectedVoiceName(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select voice' }}
              sx={{
                '.MuiSelect-select': {
                  padding: '6px 32px 6px 12px', // Ajuste le padding pour réduire la hauteur
                  fontSize: '0.875rem', // Réduit la taille de la police
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Supprime la bordure
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Supprime la bordure au survol
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none', // Supprime la bordure lorsque le Select est focus
                },
              }}
            >
              {speechSynthesis
                .getVoices()
                .filter((voice) => voice.lang === questionLanguage)
                .map((voice) => (
                  <MenuItem key={voice.name} value={voice.name}>
                    {voice.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        {/* // -------------------------- BOUTTON PLAY -------------------------- */}
        <Button
          sx={{ mt: 1 }}
          onClick={() => {
            speakText(question, 'fr-FR');
          }}
        >
          Play text
        </Button>
      </Container>
    </>
  );
}

export default TestSTTandTTS;
