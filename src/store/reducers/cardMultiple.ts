import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import { createCard, deleteCard } from './cardOne';

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
  cardsAll: CardData[];
  cardsToReview: CardData[];
}

export const initialState: CardMultipleState = {
  isLoading: false,
  error: null,
  success: '',
  cardsAll: [],
  cardsToReview: [],
};

export const resetCardsAllState = createAction(
  'cardMultiple/RESET_CARDS_ALL_STATE'
);
export const resetCardsToReviewState = createAction(
  'cardMultiple/RESET_CARDS_TO_REVIEW_STATE'
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

export const getRandomCards = createAsyncThunk(
  'cardMultiple/GET_RANDOM_CARDS',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/play/box/${boxId}`);
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
    // ----------- RESET CARDSALLSTATE -----------
    .addCase(resetCardsAllState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.cardsAll = [];
    })
    // ----------- RESET CARDSTOREVIEWSTATE -----------
    .addCase(resetCardsToReviewState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.cardsToReview = [];
    })
    // ----------- GET BOX CARDS -----------
    .addCase(getBoxCards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.cardsAll = [];
    })
    .addCase(getBoxCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Cards retrieved';
      state.cardsAll = action.payload;
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
      state.cardsAll = [];
    })
    // -------------- CREATE CARD --------------
    .addCase(createCard.fulfilled, (state, action) => {
      state.cardsAll = [action.payload, ...state.cardsAll];
      state.success = 'Card deleted';
    })
    // -------------- DELETE CARD --------------
    .addCase(deleteCard.fulfilled, (state, action) => {
      // récupère cardId par destructuration de action.meta.arg (metadonnées de l'action)
      const { cardId } = action.meta.arg;
      state.cardsAll = state.cardsAll.filter((card) => card.id !== cardId);
      state.success = 'Card deleted';
    })
    // ----------- GET RANDOM CARDS -----------
    .addCase(getRandomCards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.cardsToReview = [];
    })
    .addCase(getRandomCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Cards retrieved';
      state.cardsToReview = action.payload;
    })
    .addCase(getRandomCards.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
      state.success = '';
      state.cardsToReview = [];
    });
});

export default cardMultipleReducer;
