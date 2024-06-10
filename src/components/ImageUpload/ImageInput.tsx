import { Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import ImageModal from './ImageModal';

function ImageInput() {
  const [imgURL, setImgURL] = useState<string>(
    'https://via.placeholder.com/150'
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileChange function');
    const file = e.target.files?.[0];
    if (!file) return;
    setImgURL(URL.createObjectURL(file));
    setOpenModal(true);
  };
  return (
    <Box sx={{ my: 2 }}>
      <Button
        variant="outlined"
        fullWidth
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload Illustration
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFileChange(e)}
        />
        {/* <VisuallyHiddenInput type="file" /> */}
      </Button>
      <Box sx={{ mt: 2 }}>
        <img
          src="https://via.placeholder.com/150"
          alt="uploaded"
          width="150px"
          height="150px"
        />
      </Box>
      <ImageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        imgURL={imgURL}
        setImgURL={setImgURL}
      />
    </Box>
  );
}

export default ImageInput;
