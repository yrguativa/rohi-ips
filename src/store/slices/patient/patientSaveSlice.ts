import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPatientState, Patient } from '../../../models/interfaces';

const initialState: IPatientState = {
    Patients: []
};

export const patientSaveSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadPatientsSave: (state, action: PayloadAction<Patient[]>) => {
            const { payload } = action;

            state.Patients = payload;
        },
        createPatientSave: (state, action: PayloadAction<Patient>) => {
            const { payload } = action;

            state.Patients = [...state.Patients!, payload];
        },
        removePatientSave: (state, action: PayloadAction<string>) => {
            const { payload: idPatient } = action;

            const patients = state.Patients!.filter(p => p.Identification != idPatient);
            state.Patients = [...patients];
        },

        cleanPatientsSave: (state) => {
            state.Patients = [];
        },
    }
});

// Action creators are generated for each case reducer function
export const { loadPatientsSave, createPatientSave, removePatientSave, cleanPatientsSave } = patientSaveSlice.actions;