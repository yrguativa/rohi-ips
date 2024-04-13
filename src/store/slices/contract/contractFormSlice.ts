import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contract, IContractFormState, Patient, } from "../../../models/interfaces";


const initialState: IContractFormState = {};

export const contractFormSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        loadContractForm: (state, action: PayloadAction<Contract>) => {
            const { payload } = action;

            state.ContractForm = payload;
        },

        createPatientSave: (state, action: PayloadAction<Patient>) => {
            const { payload } = action;

            const patients = state.ContractForm!.Patients!.filter(p => p.Identification != payload.Identification);
            state.ContractForm!.Patients = [...patients, payload];
        },

        removePatientSave: (state, action: PayloadAction<string>) => {
            const { payload: idPatient } = action;

            const patients = state.ContractForm!.Patients!.filter(p => p.Identification != idPatient);
            state.ContractForm!.Patients = [...patients];
        },

        cleanContractForm: (state) => {
            state.ContractForm = undefined;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadContractForm, createPatientSave, removePatientSave, cleanContractForm } = contractFormSlice.actions;
