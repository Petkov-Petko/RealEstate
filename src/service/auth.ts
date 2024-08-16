import {getAuth, GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase-config.js';

/**
 * Sign up a user with the provided email address, password, and display name.
 * 
 * @param emailAddress - The email address of the user.
 * @param password - The password of the user.
 * @param displayName - The display name of the user.
 * @returns A promise that resolves to the user credentials.
 */

/**
 * Logs out the user.
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Signs in the user using Google authentication.
 * @returns An object containing the user's email and username if the sign-in is successful.
 */
export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
            return {
              email: user.email,
              username: user.displayName,
            };
          }
      } catch (error) {
        console.log(error);
      }
}
