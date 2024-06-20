import { Modal, Box, ImageList, ImageListItem } from '@mui/material';
import { UnsplashImage } from '../../@types/image';

interface UnsplashImagesSearchResultsProps {
  openSearchResultsModal: boolean;
  setOpenSearchResultsModal: (open: boolean) => void;
  setImgURL: (imgURL: string) => void;
  setOpenCroppingModal: (open: boolean) => void;
  images: UnsplashImage[];
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
  const handleCancel = () => {
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
        <ImageList cols={3}>
          {images.map((image) => (
            <Box
              key={image.id}
              onClick={() => handleImageClick(image.urls.small)}
              sx={{ cursor: 'pointer' }}
            >
              <ImageListItem>
                <img
                  src={image.urls.thumb}
                  alt={image.alt_description}
                  loading="lazy"
                />
              </ImageListItem>
            </Box>
          ))}
        </ImageList>
      </Box>
    </Modal>
  );
}

export default UnsplashImagesSearchResults;
