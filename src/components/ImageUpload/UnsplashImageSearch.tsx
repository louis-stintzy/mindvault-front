import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import {
  changeUnsplashImageSearchField,
  searchUnsplashImages,
} from '../../store/reducers/unsplash';

function UnsplashImageSearch() {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.unsplash.query);
  const images = useAppSelector((state) => state.unsplash.images);

  const handleChangeField = (value: string) => {
    dispatch(changeUnsplashImageSearchField(value));
  };
  const searchImages = () => {
    dispatch(searchUnsplashImages(query));
  };

  useEffect(() => {
    if (images.length > 0) {
      console.log(images);
    }
  }, [images]);

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
    </Box>
  );
}

export default UnsplashImageSearch;
