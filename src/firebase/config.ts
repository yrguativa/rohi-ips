// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnviroments';

const { VITE_FBASE_APIKEY, VITE_FBASE_AUTHDOMAIN, VITE_FBASE_DATABASEURL, VITE_FBASE_PROJECTID, VITE_FBASE_STORAGEBUCKET, VITE_FBASE_MESSAGINGSENDERID, VITE_FBASE_APPID, } = getEnvironments();

const firebaseConfig = {
    apiKey: VITE_FBASE_APIKEY,
    authDomain: VITE_FBASE_AUTHDOMAIN,
    databaseURL: VITE_FBASE_DATABASEURL,
    projectId: VITE_FBASE_PROJECTID,
    storageBucket: VITE_FBASE_STORAGEBUCKET,
    messagingSenderId: VITE_FBASE_MESSAGINGSENDERID,
    appId: VITE_FBASE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);