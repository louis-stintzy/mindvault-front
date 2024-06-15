import { Box, Button, Slider } from '@mui/material';
import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

interface ImageCropperProps {
  imgURL: string;
  aspectRatio: number;
  onCroppedImage: (croppedImage: Blob) => void;
  onCancel: () => void;
}

function ImageCropper({
  imgURL,
  aspectRatio,
  onCroppedImage,
  onCancel,
}: ImageCropperProps) {
  // croppedArea de la forme : { x: 0.1, y: 0.1, width: 0.5, height: 0.5 }
  // x et y sont les coordonnées du coin supérieur gauche du rectangle de sélection
  // width et height sont les dimensions du rectangle de sélection en pourcentage de l'image
  // zoom est le niveau de zoom de l'image
  // crop est la position de l'image dans le cadre de sélection.
  // quand le cadre est au centre de l'image, crop = { x: 0, y: 0 }
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleZoomChange = (event: Event, zoomValue: number | number[]) => {
    // number[] pour éviter pb de type dans onChange de Slider.
    // Pour comprendre le fonctionnement on peut loger event et zoomValue
    setZoom(zoomValue as number);
  };

  // onCropComplete est appelée à chaque fois que l'utilisateur modifie la zone de sélection (zomm ou déplacement du cadre)
  // croppedAreaPercentages est un objet de la forme { x: 0.1, y: 0.1, width: 0.5, height: 0.5 }
  // met à jour croppedArea avec la nouvelle zone de sélection
  const onCropComplete = useCallback(
    (croppedAreaPercentages: Area, croppedAreaPxls: Area) => {
      // Pour comprendre le fonctionnement on peut loger croppedAreaPercentages/Pixels
      setCroppedAreaPixels(croppedAreaPxls);
    },
    []
  );

  // Fonction appelée lors du clic sur le bouton "Crop Image"
  const handleCropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = (await getCroppedImg(
          imgURL,
          croppedAreaPixels
        )) as Blob; // note: est ce que c'est ok de caster en Blob ?
        onCroppedImage(croppedImage);
      }
    } catch (error) {
      console.error('Error cropping image: ', error);
    }
  }, [croppedAreaPixels, imgURL, onCroppedImage]);

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ height: 350, width: 350, position: 'relative' }}>
        <Cropper
          image={imgURL}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onCancel}>Cancel</Button>

        <Slider
          aria-label="Zoom"
          defaultValue={zoom}
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={handleZoomChange}
        />
        <Button onClick={handleCropImage}>Crop Image</Button>
      </Box>
    </Box>
  );
}

export default ImageCropper;
