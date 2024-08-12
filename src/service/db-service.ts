import { database } from "../config/firebase-config";
import {
  ref,
  get,
  set,
  update,
  query,
  equalTo,
  orderByChild,
  push,
} from "firebase/database";
import { Property, UserDetails } from "../types/types";


/**
 * Creates a new user in the database.
 * 
 * @param userDetails - The details of the user to be created.
 * @returns A Promise that resolves to the result of the database operation.
 */
export const createUser = async (userDetails: UserDetails) => {
  try {
    return await set(
      ref(database, `users/${userDetails.username}`),
      userDetails
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * Checks if a user with the given username or email exists in the database.
 * @param username - The username to check.
 * @param email - The email to check.
 * @returns A promise that resolves to an array containing two snapshots: one for the username and one for the email.
 */
export const checkIfUserExists = async (username: string, email: string) => {
  try {
    const snapshot1 = await get(
      query(ref(database, "users"), orderByChild("username"), equalTo(username))
    );
    const snapshot2 = await get(
      query(ref(database, "users"), orderByChild("email"), equalTo(email))
    );

    return [snapshot1, snapshot2];
  } catch (error) {
    console.log(error);
    return [null, null];
  }
};


/**
 * Retrieves all properties from the database.
 */
export const getAllProperties = async () => {
  try {
    const snapshot = await get(ref(database, "properties"));
    return snapshot;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Adds a property to the database.
 * 
 * @param property - The property to be added.
 * @returns A Promise that resolves to a string representing the key of the added property, or void if the operation is successful, or null if an error occurs.
 */
export const addProperty = async (
  property: Property
): Promise<string | void | null> => {
  try {
    const propertyRef = await push(ref(database, "properties"), property);
    return propertyRef.key;
  } catch (error) {
    console.error("Error adding property: ", error);
  }
};

/**
 * Updates a property in the database.
 * 
 * @param  propertyId - The ID of the property to update.
 * @param  property - The updated property object.
 * @returns- A promise that resolves when the property is updated successfully.
 */
export const updateProperty = async (
  propertyId: string,
  property: Property
) => {
  try {
    await update(ref(database, `properties/${propertyId}`), property);
  } catch (error) {
    console.error("Error updating property: ", error);
  }
};

/**
 * Retrieves a property from the database based on the provided property ID.
 * 
 * @param {string} propertyId - The ID of the property to retrieve.
 * @returns  A promise that resolves to the snapshot of the property.
 */
export const getProperty = async (propertyId: string) => {
  try {
    const snapshot = await get(ref(database, `properties/${propertyId}`));
    return snapshot;
  } catch (error) {
    console.error("Error getting property: ", error);
  }
};

/**
 * Edits the credential of a user in the database.
 * 
 * @param {string} user - The user identifier.
 * @param {string} credential - The credential to be edited.
 * @param {string} newCredential - The new value for the credential.
 * @returns  - A promise that resolves with the updated data or rejects with an error.
 */
export const editCredential = async (user:string, credential:string, newCredential:string) => {
  try {
    return await update(ref(database, `users/${user}`), { [credential]: newCredential });
  } catch (error) {
    return error;
  }
}

/**
 * Edits the details of a user.
 * 
 * @param user - The user identifier.
 * @param userDetails - The updated user details.
 * @returns A promise that resolves with the updated user details, or rejects with an error.
 */
export const editUserDetails = async (user:string, userDetails: UserDetails) => {
  try {
    return await update(ref(database, `users/${user}`), userDetails);
  } catch (error) {
    return error;
  }
}

/**
 * Retrieves a user from the database based on the provided username.
 * 
 * @param {string} username - The username of the user to retrieve.
 * @returns - A promise that resolves to the snapshot of the user data.
 * @throws {Error} - If there is an error retrieving the user.
 */
export const getUser = async (username: string) => {
  try {
    const snapshot = await get(ref(database, `users/${username}`));
    return snapshot;
  } catch (error) {
    console.error("Error getting user: ", error);
  }
}

/**
 * Retrieves the saved properties IDs for a given username.
 * 
 * @param {string} username - The username of the user.
 * @returns  - A promise that resolves to the snapshot of saved properties.
 */
export const getSavedPropertiesIds = async (username: string) => {
  try {
    const snapshot = await get(ref(database, `users/${username}/savedProperties`));
    return snapshot;
  } catch (error) {
    console.error("Error getting saved properties: ", error);
  }
}

