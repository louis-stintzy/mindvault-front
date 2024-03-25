import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';
import { InstantStatsData, HistoricalStatsData } from '../../@types/stats';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface StatsState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  instantStats: InstantStatsData;
  historicalStats: HistoricalStatsData;
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
  historicalStats: [],
};

export const resetStatsState = createAction('stats/RESET_STATS_STATE');

export const getInstantStats = createAsyncThunk(
  'stats/GET_INSTANT_STATS',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/stats/instant/box/${boxId}`);
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

export const getHistoricalStats = createAsyncThunk(
  'stats/GET_HISTORICAL_STATS',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/stats/historical/box/${boxId}`
      );
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
      state.historicalStats = [];
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
    })
    // ----------- GET HISTORICAL STATS -----------
    .addCase(getHistoricalStats.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
    })
    .addCase(getHistoricalStats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Stats retrieved';
      state.historicalStats = action.payload;
    })
    .addCase(getHistoricalStats.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default statsReducer;
