import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';

interface VoiceSelectorProps {
  instructions: string;
  lang: string;
  selectedVoiceName: string;
  setSelectedVoiceName: (voice: string) => void;
}

const selectSX = {
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
};

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
  // const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

  // à effacer : const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

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

  // pas besoin ici (c'était dans le composant test) quand les voices disponibles changent, on met à jour la voix sélectionnée
  // useEffect(() => {
  //   if (availableVoicesName.length) {
  //     if (field1 && onVoiceChange1) {
  //       onVoiceChange1(field1, availableVoicesName[0]);
  //     }
  //     if (field2 && onVoiceChange2) {
  //       onVoiceChange2(field2, availableVoicesName[0]);
  //     }
  //   }
  // }, [availableVoicesName, field1, field2, onVoiceChange1, onVoiceChange2]);
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
    </Box>
  );
}

export default VoiceSelector;
