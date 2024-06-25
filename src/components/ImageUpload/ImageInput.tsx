import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageModal from './ImageModal';
import UnsplashImagesSearch from './UnsplashImagesSearch';

interface ImageInputProps {
  setImageFile: (file: File | null) => void;
  aspectRatio: number;
  picture: string;
}

function ImageInput({ setImageFile, aspectRatio, picture }: ImageInputProps) {
  const [imgURL, setImgURL] = useState<string>(picture);
  const [photoCredits, setPhotoCredits] = useState<{
    photographer: string;
    profileUrl: string;
  } | null>(null);
  const [openCroppingModal, setOpenCroppingModal] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setImgURL(URL.createObjectURL(file));
    setPhotoCredits(null);
    setOpenCroppingModal(true);
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
      <UnsplashImagesSearch
        setOpenCroppingModal={setOpenCroppingModal}
        setImgURL={setImgURL}
        setPhotoCredits={setPhotoCredits}
      />
      {/* // todo : ajouter borderRadius à Box et/ou img */}
      <Box sx={{ mt: 2 }}>
        <img
          src={imgURL}
          alt="uploaded"
          style={{
            width: '100%',
            maxHeight: '268px',
            objectFit: 'contain',
          }}
        />
        {photoCredits && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative',
              bottom: '48px',
              width: '201px',
              margin: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              padding: '4px 8px',
            }}
          >
            <Typography variant="body2">
              Photo by{' '}
              <a
                href={photoCredits.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'underline' }}
              >
                {photoCredits.photographer}
              </a>{' '}
            </Typography>
            <Typography variant="body2">
              on{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'underline' }}
              >
                Unsplash
              </a>
            </Typography>
          </Box>
        )}
      </Box>
      <ImageModal
        openCroppingModal={openCroppingModal}
        setOpenCroppingModal={setOpenCroppingModal}
        imgURL={imgURL}
        aspectRatio={aspectRatio}
        setImgURL={setImgURL}
        setCroppedImage={setImageFile}
      />
    </Box>
  );
}

export default ImageInput;
