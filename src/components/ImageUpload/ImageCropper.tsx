import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

interface ImageCropperProps {
  imgURL: string;
}

function ImageCropper({ imgURL }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = useCallback(
    (croppedAreaPercentages, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPercentages);
    },
    []
  );

  return (
    <Cropper
      image={imgURL}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
}

export default ImageCropper;
