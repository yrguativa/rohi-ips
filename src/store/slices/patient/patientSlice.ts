import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPatientState, Patient } from '../../../models/interfaces';

const initialState: IPatientState = {
    Patients: [],
    AllPatients: []
};

export const patientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadPatients: (state, action: PayloadAction<Patient[]>) => {
            const { payload } = action;

            state.AllPatients = payload;
            state.Patients = payload;
        },
        getPatientsFilter: (state, action: PayloadAction<string>) => {
            const { payload } = action;

            state.Patients = state.AllPatients.filter(p => p.Identification?.includes(payload) || p.Name.toLowerCase().includes(payload.toLowerCase()));
        },
        clearPatientsFilter: (state) => {
            state.Patients = state.AllPatients;
        },
    }
});

// Action creators are generated for each case reducer function
export const { loadPatients, getPatientsFilter, clearPatientsFilter } = patientSlice.actions;