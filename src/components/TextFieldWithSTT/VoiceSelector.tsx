import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Language } from '../../@types/lang';
import selectSX from '../../constants/selectSX';
import getSampleText from '../../constants/sampleText';

interface VoiceSelectorProps {
  instructions: string;
  lang: Language;
  selectedVoiceName: string;
  setSelectedVoiceName: (voice: string) => void;
}

function VoiceSelector({
  instructions,
  lang,
  selectedVoiceName,
  setSelectedVoiceName,
}: VoiceSelectorProps) {
  // liste les voix disponibles compatible avec la langue de la question
  const [availableVoicesName, setAvailableVoicesName] = useState<string[]>(
    speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang === lang)
      .map((voice) => voice.name)
  );

  // charge les voix disponibles pour la langue de la question
  // s'assure que la liste des voix est à jour car elles peuvent ne pas être chargées immédiatement
  useEffect(() => {
    const handleVoicesChanged = () => {
      setAvailableVoicesName(
        speechSynthesis
          .getVoices()
          .filter((voice) => voice.lang === lang)
          .map((voice) => voice.name)
      );
      setSelectedVoiceName('');
    };
    handleVoicesChanged();
    speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [lang, setSelectedVoiceName]);

  useEffect(() => {
    if (availableVoicesName.length) {
      setSelectedVoiceName(availableVoicesName[0]);
    }
  }, [availableVoicesName, setSelectedVoiceName]);

  const testVoice = (voiceName: string) => {
    const utterance = new SpeechSynthesisUtterance(getSampleText(lang));
    utterance.lang = lang;
    const selectedVoice = speechSynthesis
      .getVoices()
      .find((voice) => voice.name === voiceName);
    if (!selectedVoice) {
      console.error('Voice not found');
    } else {
      utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {/* // todo : indiquer que le choix des voix est propre au navigateur */}
      <Typography
        variant="body1"
        sx={{ fontSize: '0.875rem', color: grey[600], flexGrow: 1 }}
      >
        {instructions}
      </Typography>
      <Tooltip title="The available voices depend on the browser and device you are using. Selected voices may become unavailable if you switch to a different browser or device.">
        <IconButton size="small">
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <FormControl sx={{ width: 'auto' }}>
        <Select
          value={selectedVoiceName}
          onChange={(e) => setSelectedVoiceName(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select voice' }}
          sx={selectSX}
        >
          {availableVoicesName.map((voiceName) => (
            <MenuItem key={voiceName} value={voiceName}>
              {voiceName}
            </MenuItem>
          ))}
        </Select>

        {/* //todo : ajouter un bouton pour tester la voix */}
      </FormControl>
      {selectedVoiceName && (
        <Tooltip title="Test the voice">
          <IconButton onClick={() => testVoice(selectedVoiceName)} size="small">
            <PlayCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default VoiceSelector;
