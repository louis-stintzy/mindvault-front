import { Modal, Button, Box } from '@mui/material';
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
  const handleClose = () => {
    // todo Reset image ne fonctionne pas car le chargement d'une nouvelle image n'ouvre pas la modal
    setImgURL('https://via.placeholder.com/150');
    setOpenModal(false);
  };

  const handleSave = () => {
    // todo Save cropped image
    setOpenModal(false);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {imgURL && <ImageCropper imgURL={imgURL} />}
        {/* <img src={imgURL} alt="uploaded" width="150px" height="150px" /> */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ImageModal;
