// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnvironments';

const { FBASE_APIKEY, FBASE_AUTHDOMAIN, FBASE_DATABASEURL, FBASE_PROJECTID, FBASE_STORAGEBUCKET, FBASE_MESSAGINGSENDERID, FBASE_APPID, } = getEnvironments();


const firebaseConfig = {
    apiKey: FBASE_APIKEY,
    authDomain: FBASE_AUTHDOMAIN,
    databaseURL: FBASE_DATABASEURL,
    projectId: FBASE_PROJECTID,
    storageBucket: FBASE_STORAGEBUCKET,
    messagingSenderId: FBASE_MESSAGINGSENDERID,
    appId: FBASE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);