import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosInstance } from 'axios';

interface SignupState {
  isLoading: boolean;
  error: string | null;
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
  credentials: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

type KeysOfCredentials = keyof SignupState['credentials'];
