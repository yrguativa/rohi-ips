import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/user'
import { clientSlice } from './slices/client'

export const store = configureStore({
    reducer: {
        userAuth: authSlice.reducer,
        contractState: clientSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch