import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UIState {
    Loading: boolean
    DarkMode: boolean
    ErrorMessage?:string
}
const initialState: UIState = {
    Loading: false,
    DarkMode: false
};

export const uiSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadingToggle: (state, action: PayloadAction<boolean>) => {
            const { payload } = action;

            state.Loading = payload;
        },
        darkModeToggle: (state) => {
            state.DarkMode = !state.DarkMode;
        },
        setErrorUI: (state, action: PayloadAction<string | undefined>) => {
            const { payload } = action;
            console.log("🚀 ~ file: uiSlice.ts:27 ~ payload:", payload)

            state.ErrorMessage = payload;
        },
    }
});

export const { loadingToggle, darkModeToggle, setErrorUI } = uiSlice.actions;