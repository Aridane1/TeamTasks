import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';

   async function takePhoto(): Promise<Photo> {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    return capturedPhoto;
  }
  
   async function pickImage(): Promise<GalleryPhoto> {
    const capturedPhotos = await Camera.pickImages({
      limit: 1,
      quality: 100
    });


    return capturedPhotos.photos[0];
  }
  export default {
    pickImage,
    takePhoto,
  };