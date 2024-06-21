import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeUnsplashImagesSearchField,
  searchUnsplashImages,
} from '../../store/reducers/unsplash';
import UnsplashImagesSearchResults from './UnsplashImagesSearchResults';

interface UnsplashImagesSearchProps {
  setImgURL: (imgURL: string) => void;
  setOpenCroppingModal: (open: boolean) => void;
}

function UnsplashImagesSearch({
  setImgURL,
  setOpenCroppingModal,
}: UnsplashImagesSearchProps) {
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

  // todo : côté backend proxy : tester les "order_by:"
  // todo : côté frontend : ajouter un bouton pour chercher 12 autres images

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
        openSearchResultsModal={openSearchResultsModal}
        setOpenSearchResultsModal={setOpenSearchResultsModal}
        setImgURL={setImgURL}
        setOpenCroppingModal={setOpenCroppingModal}
        images={images}
      />
    </Box>
  );
}

export default UnsplashImagesSearch;
