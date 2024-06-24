import {database} from "../config/firebase-config";
import { ref, get, set, update, query, equalTo, orderByChild, push } from "firebase/database";


interface UserDetails {
  username: string;
  email: string;
}

export const createUser = async (userDetails: UserDetails) => {
  try {
    return await set(ref(database, `users/${userDetails.username}`), userDetails);
  } catch (error) {
    console.log(error);
  }
}

export const checkIfUserExists = async (username: string, email:string) => {
  try {
    const snapshot1 = await get(query(ref(database, "users"), orderByChild("username"), equalTo(username)));
    const snapshot2 = await get(query(ref(database, "users"), orderByChild("email"), equalTo(email)));

    return [snapshot1, snapshot2];
  } catch (error) {
    console.log(error);
    return [null, null];
  }
}

export const getAllProperties = async () => {
  try {
    const snapshot = await get(ref(database, "properties"));
    return snapshot;
  } catch (error) {
    console.log(error);
  }
}