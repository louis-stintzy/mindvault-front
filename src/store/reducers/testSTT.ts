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
    questionLanguage: string;
    answerLanguage: string;
    question: string;
    answer: string;
  };
}

export const initialState: TestSTTState = {
  testField: {
    questionLanguage: 'fr-FR',
    answerLanguage: 'fr-FR',
    question: '',
    answer: '',
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
      state.testField.questionLanguage = 'en-US';
      state.testField.answerLanguage = 'fr-FR';
      state.testField.question = '';
      state.testField.answer = '';
    });
});

export default testSTTReducer;
