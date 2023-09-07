import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IContractState, Patient, PaymentStatusEnum, StatusEnum } from '../../../models/interfaces/IContractState';

const initialState: IContractState = {
    Contract: {
        Patients: [],
        Payments: [],
        Status: StatusEnum.Disabled
    },
    StatusPayment: PaymentStatusEnum.None
};

export const contractSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        loadContract: (state, action: PayloadAction<IContractState>) => {
            const { payload } = action;

            state.Contract = payload.Contract;
        },
        createContract: (state, action: PayloadAction<IContractState>) => {
            const { payload } = action;

            state.Contract = payload.Contract;
        },
        createPatient: (state, action: PayloadAction<Patient>) => {
            const { payload } = action;

            state.Contract!.Patients = [...state.Contract!.Patients, payload];
        },
    }
});

// Action creators are generated for each case reducer function
export const { loadContract, createContract, createPatient } = contractSlice.actions;