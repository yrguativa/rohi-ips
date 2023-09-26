export const getEnvironments = () => {

    const firebaseConfig = {
        VITE_FBASE_APIKEY: import.meta.env.VITE_FBASE_APIKEY,
        VITE_FBASE_AUTHDOMAIN: import.meta.env.VITE_FBASE_AUTHDOMAIN,
        VITE_FBASE_PROJECTID: import.meta.env.VITE_FBASE_PROJECTID,
        VITE_FBASE_STORAGEBUCKET: import.meta.env.VITE_FBASE_STORAGEBUCKET,
        VITE_FBASE_MESSAGINGSENDERID: import.meta.env.VITE_FBASE_MESSAGINGSENDERID,
        VITE_FBASE_APPID: import.meta.env.VITE_FBASE_APPID,
        VITE_FBASE_DATABASEURL: import.meta.env.VITE_FBASE_DATABASEURL,

        VITE_MCPAGO_TOKEN: import.meta.env.VITE_MCPAGO_TOKEN,
        VITE_MCPAGO_NOTIFICATION_RESPONSE: import.meta.env.VITE_MCPAGO_NOTIFICATION_RESPONSE,
    };

    return {
        ...firebaseConfig
    }
}