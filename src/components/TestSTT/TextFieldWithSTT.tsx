import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import useSpeechToText from '../../hook/useSpeechToText';
import formatText from '../../utils/textFormatting';

interface TextFieldWithSTTProps {
  field: string; // nom du champ texte
  id: string; // id du champ texte
  name: string; // nom du champ texte
  label: string; // label pour le TextField
  lang: string; // code langue pour la reconnaissance vocale
  onSelectLang: (field: string, lang: string) => void; // fonction pour changer la langue
  value: string; // valeur du champ texte
  onChangeValue: (value: string) => void; // fonction pour changer la valeur du champ texte
}

function TextFieldWithSTT({
  field,
  id,
  name,
  label,
  lang,
  onSelectLang,
  value,
  onChangeValue,
}: TextFieldWithSTTProps) {
  // Utilisation du hook useSpeechToText
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ lang });

  // Arrêt de l'écoute : ajoute la transcription au texte existant dans l'input
  const stopVoicieInput = () => {
    const formattedTranscript = formatText(transcript, lang);
    const newValue =
      value +
      (formattedTranscript.length
        ? (value.length ? ' ' : '') + formattedTranscript
        : '');
    onChangeValue(newValue);
    stopListening();
  };

  // gère le déclenchement et l'arrêt de la reconnaissance vocale
  const startStopListening = () => {
    if (isListening) {
      stopVoicieInput();
    } else {
      startListening();
    }
  };
  return (
    <TextField
      // required
      id={id}
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="start or stop listening"
              onClick={startStopListening}
            >
              {isListening ? <StopCircleIcon /> : <MicIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      disabled={isListening}
      value={
        // si en train d'écouter, on ajoute la transcription à la value
        isListening
          ? value +
            // si la transcription n'est pas vide, on ajoute un espace si la value n'est pas vide
            (transcript.length
              ? (value.length ? ' ' : '') + formatText(transcript, lang)
              : // si pas de transcription, on n'ajoute rien
                '')
          : // si pas en train d'écouter, on affiche la value
            value
      }
      onChange={(e) => {
        onChangeValue(e.target.value);
      }}
    />
  );
}

export default TextFieldWithSTT;
