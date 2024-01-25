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

export const changeCredentialsField = createAction<{
  field: KeysOfCredentials;
  value: string;
}>('signup/CHANGE_CREDENTIALS_FIELD');

export const updatePasswordValidity = createAction<boolean>(
  'signup/UPDATE_PASSWORD_VALIDITY'
);

export const register = createAsyncThunk(
  'signup/REGISTER',
  async (credentials: SignupState['credentials'], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/register', credentials);
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

const signupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      // console.log(
      //   `reducer // field : ${action.payload.field} - value : ${action.payload.value}`
      // );
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
    })
    .addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.credentials = initialState.credentials;
      state.isPasswordValid = initialState.isPasswordValid;
      state.isRegistered = true;
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
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default signupReducer;
