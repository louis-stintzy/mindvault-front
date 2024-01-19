import { createReducer, createAction } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'light' | 'dark';
}

export const initialState: ThemeState = {
  mode: 'light',
};

export const toggleTheme =
  createAction<ThemeState['mode']>('theme/TOGGLE_THEME');

const themeReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleTheme, (state, action) => {
    state.mode = action.payload;
  });
});

export default themeReducer;
