import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageModal from './ImageModal';

interface ImageInputProps {
  setImageFile: (file: File | null) => void;
  aspectRatio: number;
  picture: string;
}

function ImageInput({ setImageFile, aspectRatio, picture }: ImageInputProps) {
  const [imgURL, setImgURL] = useState<string>(picture);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setImgURL(URL.createObjectURL(file));
    setOpenModal(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] },
  });

  return (
    <Box sx={{ my: 2 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '1px dashed #ccc',
          borderRadius: 1,
          textAlign: 'center',
          padding: 2,
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag n drop some files here, or click to select files
        </Typography>
        <Typography variant="body2" color="textSecondary">
          (Only *.jpg, *.jpeg, *.png, *.gif images will be accepted)
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2 }}
        >
          Upload Illustration
        </Button>
      </Box>
      {/* // todo : ajouter borderRadius à Box et/ou img */}
      <Box sx={{ mt: 2 }}>
        <img
          src={imgURL}
          alt="uploaded"
          style={{
            width: '100%',
            maxHeight: '266px',
            objectFit: 'contain',
          }}
        />
      </Box>
      <ImageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        imgURL={imgURL}
        aspectRatio={aspectRatio}
        setImgURL={setImgURL}
        setCroppedImage={setImageFile}
      />
    </Box>
  );
}

export default ImageInput;