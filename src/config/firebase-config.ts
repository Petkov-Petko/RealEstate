import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "realestate-dcdcb.firebaseapp.com",
  databaseURL: "https://realestate-dcdcb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "realestate-dcdcb",
  storageBucket: "realestate-dcdcb.appspot.com",
  messagingSenderId: "45763293912",
  appId: "1:45763293912:web:57a5fc84376ee0a9b65dad",
  measurementId: "G-N8XMRKYJTE"
};


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app); 