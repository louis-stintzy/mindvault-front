import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import axios from 'axios';
import { UnsplashImage } from '../../@types/image';

interface UnsplashState {
  query: string;
  images: UnsplashImage[];
  isLoading: boolean;
  error: string;
}

const initialState: UnsplashState = {
  query: '',
  images: [],
  isLoading: false,
  error: '',
};

export const changeUnsplashImagesSearchField = createAction<string>(
  'unsplash/CHANGE_UNSPLASH_IMAGES_SEARCH_FIELD'
);

export const searchUnsplashImages = createAsyncThunk(
  'unsplash/SEARCH_UNSPLASH_IMAGES',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            per_page: 12,
          },
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );
      return response.data.results.map((item: UnsplashImage) => {
        return {
          id: item.id,
          urls: {
            small: item.urls.small,
            thumb: item.urls.thumb,
          },
          // links: {
          //   html: item.links.html,
          // },
          alt_description: item.alt_description,
        };
      });
    } catch (error) {
      console.log('Unsplash API error');
      console.error(error);
      return rejectWithValue({
        errCode: 222,
        errMessage: 'Unsplash API error',
      });
    }
  }
);

export const resetUnsplashState = createAction('unsplash/RESET_UNSPLASH_STATE');

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
