import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeUnsplashImagesSearchField,
  searchUnsplashImages,
} from '../../store/reducers/unsplash';
import UnsplashImagesSearchResults from './UnsplashImagesSearchResults';

function UnsplashImagesSearch() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.unsplash.query);
  const images = useAppSelector((state) => state.unsplash.images);

  const [openSearchResultsModal, setOpenSearchResultsModal] =
    useState<boolean>(false);

  const handleChangeField = (value: string) => {
    dispatch(changeUnsplashImagesSearchField(value));
  };
  const searchImages = () => {
    dispatch(searchUnsplashImages(query));
    setOpenSearchResultsModal(true);
  };

  // useEffect(() => {
  //   if (images.length > 0) {
  //     console.log(images);
  //   }
  // }, [images]);

  return (
    <Box>
      <TextField
        id="unsplash-search"
        label="Search an image on Unsplash"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => handleChangeField(e.target.value)}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={searchImages}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <UnsplashImagesSearchResults
        openModal={openSearchResultsModal}
        setOpenModal={setOpenSearchResultsModal}
        images={images}
      />
    </Box>
  );
}

export default UnsplashImagesSearch;
