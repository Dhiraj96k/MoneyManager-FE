import { API_ENDPOINTS } from "./apiEndPoint";

const CLOUDINARY_UPLOAD_PRESET = "moneymanager";

export const upload_profile_image = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Cloudinary Upload Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Image Uploaded Successfully:", data);

    return data.secure_url; // return uploaded image URL
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
