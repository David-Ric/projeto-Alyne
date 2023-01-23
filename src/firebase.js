
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBG5GGa9FQQtZd7wX0fdIQ8SVmBQTs4MG8",
    authDomain: "grupoalyne-384ad.firebaseapp.com",
    projectId: "grupoalyne-384ad",
    storageBucket: "grupoalyne-384ad.appspot.com",
    messagingSenderId: "826331610470",
    appId: "1:826331610470:web:c6b02eb45ba335604ddca7"
  };


export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
