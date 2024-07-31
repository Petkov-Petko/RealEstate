import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../config/firebase-config.js";

export const uploadFile = async (
  propertyId: string,
  file: File,
  photoName: string
) => {
  const imageNameRef = ref(storage, `properties/${propertyId}/${photoName}`);
  await uploadBytes(imageNameRef, file);
};

export const getFiles = async (propertyId: string): Promise<string[]> => {
  try {
    const photosRef = ref(storage, `properties/${propertyId}`);
    const listResult = await listAll(photosRef);
    console.log(listResult);
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

export const uploadUserPhoto = async (
  userEmail: string,
  file: File,
) => {
  const imageNameRef = ref(storage, `users/${userEmail}/photo`);
  await uploadBytes(imageNameRef, file);
};

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
