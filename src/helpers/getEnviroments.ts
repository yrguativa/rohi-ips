export const getEnvironments = () => {
   // import.meta.env;

   const firebaseConfig = {
    VITE_FBASE_APIKEY: "AIzaSyCM5Ac7VYCcb69bGfhzIb6Rx-vbnujRFao",
    VITE_FBASE_AUTHDOMAIN: "rohi-63590.firebaseapp.com",
    VITE_FBASE_PROJECTID: "rohi-63590",
    VITE_FBASE_STORAGEBUCKET: "rohi-63590.appspot.com",
    VITE_FBASE_MESSAGINGSENDERID: "934952248250",
    VITE_FBASE_APPID: "1:934952248250:web:1dde1e2bb2c6ae84327383",
    measurementId: "G-0BB2E9KZ68",
    VITE_FBASE_DATABASEURL: "rohi-63590.firebaseapp.com",
};

    return {
        ...firebaseConfig
    }
}