import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserAuthState } from '../../../models/interfaces/IUserAuth';

const initialState: IUserAuthState = {
    status: 'checking'
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserAuthState>) => {
            const { payload } = action;
        
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.roles = payload.roles;
            state.errorMessage = undefined;
        },
        logout: (state, action: PayloadAction<IUserAuthState>) => {
            const { payload } = action;

            state.status = 'not-authenticated';
            state.uid = undefined;
            state.email = undefined;
            state.displayName = undefined;
            state.photoURL = undefined;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;