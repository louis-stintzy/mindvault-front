import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { CardData, CardDataLight } from '../../@types/card';

import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface CardOneState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  isRegistered: boolean;
  card: CardDataLight;
  cardCreated: CardData | null;
}

export const initialState: CardOneState = {
  isLoading: false,
  error: null,
  success: '',
  isRegistered: false,
  card: {
    question: '',
    answer: '',
    attachment: '',
  },
  cardCreated: null,
};

type KeysOfCard = keyof CardOneState['card'];

export const resetCardOneState = createAction('cardOne/RESET_CARD_ONE_STATE');

export const changeCardField = createAction<{
  field: KeysOfCard;
  value: string;
}>('cardOne/CHANGE_CARD_FIELD');

export const createCard = createAsyncThunk(
  'cardOne/CREATE',
  async (
    { boxId, card }: { boxId: number; card: CardDataLight },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(`/box/${boxId}/cards`, card);
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

export const deleteCard = createAsyncThunk(
  'cardOne/DELETE_CARD',
  async (
    { boxId, cardId }: { boxId: number; cardId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.delete(
        `/box/${boxId}/card/${cardId}`
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

export const updateCardAttributesAfterAnswer = createAsyncThunk(
  'cardOne/UPDATE_CARD_ATTRIBUTES_AFTER_ANSWER',
  async (
    {
      cardId,
      nextCompartment,
      nextDateToAsk,
    }: { cardId: number; nextCompartment: number; nextDateToAsk: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/play/card/${cardId}`, {
        nextCompartment,
        nextDateToAsk,
      });
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

const cardOneReducer = createReducer(initialState, (builder) => {
  builder
    // ----------- RESET STATE -----------
    .addCase(resetCardOneState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.card = {
        question: '',
        answer: '',
        attachment: '',
      };
      state.cardCreated = null;
    })
    // ----------- CHANGE FIELD -----------
    .addCase(changeCardField, (state, action) => {
      state.card[action.payload.field] = action.payload.value;
    })
    // ----------- CREATE CARD -----------
    .addCase(createCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.cardCreated = null;
    })
    .addCase(createCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Successfully created card';
      state.isRegistered = true;
      state.card = {
        question: '',
        answer: '',
        attachment: '',
      };
      state.cardCreated = action.payload;
    })
    .addCase(createCard.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
        state.isRegistered = false;
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
      state.success = '';
      state.isRegistered = false;
      state.cardCreated = null;
    })
    // ----------- DELETE CARD -----------
    .addCase(deleteCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
    })
    .addCase(deleteCard.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Successfully deleted card';
    })
    .addCase(deleteCard.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
      state.success = '';
    })
    // ----------- UPDATE CARD ATTRIBUTES AFTER ANSWER -----------
    .addCase(updateCardAttributesAfterAnswer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
    })
    .addCase(updateCardAttributesAfterAnswer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Successfully updated card attributes';
    })
    .addCase(updateCardAttributesAfterAnswer.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
      state.success = '';
    });
});

export default cardOneReducer;
