
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { singInWithGoogle } from "../../../firebase/providersAuth";
import { User } from "firebase/auth";

import { RootState } from "../..";
import { checkingCredentials, login, logout } from ".";
import { IUserAuthState } from "../../../models/interfaces/IUserAuth";

export const thunkLogin = (email: string, password: string): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        //const asyncResp = await exampleAPI()

        console.log(email, password)
        dispatch(checkingCredentials)
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