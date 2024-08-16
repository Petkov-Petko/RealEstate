import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../config/firebase-config.js";

/**
 * Uploads a file to the storage.
 * 
 * @param propertyId - The ID of the property.
 * @param file - The file to be uploaded.
 * @param photoName - The name of the photo.
 * @returns A promise that resolves when the file is uploaded.
 */
export const uploadFile = async (
  propertyId: string,
  file: File,
  photoName: string
) => {
  const imageNameRef = ref(storage, `properties/${propertyId}/${photoName}`);
  await uploadBytes(imageNameRef, file);
};

/**
 * Retrieves the list of files associated with a specific property.
 * 
 * @param propertyId - The ID of the property.
 * @returns A promise that resolves to an array of strings representing the URLs of the files.
 * @throws If there is an error fetching the photos.
 */
export const getFiles = async (propertyId: string): Promise<string[]> => {
  try {
    const photosRef = ref(storage, `properties/${propertyId}`);
    const listResult = await listAll(photosRef);
    const urlPromises = listResult.items.map((itemRef) =>
      getDownloadURL(itemRef)
    );
    const urls = await Promise.all(urlPromises);
    return urls;
  } catch (error) {
    console.error("Error fetching photos: ", error);
    throw error;
  }
};

/**
 * Uploads a user photo to the storage.
 * 
 * @param userEmail - The email of the user.
 * @param file - The file to be uploaded.
 * @returns A promise that resolves when the upload is complete.
 */
export const uploadUserPhoto = async (
  userEmail: string,
  file: File,
) => {
  const imageNameRef = ref(storage, `users/${userEmail}/photo`);
  await uploadBytes(imageNameRef, file);
};

/**
 * Retrieves the URL of the user's photo from the storage.
 * 
 * @param userEmail - The email of the user.
 * @returns A Promise that resolves to the URL of the user's photo.
 * @throws If there is an error fetching the photo.
 */
export const getUserPhoto = async (userEmail: string): Promise<string> => {
  try {
    const photoRef = ref(storage, `users/${userEmail}/photo`);
    const url = await getDownloadURL(photoRef);
    return url;
  } catch (error) {
    console.error("Error fetching photo: ", error);
    throw error;
  }
};
