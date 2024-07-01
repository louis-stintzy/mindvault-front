import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeUnsplashImagesSearchField,
  searchUnsplashImages,
} from '../../store/reducers/unsplash';
import UnsplashImagesSearchResults from './UnsplashImagesSearchResults';

interface UnsplashImagesSearchProps {
  setOpenCroppingModal: (open: boolean) => void;
}

function UnsplashImagesSearch({
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
    if (!query) return;
    dispatch(searchUnsplashImages(query));
    setOpenSearchResultsModal(true);
  };

  // Empêche la validation du formulaire et lance la recherche d'image lorsque l'utilisateur appuie sur "Entrée"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchImages();
    }
  };

  // todo : côté backend proxy : tester les "order_by:"
  // todo : côté backend proxy & frontend : ajouter une pagination
  // todo : prendre photo d'une qualité meilleure
  // todo : côté backend : utiliser sharp ?

  return (
    <Box>
      <TextField
        id="unsplash-search"
        label="Search an image on Unsplash"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => handleChangeField(e.target.value)}
        onKeyDown={handleKeyDown}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="search"
                onClick={searchImages}
                disabled={query.trim() === ''}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <UnsplashImagesSearchResults
        openSearchResultsModal={openSearchResultsModal}
        setOpenSearchResultsModal={setOpenSearchResultsModal}
        setOpenCroppingModal={setOpenCroppingModal}
        images={images}
      />
    </Box>
  );
}

export default UnsplashImagesSearch;
