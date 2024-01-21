import { createReducer, createAction } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'light' | 'dark';
}

export const initialState: ThemeState = {
  // Si localStorage.getItem('themeMode') renvoie 'dark', alors { mode: 'dark' } est ajouté à initialState, sinon, initialState reste inchangé
  mode: 'light',
  ...(localStorage.getItem('themeMode') === 'dark' && { mode: 'dark' }),
};

export const toggleTheme =
  createAction<ThemeState['mode']>('theme/TOGGLE_THEME');

const themeReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleTheme, (state, action) => {
    state.mode = action.payload;
    localStorage.setItem('themeMode', action.payload);
  });
});

export default themeReducer;
