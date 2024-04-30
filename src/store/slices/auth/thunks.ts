
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { getRolesByUser, loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../firebase/providersAuth";
import { User } from "firebase/auth";

import { RootState } from "../..";
import { checkingCredentials, login, logout } from ".";
import { IUserAuthState, IUserRegisterAuth } from "../../../models/interfaces/IUserAuth";
import { getContractByEmail } from "../../../services";
import { setErrorUI } from "../ui/uiSlice";

export const thunkLogin = (email: string, password: string): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword({ email, password });
        if (!result.ok) {
            dispatch(setErrorUI('Usuario y contraseña invalido'));
            return;
        }
        const roles = await getRolesByUser(result.uid!);
        const state: IUserAuthState = {
            status: undefined,
            uid: result.uid,
            email: email,
            displayName: result.displayName,
            photoURL: result.photoURL,
            roles
        };
        if (roles && (roles.isAdmin || roles.isRadioUser)) {
            dispatch(login(state));
            dispatch(setErrorUI(undefined));
        } else {
            const contract = await getContractByEmail(email);
            if (contract) {
                dispatch(login(state));
                dispatch(setErrorUI(undefined));
            } else {
                dispatch(setErrorUI('No se encontro un Contrato asociado a este correo electronico'));
            }
        }
    }

export const thunkRegister = (user: IUserRegisterAuth): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        dispatch(checkingCredentials());
        const contract = await getContractByEmail(user.email);

        if (contract) {
            dispatch(setErrorUI(undefined));
            const result = await registerUserWithEmailPassword(user);
            if (!result.ok) {
                return dispatch(logout({
                    errorMessage: result.errorMessage
                } as IUserAuthState));
            }

            const state: IUserAuthState = {
                status: undefined,
                uid: result.uid,
                email: result.email,
                displayName: result.displayName,
                photoURL: result.photoURL
            };

            dispatch(login(state))
        }
        else {
            dispatch(setErrorUI('No se encontro un Contrato asociado a este correo electronico'));
        }
    }

export const thunkSignInGoogle = (): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        dispatch(checkingCredentials)
        const result = await singInWithGoogle();
        if (!result.ok) {
            return dispatch(logout({
                errorMessage: result.errorMessage
            } as IUserAuthState));
        }
        const contract = await getContractByEmail(result.email!);

        if (contract) {
            const state: IUserAuthState = {
                status: undefined,
                uid: result.uid,
                email: result.email,
                displayName: result.displayName,
                photoURL: result.photoURL
            };
            dispatch(login(state))
        }
        else {
            dispatch(setErrorUI('No se encontro un Contrato asociado a este correo electronico'));
        }
    }

export const thunkCheckedLogin = (user?: User | null): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch, getState) => {
        if (!user) {
            return dispatch(logout({
                errorMessage: ''
            } as IUserAuthState));
        }
        const statusAuth = getState().userAuthState.status;
        if (statusAuth !== 'authenticated') {            
            const roles = await getRolesByUser(user.uid!);
            const state: IUserAuthState = {
                status: undefined,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                roles
            };
            dispatch(login(state));
        }
    }

export const thunkLogout = (): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        await logoutFirebase();
        dispatch(logout({ errorMessage: undefined } as IUserAuthState));
    }