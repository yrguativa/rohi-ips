import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contract, IContractFormState, Patient, } from "../../../models/interfaces";
import { StatusEnum } from "../../../models/enums";

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

            const patients = [...state.ContractForm!.Patients!];
            patients.map(p => {
                if (p.Identification == idPatient) {
                    p.Status = StatusEnum.Cancel
                }
            });
            state.ContractForm!.Patients = [...patients];
        },

        editInvoiceNumber: (state, action: PayloadAction<{ idPay: string, invoice: string }>) => {
            const { idPay, invoice } = action.payload;

            const payments = [...state.ContractForm!.Payments!];
            payments.map(pay => {
                if (pay.Id == idPay) {
                    pay.NumberInvoiceRohi = invoice
                }
            });

            state.ContractForm!.Payments = [...payments];
        },

        cleanContractForm: (state) => {
            state.ContractForm = undefined;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadContractForm, createPatientSave, removePatientSave, editInvoiceNumber, cleanContractForm } = contractFormSlice.actions;
