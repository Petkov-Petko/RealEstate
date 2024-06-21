import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase-config.js';



export const signUp = async (emailAddress: string, password: string) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, emailAddress, password);
        return userCredentials;
    } catch (error) {
        console.log(error);
    }
}


export const handleUserDelete = async () => {
    try {
        if (auth.currentUser) {
            return await deleteUser(auth.currentUser);
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.log(error);
    }
}


export const logIn = async (emailAddress: string, password: string) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, emailAddress, password);
        return userCredentials;
    } catch (error) {
        console.log(error);
    }
}

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
}

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.log(error);
      }
}

// export const changePassword = async (newPassword) => {
//     try {
//         updatePassword(auth.currentUser, newPassword)
//     } catch (error) {
//         console.log(error.message);
//     }
// };