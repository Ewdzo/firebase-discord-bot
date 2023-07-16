import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN, 
    projectId: process.env.PROJECT_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDB = getFirestore(firebaseApp);