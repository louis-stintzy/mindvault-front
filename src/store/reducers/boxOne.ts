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
    learnIt: true,
    type: 2,
  },
  boxCreated: null,
};

type KeysOfBox = keyof BoxOneState['box'];

export const resetBoxOneState = createAction('boxOne/RESET_BOX_ONE_STATE');

export const changeBoxField = createAction<{
  field: KeysOfBox;
  value: string | boolean | number;
}>('boxOne/CHANGE_BOX_FIELD');

export const create = createAsyncThunk(
  'boxOne/CREATE',
  async (box: BoxDataLight, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/box/createBox', box);
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
        learnIt: true,
        type: 2,
      };
      state.boxCreated = null;
    })
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
    .addCase(create.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = '';
      state.isRegistered = false;
      state.boxCreated = null;
    })
    .addCase(create.fulfilled, (state, action) => {
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
        learnIt: true,
        type: 2,
      };
      state.boxCreated = action.payload;
    })
    .addCase(create.rejected, (state, action) => {
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
    });
});

export default boxOneReducer;
