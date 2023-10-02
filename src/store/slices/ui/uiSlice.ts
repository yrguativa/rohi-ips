import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UIState {
    Loading: boolean
    DarkMode: boolean
    Message?: string
    ErrorMessage?: string
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
        setMessage: (state, action: PayloadAction<string | undefined>) => {
            const { payload } = action;
            state.Message = payload;
        },
        setErrorUI: (state, action: PayloadAction<string | undefined>) => {
            const { payload } = action;
            state.ErrorMessage = payload;
        },
    }
});

export const { loadingToggle, darkModeToggle, setMessage, setErrorUI } = uiSlice.actions;