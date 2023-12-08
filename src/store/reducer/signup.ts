import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosInstance } from 'axios';
import { axiosInstance } from '../../utils/axios';

interface SignupState {
  isLoading: boolean;
  error: { errCode: number; errMessage: string } | null;
  isRegistered: boolean;
  credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export const initialState: SignupState = {
  isLoading: false,
  error: null,
  isRegistered: false,
  credentials: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

type KeysOfCredentials = keyof SignupState['credentials'];

export const changeCredentialsField = createAction<{
  field: KeysOfCredentials;
  value: string;
}>('signup/CHANGE_CREDENTIALS_FIELD');

export const register = createAsyncThunk(
  'signup/REGISTER',
  async (credentials: SignupState['credentials']) => {
    const data = await axiosInstance.post('/user/register', credentials);
    return data;
  }
);

const signupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.credentials = initialState.credentials;
      state.isRegistered = true;
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        const { errCode, errMessage } = action.payload as {
          errCode: number;
          errMessage: string;
        };
        state.error = { errCode, errMessage };
      } else {
        state.error = { errCode: -1, errMessage: 'Unknown error' };
      }
    });
});

export default signupReducer;
