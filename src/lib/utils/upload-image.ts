export async function uploadImage(formData: FormData) {
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || '');

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
