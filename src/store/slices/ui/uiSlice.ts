import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UIState {
    Loading: boolean
    DarkMode: boolean
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
    }
});

export const { loadingToggle, darkModeToggle } = uiSlice.actions;