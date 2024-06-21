import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

import { UnsplashImageLight } from '../../@types/image';

interface UnsplashState {
  query: string;
  images: UnsplashImageLight[];
  isLoading: boolean;
  error: string;
}

const initialState: UnsplashState = {
  query: '',
  images: [],
  isLoading: false,
  error: '',
};

export const resetUnsplashState = createAction('unsplash/RESET_UNSPLASH_STATE');

export const changeUnsplashImagesSearchField = createAction<string>(
  'unsplash/CHANGE_UNSPLASH_IMAGES_SEARCH_FIELD'
);

export const searchUnsplashImages = createAsyncThunk(
  'unsplash/SEARCH_UNSPLASH_IMAGES',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/proxy/images`, {
        params: {
          query,
        },
      });
      return response.data.map((item: UnsplashImageLight) => ({
        id: item.id,
        alternative_slugs: item.alternative_slugs,
        altDescription: item.alt_description,
        urls: { small_s3: item.urls.small_s3 },
        links: { download_location: item.links.download_location },
        user: {
          id: item.user.id,
          username: item.user.username,
          name: item.user.name,
          links: { html: item.user.links.html },
        },
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorAnalyzed = analyseError(error);
        return rejectWithValue(errorAnalyzed);
      }
      return rejectWithValue({ errCode: -1, errMessage: 'Unknown error' });
    }
  }
);

const unsplashReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeUnsplashImagesSearchField, (state, action) => {
      state.query = action.payload;
    })
    .addCase(resetUnsplashState, (state) => {
      state.query = '';
      state.images = [];
      state.isLoading = false;
      state.error = '';
    })
    .addCase(searchUnsplashImages.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    })
    .addCase(searchUnsplashImages.fulfilled, (state, action) => {
      state.images = action.payload;
      state.isLoading = false;
      state.error = '';
      state.query = '';
    })
    .addCase(searchUnsplashImages.rejected, (state, action) => {
      state.isLoading = false;
      state.query = '';
      state.error = action.payload as string;
    });
});

export default unsplashReducer;
