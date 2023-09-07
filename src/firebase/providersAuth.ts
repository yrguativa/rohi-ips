import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';
import { IUserRegisterAuth } from '../models/interfaces/IUserAuth';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        let errorMessage;
        if (error instanceof Error) errorMessage = error.message;
        else errorMessage = String(error);

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }: IUserRegisterAuth) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(FirebaseAuth.currentUser!, { displayName });

        return {
            ok: true,
            uid, photoURL,
            email,
            displayName
        }

    } catch (error) {
        let errorMessage;
        if (error instanceof Error) errorMessage = error.message;
        else errorMessage = String(error);

        return {
            ok: false,
            errorMessage: errorMessage
        }
    }
}

export const loginWithEmailPassword = async ({ email, password }: IUserRegisterAuth) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        let errorMessage;
        if (error instanceof Error) errorMessage = error.message;
        else errorMessage = String(error);

        return {
            ok: false,
            errorMessage: errorMessage
        }
    }
}
export const getCurrentUser = () => FirebaseAuth.currentUser!;

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}