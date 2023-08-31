
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "../.."
import { checkingCredentials, login, logout } from "."
import { singInWithGoogle } from "../../../firebase/providersAuth"
import { IUserAuthState } from "../../../models/interfaces/IUserAuth"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../../../firebase/config"

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

export const thunkCheckedLogin = (): ThunkAction<void, RootState, unknown, Action> =>
    async dispatch => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
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
        })
    }