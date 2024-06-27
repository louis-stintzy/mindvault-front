import {
  Modal,
  Box,
  ImageList,
  ImageListItem,
  CircularProgress,
} from '@mui/material';
import { useEffect } from 'react';
import { UnsplashImageLight } from '../../@types/image';
import {
  getImageProxy,
  resetUnsplashState,
} from '../../store/reducers/unsplash';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { setPictureData } from '../../store/reducers/boxOne';

interface UnsplashImagesSearchResultsProps {
  openSearchResultsModal: boolean;
  setOpenSearchResultsModal: (open: boolean) => void;
  // setImgURL: (imgURL: string) => void;
  // setPhotoCredits: (photoCredits: {
  //   photographer: string;
  //   profileUrl: string;
  // }) => void;
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
  // setImgURL,
  // setPhotoCredits,
  setOpenCroppingModal,
  images,
}: UnsplashImagesSearchResultsProps) {
  const dispatch = useAppDispatch();
  const { isLoading, imageUrlFromProxy } = useAppSelector(
    (state) => state.unsplash
  );

  const handleCancel = () => {
    dispatch(resetUnsplashState());
    setOpenSearchResultsModal(false);
  };

  // Lorsque l'utilisateur clique sur une image, on récupère l'url de l'image (et download_location pour respecter Unsplash API Guidelines)
  // On la passe à getImageProxy. Une nouvelle url est générée par le proxy et stockée dans imageUrlFromProxy
  // Tout ceci dans le but de contourner les problèmes de CORS
  // Les images provenant d'Unsplash sont considérées comme des "tainted canvases" (toiles contaminées) car elles proviennent d'un domaine différent, ce qui déclenche des restrictions de sécurité
  const handleImageClick = async (
    url: string,
    downloadLocation: string,
    userName: string,
    userLink: string
  ) => {
    await dispatch(getImageProxy({ url, downloadLocation }));
    dispatch(setPictureData({ field: 'photographerName', value: userName }));
    dispatch(
      setPictureData({ field: 'photographerProfileUrl', value: userLink })
    );
    // setPhotoCredits({ photographer: userName, profileUrl: userLink });
  };
  // Quand une nouvelle imageUrlFromProxy est reçue, on la stocke dans imgURL et on ouvre le modal de cropping
  useEffect(() => {
    if (imageUrlFromProxy) {
      dispatch(
        setPictureData({ field: 'pictureUrl', value: imageUrlFromProxy })
      );
      // setImgURL(imageUrlFromProxy);
      setOpenSearchResultsModal(false);
      setOpenCroppingModal(true);
    }
  }, [
    dispatch,
    imageUrlFromProxy,
    // setImgURL,
    setOpenCroppingModal,
    setOpenSearchResultsModal,
  ]);

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
                onClick={() =>
                  handleImageClick(
                    image.urls.small,
                    image.links.download_location,
                    image.user.name,
                    image.user.links.html
                  )
                }
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
