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

interface TestSTTState {
  testField: {
    question: string;
  };
}

export const initialState: TestSTTState = {
  testField: {
    question: '',
  },
};

export const changeTestField = createAction<{
  field: keyof TestSTTState['testField'];
  value: string;
}>('testSTT/CHANGE_TEST_FIELD');

export const resetTestSTTState = createAction('testSTT/RESET_TEST_STT_STATE');

const testSTTReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeTestField, (state, action) => {
      state.testField[action.payload.field] = action.payload.value;
    })
    .addCase(resetTestSTTState, (state) => {
      state.testField.question = '';
    });
});

export default testSTTReducer;
