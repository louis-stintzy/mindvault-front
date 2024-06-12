import { Area } from 'react-easy-crop/types';

const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc; // à mettre après  drawImage ? https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Using_images

    // image.onload : Fonction de rappel appelée lorsque l'image est complètement chargée.
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      if (!ctx) {
        reject(new Error('Canvas Context Error'));
        return;
      }
      // ctx.drawImage : voir https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage
      // Dessine l'image recadrée sur le canvas.
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // canvas.toBlob : Convertit le contenu du canvas en un Blob
      // The HTMLCanvasElement.toBlob() method creates a Blob object representing the image contained in the canvas
      // Si blob est créé avec succès, résout la promesse avec le blob.
      // Sinon, rejette la promesse avec une erreur indiquant que le canvas est vide.
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas to Blob Error'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg');
    };

    // Si l'image ne se charge pas correctement, rejette la promesse avec une erreur indiquant que l'image n'a pas pu être chargée.
    image.onerror = () => {
      reject(new Error('Image Load Error'));
    };
  });
};

export default getCroppedImg;
