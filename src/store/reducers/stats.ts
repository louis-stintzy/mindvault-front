import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';
import { StatsData } from '../../@types/stats';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface StatsState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  instantStats: StatsData;
}

export const initialState: StatsState = {
  isLoading: false,
  error: null,
  success: '',
  instantStats: {
    totalCards: 0,
    cardsByCompartment: {
      compartment1: 0,
      compartment2: 0,
      compartment3: 0,
      compartment4: 0,
      compartment5: 0,
      compartment6: 0,
      compartment7: 0,
      compartment8: 0,
    },
  },
};

export const resetStatsState = createAction('stats/RESET_STATS_STATE');

export const getInstantStats = createAsyncThunk(
  'stats/GET_INSTANT_STATS',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/stats/instant/box/${boxId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(analyseError(err));
    }
  }
);

const statsReducer = createReducer(initialState, (builder) => {
  builder
    // ----------- RESET STATS STATE -----------
    .addCase(resetStatsState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.instantStats = {
        totalCards: 0,
        cardsByCompartment: {
          compartment1: 0,
          compartment2: 0,
          compartment3: 0,
          compartment4: 0,
          compartment5: 0,
          compartment6: 0,
          compartment7: 0,
          compartment8: 0,
        },
      };
    })
    // ----------- GET INSTANT STATS -----------
    .addCase(getInstantStats.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
    })
    .addCase(getInstantStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Stats retrieved';
      state.instantStats = action.payload;
    })
    .addCase(getInstantStats.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default statsReducer;
