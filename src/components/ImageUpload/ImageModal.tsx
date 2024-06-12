import { Modal, Box } from '@mui/material';
import ImageCropper from './ImageCropper';

interface ImageModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  imgURL: string;
  setImgURL: (imgURL: string) => void;
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
  openModal,
  setOpenModal,
  imgURL,
  setImgURL,
}: ImageModalProps) {
  const handleCancel = () => {
    setImgURL('https://via.placeholder.com/150');
    setOpenModal(false);
  };

  const handleCropImage = (croppedImage: Blob) => {
    const croppedFile = new File([croppedImage], 'croppedImage.jpg', {
      type: 'image/jpeg',
    });
    setImgURL(URL.createObjectURL(croppedFile));
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {imgURL && (
          <ImageCropper
            imgURL={imgURL}
            onCroppedImage={handleCropImage}
            onCancel={handleCancel}
          />
        )}
      </Box>
    </Modal>
  );
}

export default ImageModal;
