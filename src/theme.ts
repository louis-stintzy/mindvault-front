import { createTheme, PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#34568B', // Un bleu profond pour une touche de sérieux
            light: '#5B8AC6', // Un bleu clair pour les éléments moins importants
            dark: '#23395D', // Un bleu foncé pour les textes et éléments importants
          },
          secondary: {
            main: '#F7C548', // Un jaune doré pour attirer l'attention sur les éléments secondaires
            light: '#F9D77E', // Un jaune clair pour les hover states
            dark: '#C99A2E', // Un jaune moutarde pour le contraste
          },
          background: {
            default: '#F4F7FA', // Un gris très clair pour le fond général
            paper: '#FFFFFF', // Blanc pur pour les surfaces des cartes et des papiers
          },
          text: {
            primary: '#102A43', // Un bleu très foncé pour le texte principal
            secondary: '#627D98', // Un bleu-gris pour le texte secondaire
          },
          error: {
            main: '#D32F2F', // Un rouge vif pour les erreurs
          },
          success: {
            main: '#2E7D32', // Un vert foncé pour les succès
          },
        }
      : {
          primary: {
            main: '#208FA5', // Cyan pour les éléments interactifs primaires
            light: '#5BB0BE', // Cyan clair pour les hover states et accents
            dark: '#006378', // Cyan foncé pour les textes ou éléments actifs
          },
          secondary: {
            main: '#F57C00', // Orange pour les éléments secondaires, apportant chaleur et visibilité
            light: '#FFAD42', // Orange clair pour les états interactifs secondaires
            dark: '#BC5100', // Orange foncé pour le contraste et la profondeur
          },
          background: {
            default: '#29313B', // Bleu-gris très foncé pour le fond général
            paper: '#323B48', // Bleu-gris légèrement plus clair pour les éléments en "papier"
          },
          text: {
            primary: '#E3F2FD', // Un bleu très clair presque blanc pour le texte principal
            secondary: '#AEB6BF', // Un gris bleuté pour le texte secondaire et les légendes
          },
          error: {
            main: '#EF5350', // Un rouge vif, mais pas trop éclatant pour les erreurs
          },
          success: {
            main: '#43A047', // Un vert moins saturé pour les succès
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const theme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export default theme;
