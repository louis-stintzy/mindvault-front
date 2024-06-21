import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { axiosInstance } from '../../utils/axios';
import analyseError from './errorHandling';

import { UnsplashImageLight } from '../../@types/image';

interface ErrorResponse {
  errCode: number;
  errMessage: string;
}

interface UnsplashState {
  query: string;
  images: UnsplashImageLight[];
  imageUrlFromProxy: string;
  isLoading: boolean;
  error: ErrorResponse[] | null;
}

const initialState: UnsplashState = {
  query: '',
  images: [],
  imageUrlFromProxy: '',
  isLoading: false,
  error: null,
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
        urls: {
          small: item.urls.small,
          small_s3: item.urls.small_s3,
        },
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

export const getImageProxy = createAsyncThunk(
  'unsplash/GET_IMAGE_PROXY',
  async (
    { url, downloadLocation }: { url: string; downloadLocation: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/proxy/image`, {
        params: {
          url,
          downloadLocation,
        },
        responseType: 'blob',
      });
      const blob = new Blob([response.data]);
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
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
      state.imageUrlFromProxy = '';
      state.isLoading = false;
      state.error = null;
    })
    // ------ searchUnsplashImages ------
    .addCase(searchUnsplashImages.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchUnsplashImages.fulfilled, (state, action) => {
      state.images = action.payload;
      state.isLoading = false;
      state.error = null;
      state.query = '';
    })
    .addCase(searchUnsplashImages.rejected, (state, action) => {
      state.isLoading = false;
      state.query = '';
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    })
    // ------ getImageProxy ------
    .addCase(getImageProxy.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getImageProxy.fulfilled, (state, action) => {
      state.imageUrlFromProxy = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(getImageProxy.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload as ErrorResponse[];
      } else {
        state.error = [{ errCode: -1, errMessage: 'Unknown error' }];
      }
    });
});

export default unsplashReducer;
