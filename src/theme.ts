import { createTheme, PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#07b4cf',
            light: '#30ddf8',
            dark: '#007a9d',
          },
          secondary: {
            main: '#a560e2',
            light: '#d38ff2',
            dark: '#631d9f',
          },
          background: {
            default: '#f1f4f8',
            paper: '#ffffff',
          },
          text: {
            primary: '#0b191e',
            secondary: '#76792A',
          },
          error: {
            main: '#ff0000',
          },
          success: {
            main: '#00ff00',
          },
        }
      : {
          primary: {
            main: '#30ddf8',
            light: '#30ddf8',
            dark: '#007a9d',
          },
          secondary: {
            main: '#631d9f',
            light: '#d38ff2',
            dark: '#631d9f',
          },
          background: {
            default: '#070a0e',
            paper: '#121212',
          },
          text: {
            primary: '#e1eff4',
            secondary: '#c2c563',
          },
          error: {
            main: '#ff0000',
          },
          success: {
            main: '#00ff00',
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
