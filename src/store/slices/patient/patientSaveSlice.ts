import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPatientState, Patient } from '../../../models/interfaces';

const initialState: IPatientState = {
    Patients: [],
    AllPatients:[]
};

export const patientSaveSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        createPatientSave: (state, action: PayloadAction<Patient>) => {
            const { payload } = action;

            state.Patients = [...state.Patients!, payload];
        },
        removePatientSave: (state, action: PayloadAction<string>) => {
            const { payload: idPatient } = action;

            const patients = state.Patients!.filter(p => p.Identification != idPatient);
            state.Patients = [...patients];
        },
    }
});

// Action creators are generated for each case reducer function
export const {  createPatientSave, removePatientSave } = patientSaveSlice.actions;