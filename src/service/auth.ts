import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase-config.js';

export const signUp = async (emailAddress: string, password: string, displayName: string) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, emailAddress, password);
        if (userCredentials.user) {
            await updateProfile(userCredentials.user, {
                displayName: displayName,
            });
        }
        return userCredentials;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if(error.code === 'auth/email-already-in-use') {
            alert("Email already exists");
        }
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
        throw new Error('Invalid email or password');
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
