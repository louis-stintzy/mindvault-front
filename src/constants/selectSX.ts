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

export default selectSX;
