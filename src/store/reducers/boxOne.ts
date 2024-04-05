import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { BoxData, BoxDataLight } from '../../@types/box';

import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface BoxOneState {
  isLoading: boolean;
  error: ErrorResponse[] | null;
  success: string;
  isRegistered: boolean;
  box: BoxDataLight;
  boxCreated: BoxData | null;
  currentBox: BoxData | null;
}

export const initialState: BoxOneState = {
  isLoading: false,
  error: null,
  success: '',
  isRegistered: false,
  box: {
    name: '',
    description: '',
    boxPicture: '',
    color: '',
    label: '',
    level: '',
    defaultQuestionLanguage: 'fr-FR',
    defaultAnswerLanguage: 'fr-FR',
    learnIt: true,
    type: 2,
  },
  boxCreated: null,
  currentBox: null,
};

type KeysOfBox = keyof BoxOneState['box'];

export const resetBoxOneState = createAction('boxOne/RESET_BOX_ONE_STATE');

export const setCurrentBox = createAction<BoxData>('boxOne/SET_CURRENT_BOX');

export const initializeBoxFields = createAction<BoxDataLight>(
  'boxOne/INITIALIZE_BOX_FIELDS'
);

export const getBoxById = createAsyncThunk(
  'boxOne/GET_BOX_BY_ID',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/box/${boxId}`);
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

export const changeBoxField = createAction<{
  field: KeysOfBox;
  value: string | boolean | number;
}>('boxOne/CHANGE_BOX_FIELD');

export const createBox = createAsyncThunk(
  'boxOne/CREATE_BOX',
  async (box: BoxDataLight, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/boxes', box);
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

export const updateBoxLearnItValue = createAsyncThunk(
  'boxOne/UPDATE_BOX_LEARN_IT_VALUE',
  async (
    { boxId, learnIt }: { boxId: number; learnIt: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/box/${boxId}/learnit`, {
        learnIt,
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

export const deleteBox = createAsyncThunk(
  'boxOne/DELETE_BOX',
  async (boxId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/box/${boxId}`);
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

const boxOneReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(resetBoxOneState, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.box = {
        name: '',
        description: '',
        boxPicture: '',
        color: '',
        label: '',
        level: '',
        defaultQuestionLanguage: 'fr-FR',
        defaultAnswerLanguage: 'fr-FR',
        learnIt: true,
        type: 2,
      };
      state.boxCreated = null;
      state.currentBox = null;
    })
    .addCase(setCurrentBox, (state, action) => {
      state.currentBox = action.payload;
    })
    .addCase(initializeBoxFields, (state, action) => {
      state.box = action.payload;
    })
    // -------------- GET BOX BY ID --------------
    .addCase(getBoxById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
    })
    .addCase(getBoxById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = '';
      state.currentBox = action.payload;
    })
    .addCase(getBoxById.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    })
    // ------------- CHANGE BOX FIELD -------------
    .addCase(changeBoxField, (state, action) => {
      const { field, value } = action.payload;
      // pour gérer la problématique de typage
      if (field === 'learnIt') {
        state.box[field] = value as boolean;
      } else if (field === 'type') {
        state.box[field] = value as number;
      } else {
        state.box[field] = value as string;
      }
    })
    // --------------- CREATE BOX ----------------
    .addCase(createBox.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.boxCreated = null;
    })
    .addCase(createBox.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Successfully created box';
      state.isRegistered = true;
      state.box = {
        name: '',
        description: '',
        boxPicture: '',
        color: '',
        label: '',
        level: '',
        defaultQuestionLanguage: 'fr-FR',
        defaultAnswerLanguage: 'fr-FR',
        learnIt: true,
        type: 2,
      };
      state.boxCreated = action.payload;
    })
    .addCase(createBox.rejected, (state, action) => {
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
      state.boxCreated = null;
    })
    // ---------- UPDATE BOX LEARN IT VALUE ----------
    .addCase(updateBoxLearnItValue.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
    })
    .addCase(updateBoxLearnItValue.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Learn it value updated';
    })
    .addCase(updateBoxLearnItValue.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    })
    // ----------- DELETE BOX -----------
    .addCase(deleteBox.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.boxCreated = null;
    })
    .addCase(deleteBox.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = 'Successfully deleted box';
    })
    .addCase(deleteBox.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
        state.success = '';
        state.isRegistered = false;
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default boxOneReducer;
