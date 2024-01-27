import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface SigninState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  isLoggedIn: boolean;
  credentials: {
    email: string;
    password: string;
  };
}

export const initialState: SigninState = {
  isLoading: false,
  error: null,
  success: '',
  isLoggedIn: false,
  credentials: {
    email: '',
    password: '',
  },
};

type KeysOfCredentials = keyof SigninState['credentials'];

export const resetSigninState = createAction('signin/RESET_SIGNIN_STATE');

export const changeCredentialsField = createAction<{
  field: KeysOfCredentials;
  value: string;
}>('signin/CHANGE_CREDENTIALS_FIELD');

// Voir commentaires de l'action "signup/REGISTER" dans le fichier "signup.ts"
export const login = createAsyncThunk(
  'signin/LOGIN',
  async (credentials: SigninState['credentials'], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login', credentials);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorAnalyzed = analyseError(error);
        return rejectWithValue(errorAnalyzed);
      }
      return rejectWithValue({ errCode: -1, errMessage: 'Unknown error' });
    }
  }
);

const signinReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetSigninState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = false;
      state.credentials = initialState.credentials;
    })
    .addCase(changeCredentialsField, (state, action) => {
      state.credentials[action.payload.field] = action.payload.value;
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isLoggedIn = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = true;
      state.credentials = initialState.credentials;
      localStorage.setItem('token', action.payload.token);
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default signinReducer;
