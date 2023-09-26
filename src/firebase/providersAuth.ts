import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { FirebaseAuth, FirebaseDB } from './config';
import { IRolesAuth, IUserRegisterAuth } from '../models/interfaces/IUserAuth';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
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

export const registerUserWithEmailPassword = async ({ email, password, displayName, isRadioUser, isAdmin }: IUserRegisterAuth) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        console.log("🚀 ~ file: providersAuth.ts:37 ~ registerUserWithEmailPassword ~ resp:", resp)
        console.log("🚀 ~ file: providersAuth.ts:37 ~ registerUserWithEmailPassword ~ resp.user:", resp.user)

        await updateProfile(FirebaseAuth.currentUser!, { displayName });

        // Set custom claims for roles
        let customClaims = {};
        if (isRadioUser) {
            customClaims = { isRadioUser: true }
        }
        if (isAdmin) {
            customClaims = { ...customClaims, isAdmin: true }
        }
        console.log("🚀 ~ file: providersAuth.ts:43 ~ registerUserWithEmailPassword ~ customClaims:", customClaims)

        await setDoc(doc(FirebaseDB, "Users", uid), { roles: customClaims });

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

export const getRolesByUser = async (uid: string): Promise<IRolesAuth> => {
    const docUser = await getDoc(doc(FirebaseDB, "Users", uid));

    if (docUser.exists()) {
        const roles: IRolesAuth = docUser.data().roles;
        return roles
    }
    return {} as IRolesAuth;
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}