
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../firebase/providersAuth";
import { User } from "firebase/auth";

import { RootState } from "../..";
import { checkingCredentials, login, logout } from ".";
import { IUserAuthState, IUserRegisterAuth } from "../../../models/interfaces/IUserAuth";

export const thunkLogin = (email: string, password: string): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        //const asyncResp = await exampleAPI()

        console.log(email, password)
        dispatch(checkingCredentials)
    }

export const thunkRegister = (user: IUserRegisterAuth): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        dispatch(checkingCredentials());

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

export const thunkSignInGoogle = (): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        dispatch(checkingCredentials)
        const result = await singInWithGoogle();
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

export const thunkCheckedLogin = (user?: User | null): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        if (!user) {
            return dispatch(logout({
                errorMessage: ''
            } as IUserAuthState));
        }

        const state: IUserAuthState = {
            status: undefined,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        dispatch(login(state));
    }

export const thunkLogout = (): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        await logoutFirebase();
        dispatch(logout({ errorMessage: undefined } as IUserAuthState));
    }
