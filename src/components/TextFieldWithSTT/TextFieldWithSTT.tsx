/* eslint-disable react/require-default-props */
// l'erreur persiste alors que des valeurs par défaut pour toutes les props facultatives sont fournies

import MicIcon from '@mui/icons-material/Mic';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import ClearIcon from '@mui/icons-material/Clear';
import {
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Typography,
  FormControl,
  Box,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import useSpeechToText from '../../hook/useSpeechToText';
import formatText from '../../utils/textFormatting';
import LanguageSelector from './LanguageSelector';
import VoiceSelector from './VoiceSelector';
import { Language } from '../../@types/lang';

// import { FieldType } from '../../@types/field';

interface TextFieldWithSTTProps {
  // TODO: lister les nom de champs texte possibles
  field: 'question' | 'answer'; // nom du champ texte
  required?: boolean; // champ requis
  id: string; // id du champ texte
  name: string; // nom du champ texte
  label: string; // label pour le TextField
  lang: Language; // code langue pour la reconnaissance vocale
  onSelectLang: (
    field: 'questionLanguage' | 'answerLanguage',
    lang: Language
  ) => void; // fonction pour changer la langue
  multiline?: boolean; // champ multilignes
  rows?: number; // nombre de lignes pour un champ multilignes
  value: string; // valeur du champ texte
  onChangeValue: (field: 'question' | 'answer', value: string) => void; // fonction pour changer la valeur du champ texte
}

// Pour complément d'informations, voir TestSTT.tsx
function TextFieldWithSTT({
  required = false,
  field,
  id,
  name,
  label,
  lang,
  onSelectLang,
  multiline = false,
  rows = 1,
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
    onChangeValue(field, newValue);
    stopListening();
  };

  // Gère le déclenchement et l'arrêt de la reconnaissance vocale
  const startStopListening = () => {
    if (isListening) {
      stopVoicieInput();
    } else {
      startListening();
    }
  };
  return (
    <>
      {/* ------- CHAMP DE TEXTE AVEC RECONNAISSANCE VOCALE -------- */}
      <TextField
        required={required}
        id={id}
        name={name}
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline={multiline}
        rows={rows}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="start or stop listening"
                onClick={startStopListening}
              >
                {isListening ? <StopCircleIcon /> : <MicIcon />}
              </IconButton>
              <IconButton
                aria-label="clear the field"
                onClick={() => onChangeValue(field, '')}
                disabled={isListening}
              >
                <ClearIcon />
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
          onChangeValue(field, e.target.value);
        }}
      />

      {/* // ------------- SELECTION DE LA LANGUE ET DE LA VOIX -------------- */}
      <LanguageSelector
        field1={field === 'question' ? 'questionLanguage' : 'answerLanguage'}
        instructions="Choose the language to use for the field above:"
        selectedLang={lang}
        onLanguageChange1={onSelectLang}
      />
    </>
  );
}

export default TextFieldWithSTT;
