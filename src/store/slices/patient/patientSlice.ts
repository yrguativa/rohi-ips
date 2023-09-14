import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPatientState, Patient } from '../../../models/interfaces';

const initialState: IPatientState = {
    Patients: []
};

export const patientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadPatients: (state, action: PayloadAction<Patient[]>) => {
            const { payload } = action;

            state.Patients = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { loadPatients } = patientSlice.actions;