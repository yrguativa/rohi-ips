import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { clientSlice } from './slices/client'
import { contractFormSlice, contractSlice } from './slices/contract'
import { uiSlice } from './slices/ui/uiSlice'

export const store = configureStore({
    reducer: {
        uiState: uiSlice.reducer,
        userAuthState: authSlice.reducer,
        clientState: clientSlice.reducer,
        contractState: contractSlice.reducer,
        contractFormSlice: contractFormSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch