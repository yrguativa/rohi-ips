import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { clientSlice } from './slices/client'
import { contractSlice } from './slices/contract'

export const store = configureStore({
    reducer: {
        userAuth: authSlice.reducer,
        clientState: clientSlice.reducer,
        contractState: contractSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch