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

interface SignupState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  isRegistered: boolean;
  credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  isPasswordValid: boolean;
}

export const initialState: SignupState = {
  isLoading: false,
  error: null,
  success: '',
  isRegistered: false,
  credentials: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  isPasswordValid: false,
};

type KeysOfCredentials = keyof SignupState['credentials'];

export const resetSignupState = createAction('signup/RESET_SIGNUP_STATE');

export const changeCredentialsField = createAction<{
  field: KeysOfCredentials;
  value: string;
}>('signup/CHANGE_CREDENTIALS_FIELD');

export const updatePasswordValidity = createAction<boolean>(
  'signup/UPDATE_PASSWORD_VALIDITY'
);

// Création d'une action asynchrone avec Redux Toolkit
export const register = createAsyncThunk(
  // Nom de l'action, utilisé dans le reducer pour gérer cette action
  'signup/REGISTER',
  // Fonction asynchrone qui sera exécutée lors du dispatch de cette action
  async (credentials: SignupState['credentials'], { rejectWithValue }) => {
    try {
      // Tentative d'envoi des données d'inscription (credentials) à l'API
      const response = await axiosInstance.post('/auth/register', credentials);
      // Si l'appel API réussit, la réponse est retournée (utilisée dans le reducer)
      return response.data;
    } catch (error) {
      // Gestion des erreurs si l'appel API échoue
      if (error instanceof AxiosError) {
        // Si l'erreur est une instance de AxiosError, analyse de l'erreur pour obtenir un objet utilisable dans le reducer
        const errorAnalyzed = analyseError(error);
        return rejectWithValue(errorAnalyzed);
      }
      // Si l'erreur n'est pas une instance de AxiosError, renvoie une erreur générique
      return rejectWithValue({ errCode: -1, errMessage: 'Unknown error' });
    }
  }
);

const signupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetSignupState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.credentials = initialState.credentials;
      state.isPasswordValid = initialState.isPasswordValid;
    })
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(updatePasswordValidity, (state, action) => {
      state.isPasswordValid = action.payload;
      // console.log(`tous les critères de MDP sont remplis : ${action.payload}`);
    })
    .addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isRegistered = false;
      state.success = '';
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.credentials = initialState.credentials;
      state.isPasswordValid = initialState.isPasswordValid;
      state.isRegistered = true;
      state.success = action.payload.message;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        // const { errCode, errMessage } = action.payload as {
        //   errCode: number;
        //   errMessage: string;
        // };
        // state.error = { errCode, errMessage };
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default signupReducer;
