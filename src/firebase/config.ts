// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers/getEnviroments';


const { FBASE_APIKEY, FBASE_AUTHDOMAIN, FBASE_DATABASEURL, FBASE_PROJECTID, FBASE_STORAGEBUCKET, FBASE_MESSAGINGSENDERID, FBASE_APPID, } = getEnvironments();

console.log("FBASE_APIKEY", FBASE_APIKEY)
// const firebaseConfig = {
//     apiKey: FBASE_APIKEY,
//     authDomain: FBASE_AUTHDOMAIN,
//     databaseURL: FBASE_DATABASEURL,
//     projectId: FBASE_PROJECTID,
//     storageBucket: FBASE_STORAGEBUCKET,
//     messagingSenderId: FBASE_MESSAGINGSENDERID,
//     appId: FBASE_APPID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyCM5Ac7VYCcb69bGfhzIb6Rx-vbnujRFao",
    authDomain: "rohi-63590.firebaseapp.com",
    projectId: "rohi-63590",
    storageBucket: "rohi-63590.appspot.com",
    messagingSenderId: "934952248250",
    appId: "1:934952248250:web:1dde1e2bb2c6ae84327383",
    measurementId: "G-0BB2E9KZ68"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);