import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { deleteCard } from './cardOne';

import { CardData } from '../../@types/card';

import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface CardMultipleState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  cards: CardData[];
}

export const initialState: CardMultipleState = {
  isLoading: false,
  error: null,
  success: '',
  cards: [],
};

export const resetCardMultipleState = createAction(
  'cardMultiple/RESET_CARD_MULTIPLE_STATE'
);

export const getBoxCards = createAsyncThunk(
  'cardMultiple/GET_BOX_CARDS',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/box/${boxId}/cards`);
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

const cardMultipleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetCardMultipleState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.cards = [];
    })
    // ----------- GET BOX CARDS -----------
    .addCase(getBoxCards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.cards = [];
    })
    .addCase(getBoxCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Cards retrieved';
      state.cards = action.payload;
    })
    .addCase(getBoxCards.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
      state.success = '';
      state.cards = [];
    })
    // ----------- DELETE CARD -----------
    .addCase(deleteCard.fulfilled, (state, action) => {
      // récupère cardId par destructuration de action.meta.arg (metadonnées de l'action)
      const { cardId } = action.meta.arg;
      state.cards = state.cards.filter((card) => card.id !== cardId);
      state.success = 'Card deleted';
    });
});

export default cardMultipleReducer;
