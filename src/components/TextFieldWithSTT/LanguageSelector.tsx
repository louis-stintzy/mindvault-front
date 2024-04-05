import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface LanguageSelectorProps {
  field1?: 'question' | 'answer';
  field2?: 'defaultQuestionLanguage' | 'defaultAnswerLanguage';
  instructions: string;
  selectedLang: string;
  onLanguageChange1?: (field: 'question' | 'answer', lang: string) => void;
  onLanguageChange2?: (
    field: 'defaultQuestionLanguage' | 'defaultAnswerLanguage',
    lang: string
  ) => void;
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

// NOTE: Le composant est codé ainsi pour cause de problème de typage
// field n'a pas le même type dans les deux cas
function LanguageSelector({
  field1,
  field2,
  instructions,
  selectedLang,
  onLanguageChange1,
  onLanguageChange2,
}: LanguageSelectorProps) {
  return (
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
        {instructions}
      </Typography>
      <FormControl sx={{ width: 'auto' }}>
        {field1 && onLanguageChange1 && (
          <Select
            value={selectedLang}
            onChange={(e) => onLanguageChange1(field1, e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select language' }}
            sx={selectSX}
          >
            <MenuItem value="fr-FR">Français</MenuItem>
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="de-DE">Deutsch</MenuItem>
            <MenuItem value="es-ES">Español</MenuItem>
          </Select>
        )}
        {field2 && onLanguageChange2 && (
          <Select
            value={selectedLang}
            onChange={(e) => onLanguageChange2(field2, e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select language' }}
            sx={selectSX}
          >
            <MenuItem value="fr-FR">Français</MenuItem>
            <MenuItem value="en-US">English</MenuItem>
            <MenuItem value="de-DE">Deutsch</MenuItem>
            <MenuItem value="es-ES">Español</MenuItem>
          </Select>
        )}
      </FormControl>
    </Box>
  );
}

// Add defaultProps declaration
LanguageSelector.defaultProps = {
  field1: undefined,
  field2: undefined,
  onLanguageChange1: undefined,
  onLanguageChange2: undefined,
};

export default LanguageSelector;
