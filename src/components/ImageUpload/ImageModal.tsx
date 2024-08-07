import { Modal, Box } from '@mui/material';
import ImageCropper from './ImageCropper';
import boxDefaultPicture from '../../assets/boxDefaultPicture2.png';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { resetUnsplashState } from '../../store/reducers/unsplash';
import { setPictureData } from '../../store/reducers/boxOne';

interface ImageModalProps {
  openCroppingModal: boolean;
  setOpenCroppingModal: (open: boolean) => void;
  // imgURL: string;
  aspectRatio: number;
  // setImgURL: (imgURL: string) => void;
  setCroppedImage: (file: File | null) => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '500px',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ImageModal({
  openCroppingModal,
  setOpenCroppingModal,
  // imgURL,
  aspectRatio,
  // setImgURL,
  setCroppedImage,
}: ImageModalProps) {
  const dispatch = useAppDispatch();
  const pictureUrl = useAppSelector(
    (state) => state.boxOne.box.picture.pictureUrl
  );

  const handleCancel = () => {
    dispatch(resetUnsplashState());
    dispatch(setPictureData({ field: 'pictureUrl', value: boxDefaultPicture }));
    // setImgURL(boxDefaultPicture);
    setOpenCroppingModal(false);
  };

  const handleCropImage = (croppedImage: Blob) => {
    const croppedFile = new File([croppedImage], 'croppedImage.jpg', {
      type: 'image/jpeg',
    });
    dispatch(
      setPictureData({
        field: 'pictureUrl',
        value: URL.createObjectURL(croppedFile),
      })
    );
    // setImgURL(URL.createObjectURL(croppedFile));
    setCroppedImage(croppedFile);
    setOpenCroppingModal(false);
  };

  return (
    <Modal
      open={openCroppingModal}
      onClose={handleCancel}
      aria-labelledby="crop image modal"
      aria-describedby="crop image modal"
    >
      <Box sx={style}>
        {pictureUrl && (
          <ImageCropper
            // imgURL={imgURL}
            aspectRatio={aspectRatio}
            onCroppedImage={handleCropImage}
            onCancel={handleCancel}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ImageModal;
