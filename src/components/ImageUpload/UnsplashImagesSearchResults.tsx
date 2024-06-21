import {
  Modal,
  Box,
  ImageList,
  ImageListItem,
  CircularProgress,
} from '@mui/material';
import { UnsplashImageLight } from '../../@types/image';
import { resetUnsplashState } from '../../store/reducers/unsplash';
import { useAppDispatch, useAppSelector } from '../../hook/redux';

interface UnsplashImagesSearchResultsProps {
  openSearchResultsModal: boolean;
  setOpenSearchResultsModal: (open: boolean) => void;
  setImgURL: (imgURL: string) => void;
  setOpenCroppingModal: (open: boolean) => void;
  images: UnsplashImageLight[];
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  Height: '80%',
  // height: '500px',
  // width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UnsplashImagesSearchResults({
  openSearchResultsModal,
  setOpenSearchResultsModal,
  setImgURL,
  setOpenCroppingModal,
  images,
}: UnsplashImagesSearchResultsProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.unsplash.isLoading);

  const handleCancel = () => {
    dispatch(resetUnsplashState());
    setOpenSearchResultsModal(false);
  };
  const handleImageClick = (imageURL: string) => {
    console.log(imageURL);
    setOpenSearchResultsModal(false);
    setOpenCroppingModal(true);
    setImgURL(imageURL);
  };

  return (
    <Modal
      open={openSearchResultsModal}
      onClose={handleCancel}
      aria-labelledby="Search results modal"
      aria-describedby="Unsplash images search results modal"
    >
      <Box sx={style}>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ImageList
            sx={{ width: '99%', height: '90%' }}
            cols={3}
            rowHeight={180}
          >
            {images.map((image) => (
              <Box
                key={image.id}
                onClick={() => handleImageClick(image.urls.small_s3)}
                sx={{ cursor: 'pointer' }}
              >
                <ImageListItem>
                  <img
                    src={image.urls.small_s3}
                    alt={image.alt_description}
                    loading="lazy"
                  />
                </ImageListItem>
              </Box>
            ))}
          </ImageList>
        )}
      </Box>
    </Modal>
  );
}

export default UnsplashImagesSearchResults;
