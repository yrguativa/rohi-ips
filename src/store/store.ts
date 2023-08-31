import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/user'

export const store = configureStore({
    reducer: {
        userAuth: authSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch