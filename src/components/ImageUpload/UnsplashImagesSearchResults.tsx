import { Modal, Box, ImageList, ImageListItem } from '@mui/material';

interface UnsplashImagesSearchResultsProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  images: [];
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
  openModal,
  setOpenModal,
  images,
}: UnsplashImagesSearchResultsProps) {
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleImageClick = (image: string) => {
    console.log(image);
    // setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCancel}
      aria-labelledby="Search results modal"
      aria-describedby="Unsplash images search results modal"
    >
      <Box sx={style}>
        <ImageList cols={3}>
          {images.map((image) => (
            <ImageListItem
              key={image.id}
              // onClick={handleImageClick(image.urls.thumb)}
            >
              <img
                src={image.urls.thumb}
                alt={image.alt_description}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Modal>
  );
}

export default UnsplashImagesSearchResults;
