
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IContractState, Patient, PaymentStatusEnum, StatusEnum } from '../../../models/interfaces/IContractState';

interface UIState {
    Loading: boolean
    DarkMode: boolean
}
const initialState: UIState = {
    Loading: false,
    DarkMode:false
};

export const uiSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadingToggle: (state, action: PayloadAction<boolean>) => {
            const { payload } = action;

            state.Loading = payload;
        },
        darkModeToggle: (state, action: PayloadAction<boolean>) => {
            const { payload } = action;

            state.DarkMode = payload;
        },  
    }
});

export const { loadingToggle, darkModeToggle } = uiSlice.actions;