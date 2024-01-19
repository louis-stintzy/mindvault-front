import { createTheme, PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#07b4cf',
          },
          secondary: {
            main: '#a55fe2',
          },
          background: {
            default: '#f1f4f8',
            paper: '#ffffff',
          },
          text: {
            primary: '#0b191e',
            secondary: '#999c3a',
          },
        }
      : {
          primary: {
            main: '#30ddf8',
          },
          secondary: {
            main: '#631d9f',
          },
          background: {
            default: '#070a0e',
            // paper: '#0b191e',
            paper: '#121212',
          },
          text: {
            primary: '#e1eff4',
            secondary: '#c2c563',
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
