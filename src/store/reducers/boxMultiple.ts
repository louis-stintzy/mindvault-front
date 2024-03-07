import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { BoxData } from '../../@types/box';

import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface BoxMultipleState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  boxes: BoxData[];
}

export const initialState: BoxMultipleState = {
  isLoading: false,
  error: null,
  success: '',
  boxes: [],
};

export const resetBoxMultipleState = createAction(
  'boxMultiple/RESET_BOX_MULTIPLE_STATE'
);

export const getUserBoxes = createAsyncThunk(
  'boxMultiple/GET_USER_BOXES',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/boxes');
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

const boxMultipleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetBoxMultipleState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.boxes = [];
    })
    .addCase(getUserBoxes.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.boxes = [];
    })
    .addCase(getUserBoxes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Boxes retrieved';
      state.boxes = action.payload;
    })
    .addCase(getUserBoxes.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
      state.success = '';
      state.boxes = [];
    });
});

export default boxMultipleReducer;
