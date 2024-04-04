import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'
import { clientSlice } from './slices/client'
import { contractSlice } from './slices/contract'
import { uiSlice } from './slices/ui/uiSlice'
import { patientSaveSlice } from './slices/patient'

export const store = configureStore({
    reducer: {
        uiState: uiSlice.reducer,
        userAuthState: authSlice.reducer,
        clientState: clientSlice.reducer,
        contractState: contractSlice.reducer,
        patientSaveState: patientSaveSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch