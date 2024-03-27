import { ImageUploadVariant } from '../types';

export async function uploadImage(
  formData: FormData,
  type: ImageUploadVariant = 'image',
) {
  const preset =
    type === 'avatar'
      ? process.env.CLOUDINARY_AVATAR_UPLOAD_PRESET
      : process.env.CLOUDINARY_POST_IMG_UPLOAD_PRESET;

  formData.append('upload_preset', preset ?? '');

  const data = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const response = await data.json();

  return response;
}
